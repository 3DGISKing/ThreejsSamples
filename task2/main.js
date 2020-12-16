// Global variables

var scene, width, height, camera, renderer;
var mouseIsPressed, mouseX, mouseY;

var DrawTool = {
	Triangle,
	Sphere
};

var currentDrawTool = DrawTool.Triangle;

// Initialization of global objects and set up callbacks for mouse and resize

function init() {
	// Scene object
	scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xff0000 );

	// Will use the whole window for the webgl canvas
	width = window.innerWidth;
	height = window.innerHeight;

	// Orthogonal camera for 2D drawing
	camera = new THREE.OrthographicCamera( 0, width, 0, height, -height, height );
	camera.lookAt (new THREE.Vector3 (0,0,0));

	// Renderer will use a canvas taking the whole window
	renderer = new THREE.WebGLRenderer( { alpha: true });
	renderer.sortObjects = false;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( width, height );
    renderer.setClearColor(0xb0f442, 1 );

	// Append camera to the page
	document.body.appendChild( renderer.domElement );

	// Set resize (reshape) callback
	window.addEventListener( 'resize', resize );

	// Set up mouse callbacks. 
	// Call mousePressed, mouseDragged and mouseReleased functions if defined.
	// Arrange for global mouse variables to be set before calling user callbacks.
	mouseIsPressed = false;
	mouseX = 0;
	mouseY = 0;

	var setMousePosition = function () {
		mouseX = event.clientX;
		mouseY = event.clientY;
	};

	renderer.domElement.addEventListener ( 'mousedown', function () {
		setMousePosition();
		mouseIsPressed = true;

		if (typeof mousePressed !== 'undefined')
			mousePressed();
	});

	renderer.domElement.addEventListener ( 'mousemove', function () { 
		setMousePosition();

		if (mouseIsPressed) {
			if (typeof mouseDragged !== 'undefined')
				mouseDragged();
		}

		if (typeof mouseMoved !== 'undefined')
			mouseMoved();
	});

	renderer.domElement.addEventListener ( 'mouseup', function () { 
		mouseIsPressed = false;

		if (typeof mouseReleased !== 'undefined')
			mouseReleased();
	});

	// If a setup function is defined, call it
	if (typeof setup !== 'undefined')
		setup();

	// First render
	render();
}

// resize callback

function resize() {
	width = window.innerWidth;
	height = window.innerHeight;
	camera.right = width;
	camera.bottom = height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	render();
}

// render callback

function render () {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}

var material; // A line material
var currentLine; // Object that was picked

function setup () {
	material = new THREE.LineBasicMaterial ( {color:0xffffff, depthWrite:false, linewidth : 4 } );
}

function mousePressed() {
	var point = new THREE.Vector3 (mouseX, mouseY, 0);

	var geometry = new THREE.Geometry();

	geometry.vertices.push (point);

	var line = new THREE.Line (geometry, material);

	scene.add (line);
	currentLine = line;
}

function mouseDragged() {
	var line = currentLine;

	var point = new THREE.Vector3 (mouseX, mouseY, 0);

	var oldGeometry = line.geometry;
	var newGeometry = new THREE.Geometry();

	newGeometry.vertices = oldGeometry.vertices;
	newGeometry.vertices.push (point);

	line.geometry = newGeometry;
}

function mouseReleased() {
}

function selectTriangle() {

}
init();
