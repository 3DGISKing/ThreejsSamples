/*
 * Cloth Simulation using a relaxed constraints solver
 */

var DAMPING = 0.03;
var DRAG = 1 - DAMPING;
var MASS = 0.1;
var restDistance = 25;
var xSegs = 10;
var ySegs = 10;

var clothFunction = plane( restDistance * xSegs, restDistance * ySegs );

var cloth = new Cloth( xSegs, ySegs );

var GRAVITY = 918;
var gravity = new THREE.Vector3( 0, - GRAVITY, 0 ).multiplyScalar( MASS );
var TIMESTEP = 18 / 1000;
var TIMESTEP_SQ = TIMESTEP * TIMESTEP;
var pins = [];
var wind = true;
var windForce = new THREE.Vector3( 0, 0, 0 );
var tmpForce = new THREE.Vector3();
var lastTime;

// ESTO PARECE CLAVE PARA LOCALIZACION

var vertexCount = 0;

function plane( width, height ) {
	return function( u, v ) { // UBICA LOS PINS PROPORSIONALMENTE
		var x = ( u - 0.5 ) * width;
		var y = ( v - 0.1 ) * height; //RRT ANTES  ( v + 0.5 )
		var z = 0;

		if(isNaN(vertexCount))
		{
			vertexCount = 0;
		}

		vertexCount++;

		// console.log( "uv: " + u + ", " + v + " x,y " + x + ", " + y + " vertexCount = " + vertexCount );

		return new THREE.Vector3( x, y, z );
	};
}

function Particle( x, y, z, mass ) {
	this.position = clothFunction( x, y ); // position
	this.previous = clothFunction( x, y ); // previous
	this.original = clothFunction( x, y );

	this.a = new THREE.Vector3( 0, 0, 0 ); // acceleration
	this.mass = mass;
	this.invMass = 1 / mass;

	this.tmp2 = new THREE.Vector3();
}

// Force -> Acceleration
Particle.prototype.addForce = function( force ) {
	this.a.add(
		this.tmp2.copy( force ).multiplyScalar( this.invMass )
	);
};

// Performs Verlet integration
Particle.prototype.integrate = function( timesq ) {
	var tmp = new THREE.Vector3();

	var newPos = tmp.subVectors( this.position, this.previous );

	newPos.multiplyScalar( DRAG ).add( this.position );
	newPos.add( this.a.multiplyScalar( timesq ) );

	this.previous = this.position;
	this.position = newPos;
	this.a.set( 0, 0, 0 );
};

function satisfyConstraints( p1, p2, distance ) {
    var diff = new THREE.Vector3();

	diff.subVectors( p2.position, p1.position );

	var currentDist = diff.length();

	if ( currentDist === 0 )
		return; // prevents division by 0

	var correction = diff.multiplyScalar( 1 - distance / currentDist );
	var correctionHalf = correction.multiplyScalar( 0.5 );

	p1.position.add( correctionHalf );
	p2.position.sub( correctionHalf );
}

function Cloth( w, h ) {
	w = w || 20;
	h = h || 20;

	this.w = w;
	this.h = h;

	var particles = [];
	var constraints = [];

	var u, v;
	var x, y;
	var particleCount = 0;

	// Create particles
	for ( v = 0; v <= h; v ++ ) {
		for ( u = 0; u <= w; u ++ ) {
			x = u / w;
			y = v / h;

			particles.push(
				new Particle( u / w, v / h, 0, MASS )
			);

			particleCount++;

			console.log("particleCount = " + particleCount +" u = " + u + " v = " + v + " x = " + x + " y = " + y);
		}
	}

	// Structural

	for ( v = 0; v < h; v ++ ) {
		for ( u = 0; u < w; u ++ ) {
			constraints.push( [
				particles[ index( u, v ) ],
				particles[ index( u, v + 1 ) ],
				restDistance
			] );

			constraints.push( [
				particles[ index( u, v ) ],
				particles[ index( u + 1, v ) ],
				restDistance
			] );
		}
	}

	for ( u = w, v = 0; v < h; v ++ ) {
		constraints.push( [
			particles[ index( u, v ) ],
			particles[ index( u, v + 1 ) ],
			restDistance
		] );
	}

	for ( v = h, u = 0; u < w; u ++ ) {
		constraints.push( [
			particles[ index( u, v ) ],
			particles[ index( u + 1, v ) ],
			restDistance
		] );
	}

	this.particles = particles;
	this.constraints = constraints;

	function index( u, v ) {
		return u + v * ( w + 1 );
	}

	this.index = index;
}

function simulate( time ) {
	if ( ! lastTime ) {
		lastTime = time;
		return;
	}

	var i, il, particles, particle, constraints, constraint;

    // Aerodynamics forces

	if ( wind ) {
		var face, faces = clothGeometry.faces, normal;
		particles = cloth.particles;

		for ( i = 0, il = faces.length; i < il; i ++ ) {
			face = faces[ i ];
			normal = face.normal;
			tmpForce.copy( normal ).normalize().multiplyScalar( normal.dot( windForce ) );
			particles[ face.a ].addForce( tmpForce );
			particles[ face.b ].addForce( tmpForce );
			particles[ face.c ].addForce( tmpForce );
		}
	}

	for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {
		particle = particles[ i ];
		particle.addForce( gravity );
		particle.integrate( TIMESTEP_SQ );
	}

	// Start Constraints
	constraints = cloth.constraints;
	il = constraints.length;

	for ( i = 0; i < il; i ++ ) {
		constraint = constraints[ i ];
		satisfyConstraints( constraint[ 0 ], constraint[ 1 ], constraint[ 2 ] );
	}

	// Floor Constraints
	for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {
		particle = particles[ i ];

		pos = particle.position;

		if ( pos.y < - 250 ) {
			pos.y = - 250;
		}
	}

	// Pin Constraints
	for ( i = 0, il = pins.length; i < il; i ++ ) {

		var xy = pins[ i ];

		var p = particles[ xy ];

		p.position.copy( p.original );
		p.previous.copy( p.original );
	}

	// mesh_fabric.js 's constraints mode

    /*

    for ( i = 0; i < pins.length; i ++ ) {

        var vertexIndex = pins[ i ];

        p = particles[ vertexIndex ];

        p.position.copy( position [i] );
        p.previous.copy( position [i] );
    }

    */
}

function createClothMesh(func, slices, stacks) {
    var geom = new THREE.Geometry();

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = [];

    var EPS = 0.00001;

    var normal = new THREE.Vector3();

    var p0 = new THREE.Vector3(), p1 = new THREE.Vector3();
    var pu = new THREE.Vector3(), pv = new THREE.Vector3();

    var i, j;

    // generate vertices, normals and uvs

    var sliceCount = slices + 1;

    for ( i = 0; i <= stacks; i ++ ) {

        var v = i / stacks;

        for ( j = 0; j <= slices; j ++ ) {

            var u = j / slices;

            // vertex

            p0 = func( u, v, p0 );

            //vertices.push( p0.x, p0.y, p0.z );
            vertices.push( p0 );

            // normal

            // approximate tangent vectors via finite differences

            if ( u - EPS >= 0 ) {

                p1 = func( u - EPS, v, p1 );
                pu.subVectors( p0, p1 );

            } else {

                p1 = func( u + EPS, v, p1 );
                pu.subVectors( p1, p0 );

            }

            if ( v - EPS >= 0 ) {

                p1 = func( u, v - EPS, p1 );
                pv.subVectors( p0, p1 );

            } else {

                p1 = func( u, v + EPS, p1 );
                pv.subVectors( p1, p0 );

            }

            // cross product of tangent vectors returns surface normal

            normal.crossVectors( pu, pv ).normalize();
            normals.push( normal.x, normal.y, normal.z );

            // uv

            uvs.push( u, v );
        }
    }
    // generate indices

    for (j = 0; j < stacks; j++ ) {
        for ( i = 0; i < slices; i++) {
            var a = i + (sliceCount * j);
            var b = a + 1;
            var c = b + sliceCount;
            var d = c - 1;

            indices.push( a, b, c );
            indices.push( a, b, d );
            indices.push( c, d, a );
        }
    }

    geom.vertices = vertices;

    var faceCount = 0;

    geom.faceVertexUvs[0] = [];

    for (i = 0; i < indices.length; i = i + 3 ) {
        geom.faces.push(new THREE.Face3(indices[i], indices[i + 1], indices[i + 2]));

        var uvLayer = [];

        var vertexIndex = indices[i];

        uvLayer.push(new THREE.Vector2( uvs[vertexIndex * 2 ], uvs[vertexIndex * 2 + 1] ) );

        vertexIndex = indices[i + 1];
        uvLayer.push(new THREE.Vector2( uvs[vertexIndex * 2 ], uvs[vertexIndex * 2 + 1] ) );

        vertexIndex = indices[i + 2];
        uvLayer.push(new THREE.Vector2( uvs[vertexIndex * 2 ], uvs[vertexIndex * 2 + 1] ) );

        geom.faceVertexUvs[0].push(uvLayer);

        faceCount++;
    }

  //  geom.uvsNeedUpdate = true;

    // deprecated
    // if you want to use custom shader material

	/*
	 var material = new THREE.ShaderMaterial({
	 uniforms: {

	 },
	 vertexShader: document.getElementById('vertex-shader').textContent,
	 fragmentShader: document.getElementById('fragment-shader').textContent
	 });

	 */

	clothGeometry = geom;

    var material = new THREE.MeshBasicMaterial( { color : 0x000000, side: THREE.DoubleSide, wireframe: true } );

    return new THREE.Mesh( geom, material );
}

function createClothLines(func, slices, stacks) {

    var gridVertex = new THREE.Vector3();

    var girdVertices = [];

    var i, j;

    // generate vertices, normals and uvs

    var sliceCount = slices + 1;
    var stackCount = stacks + 1;

    for ( i = 0; i <= stacks; i ++ ) {
        var v = i / stacks;

        for ( j = 0; j <= slices; j ++ ) {

            var u = j / slices;

            // vertex
            gridVertex = func( u, v, gridVertex );
            girdVertices.push( gridVertex );
        }
    }

    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    var clothLines = [];
    var vertices = [];
    var gridVertexIndexes = [];

    // bottom line

    for ( i = 0; i <= slices; i ++ ) {
		var gridVertexIndex =  i;

		gridVertexIndexes.push(gridVertexIndex);
		vertices.push(girdVertices[gridVertexIndex]);
    }

    var geometry = new THREE.Geometry();

    geometry.vertices = vertices;
    geometry.gridVertexIndexes = gridVertexIndexes;

    var line = new THREE.Line( geometry, material );

    clothLines.push(line);

    //right line

    vertices = [];
    gridVertexIndexes = [];

    for ( i = 0; i <= stacks; i ++ ) {
        gridVertexIndex =  slices + i * stackCount;

        gridVertexIndexes.push(gridVertexIndex);
        vertices.push(girdVertices[gridVertexIndex]);
    }

    geometry = new THREE.Geometry();

    geometry.vertices = vertices;
    geometry.gridVertexIndexes = gridVertexIndexes;

    line = new THREE.Line( geometry, material );

    clothLines.push(line);

    // top line

    vertices = [];
    gridVertexIndexes = [];

    for ( i = 0; i <= slices; i ++ ) {
        gridVertexIndex =  sliceCount * stacks + i;

        gridVertexIndexes.push(gridVertexIndex);
        vertices.push(girdVertices[gridVertexIndex]);
    }

    geometry = new THREE.Geometry();

    geometry.vertices = vertices;
    geometry.gridVertexIndexes = gridVertexIndexes;

    line = new THREE.Line( geometry, material );

    clothLines.push(line);

    // left line

    vertices = [];
    gridVertexIndexes = [];

    for ( i = 0; i <= stacks; i ++ ) {
        gridVertexIndex =  sliceCount * stacks - sliceCount * i;

        gridVertexIndexes.push(gridVertexIndex);
        vertices.push(girdVertices[gridVertexIndex]);
    }

    geometry = new THREE.Geometry();

    geometry.vertices = vertices;
    geometry.gridVertexIndexes = gridVertexIndexes;

    line = new THREE.Line( geometry, material );

    clothLines.push(line);

    // diagonal

    for ( i = 0; i < stacks ; i ++ ) {
    	var start = i * sliceCount;

        vertices = [];
        gridVertexIndexes = [];

    	for ( j = 0; j <= stacks; j++ ) {
            gridVertexIndex = start + (sliceCount + 1) * j;

            if(gridVertexIndex >= sliceCount * stackCount)
            	continue;

            console.log(gridVertexIndex);

            gridVertexIndexes.push(gridVertexIndex);
            vertices.push(girdVertices[gridVertexIndex]);
		}

        geometry = new THREE.Geometry();

        geometry.vertices = vertices;
        geometry.gridVertexIndexes = gridVertexIndexes;

        line = new THREE.Line( geometry, material );

        clothLines.push(line);
    }

    for ( i = 1; i < slices ; i ++ ) {
        start = i;

        vertices = [];
        gridVertexIndexes = [];

        for ( j = 0; j <= stacks - i; j++ ) {
            gridVertexIndex = start + (sliceCount + 1) * j;

            if(gridVertexIndex >= sliceCount * stackCount)
                continue;

            console.log(gridVertexIndex);

            gridVertexIndexes.push(gridVertexIndex);
            vertices.push(girdVertices[gridVertexIndex]);
        }

        geometry = new THREE.Geometry();

        geometry.vertices = vertices;
        geometry.gridVertexIndexes = gridVertexIndexes;

        line = new THREE.Line( geometry, material );

        clothLines.push(line);
    }


    for ( i = 1; i <= slices ; i ++ ) {
        start = i;

        vertices = [];
        gridVertexIndexes = [];

        for ( j = 0; j <=  i; j++ ) {
            gridVertexIndex = start + slices  * j;

            if(gridVertexIndex >= sliceCount * stackCount)
                continue;

            console.log(gridVertexIndex);

            gridVertexIndexes.push(gridVertexIndex);
            vertices.push(girdVertices[gridVertexIndex]);
        }

        geometry = new THREE.Geometry();

        geometry.vertices = vertices;
        geometry.gridVertexIndexes = gridVertexIndexes;

        line = new THREE.Line( geometry, material );

        clothLines.push(line);
    }

    for ( i = 1; i <= stacks ; i ++ ) {
        start = (sliceCount * 1 - 1) + i * sliceCount;

        vertices = [];
        gridVertexIndexes = [];

        for ( j = 0; j <= stacks - i; j++ ) {
            gridVertexIndex = start + slices  * j;

            if(gridVertexIndex >= sliceCount * stackCount)
                continue;

            console.log(gridVertexIndex);

            gridVertexIndexes.push(gridVertexIndex);
            vertices.push(girdVertices[gridVertexIndex]);
        }

        geometry = new THREE.Geometry();

        geometry.vertices = vertices;
        geometry.gridVertexIndexes = gridVertexIndexes;

        line = new THREE.Line( geometry, material );

        clothLines.push(line);
    }

    return clothLines;
}
