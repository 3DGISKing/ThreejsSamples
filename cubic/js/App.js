
var Cubic = {};

Cubic.App = (function () {
    var lastTime;
    var container;
    var camera, scene, renderer;
    var pointLight;

    // this will be 2D coordinates of the current mouse position, [0,0] is middle of the screen.
    var mousePosition = new THREE.Vector2();

    var latestMouseProjection; // this is the latest projection of the mouse on object (i.e. intersection with ray)
    var hoveredObj; // this objects is hovered at the moment
    var rayCaster;

    // tooltip will not appear immediately. If object was hovered shortly,
    // - the timer will be canceled and tooltip will not appear at all.
    var tooltipDisplayTimeout;

    // collect objects for ray casting,
    // for better performance don't raytrace all scene
    var tooltipEnabledObjects = [];

    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);

        // scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xcce0ff );
        scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

        // camera
        var fov = 30;
        var near = 0.1;
        var far = 10000;

        camera = new THREE.PerspectiveCamera(fov, window.innerWidth/window.innerHeight, near, far);
        //camera.position.set(-4, -4, 35);
        camera.position.set(24, 30, 24);
        camera.lookAt(new THREE.Vector3(0, 0, 0 ));

        //camera.position.set(0, 0, 0);
        // renderer
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        // controls
        var controls = new THREE.OrbitControls(camera, renderer.domElement );

        controls.maxPolarAngle = Math.PI * 1.5;
        controls.minDistance = 1;
        controls.maxDistance = 50;

        window.addEventListener('resize', onWindowResize, false );

        // when the mouse moves, call the given function
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        rayCaster = new THREE.Raycaster();
    }

    function createLight() {
        scene.add( new THREE.AmbientLight(0x000066));

        pointLight = new THREE.PointLight(0xffffff, 1, 10);
        pointLight.position.set(4, 10, 4);
        scene.add( pointLight );

        var sphereSize = 1;
        var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize );

        scene.add(pointLightHelper);
    }

    function createAxis() {
        var length = 10;

        var headLength = length * 0.1;
        var headWidth = length * 0.03;

        var xDirection = new THREE.Vector3( 1, 0, 0 );

        var origin = new THREE.Vector3( 0, 0, 0 );

        // x axis is red color
        var hex = 0xff0000;

        var arrowHelper = new THREE.ArrowHelper( xDirection, origin, length, hex, headLength, headWidth);
        scene.add( arrowHelper );

        // y axis is yellow color
        var yDirection = new THREE.Vector3( 0, 1, 0 );
        hex = 0xffff00;

        arrowHelper = new THREE.ArrowHelper( yDirection, origin, length, hex, headLength, headWidth);
        scene.add( arrowHelper );

        // z axis is blue color
        var zDirection = new THREE.Vector3( 0, 0, 1 );
        hex = 0x0000ff;

        arrowHelper = new THREE.ArrowHelper(zDirection, origin, length, hex, headLength, headWidth);
        scene.add( arrowHelper);
    }

    function createGrid(gridSize, verticalHeight) {
        verticalHeight = Math.ceil(verticalHeight);

        // note y is vertical

        // first draw xy plane

        var z = 0;

        var material = new THREE.LineBasicMaterial( { color: 0x000000});

        for(var x = 0; x <= gridSize; x++)
        {
            geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(x, 0, z));
            geometry.vertices.push(new THREE.Vector3(x, verticalHeight, z));

            line = new THREE.Line( geometry, material);

            scene.add( line );
        }

        for(var y = 0; y <= verticalHeight; y++)
        {
            var geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(0, y, z));
            geometry.vertices.push(new THREE.Vector3(gridSize, y, z));

            var line = new THREE.Line( geometry, material);

            scene.add( line );
        }

        // draw xz plane

        y = 0;

        for(x = 0; x <= gridSize; x++)
        {
            geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(x, y, 0));
            geometry.vertices.push(new THREE.Vector3(x, y, gridSize));

            line = new THREE.Line( geometry, material);

            scene.add( line );
        }

        for(z = 0; z <= gridSize; z++)
        {
            geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(0, y, z));
            geometry.vertices.push(new THREE.Vector3(gridSize, y, z));

            line = new THREE.Line(geometry, material);

            scene.add( line );
        }

        // draw yz plane

        x = 0;

        for(y = 0; y <= verticalHeight; y++)
        {
            geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(x, y, 0));
            geometry.vertices.push(new THREE.Vector3(x, y, gridSize));

            line = new THREE.Line( geometry, material);

            scene.add( line );
        }

        for(z = 0; z <= gridSize; z++)
        {
            geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(x, 0, z));
            geometry.vertices.push(new THREE.Vector3(x, verticalHeight, z));

            line = new THREE.Line(geometry, material);

            scene.add( line );
        }
    }

    // we consider y axis as vertical direction
    function createCubic(number, leftBottom, rightTop, y, height) {
        /*
       leftBottom is a array, for example [1, 1]
       it represents a point in xa plain

       rightTop is a array, for example [4, 5]
       it represents a point in xa plain

       y represent box 's y position
       height represent in y axis direction thickness

       */
       var width = rightTop[0] - leftBottom[0];
       var depth = rightTop[1] - leftBottom[1];

       var geometry = new THREE.BoxGeometry(width, height, depth);
       //var material = new THREE.MeshBasicMaterial( {color: 0x000000} );

       var material = new THREE.MeshLambertMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
       var cube = new THREE.Mesh(geometry, material);

       // calc center
       var x = leftBottom[0] + width / 2;
       var z = leftBottom[1] + depth / 2;

       cube.position.set(x, y + height / 2, z);

       cube.userData = {};
       cube.userData.tooltipText = number;

       scene.add( cube );

       tooltipEnabledObjects.push(cube);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onDocumentMouseMove( event )
    {
        updateMouseCoordinates(event, mousePosition);
        latestMouseProjection = undefined;
        hoveredObj = undefined;
        handleManipulationUpdate();
    }

    // Following two functions will convert mouse coordinates
    // from screen to three.js system (where [0,0] is in the middle of the screen)
    function updateMouseCoordinates(event, mousePosition) {
        mousePosition.x = ((event.clientX - renderer.domElement.offsetLeft + 0.5) / window.innerWidth) * 2 - 1;
        mousePosition.y = -((event.clientY - renderer.domElement.offsetTop + 0.5) / window.innerHeight) * 2 + 1;
    }

    function render() {
        renderer.render( scene, camera );
    }

    function simulate(time) {
        if ( ! lastTime ) {
            lastTime = time;
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        var time = Date.now();

        simulate(time);
        render();
    }

    function handleManipulationUpdate() {
        rayCaster.setFromCamera(mousePosition, camera);
        {
            var intersects = rayCaster.intersectObjects(tooltipEnabledObjects);

            if (intersects.length > 0) {
                latestMouseProjection = intersects[0].point;
                hoveredObj = intersects[0].object;
            }
        }

        if (tooltipDisplayTimeout || !latestMouseProjection) {
            clearTimeout(tooltipDisplayTimeout);
            tooltipDisplayTimeout = undefined;
            hideTooltip();
        }

        if (!tooltipDisplayTimeout && latestMouseProjection) {
            tooltipDisplayTimeout = setTimeout(function() {
                tooltipDisplayTimeout = undefined;
                showTooltip();
            }, 330);
        }
    }

    // This will move tooltip to the current mouse position and show it by timer.
    function showTooltip() {
        var divElement = $("#tooltip");

        if (divElement && latestMouseProjection) {
            divElement.css({
                display: "block",
                opacity: 0.0
            });

            var canvasHalfWidth = renderer.domElement.offsetWidth / 2;
            var canvasHalfHeight = renderer.domElement.offsetHeight / 2;

            var tooltipPosition = latestMouseProjection.clone().project(camera);
            tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + renderer.domElement.offsetLeft;
            tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + renderer.domElement.offsetTop;

            var tooltipWidth = divElement[0].offsetWidth;
            var tooltipHeight = divElement[0].offsetHeight;

            divElement.css({
                left: `${tooltipPosition.x - tooltipWidth/2}px`,
                top: `${tooltipPosition.y - tooltipHeight - 5}px`
            });

            // var position = new THREE.Vector3();
            // var quaternion = new THREE.Quaternion();
            // var scale = new THREE.Vector3();
            // hoveredObj.matrix.decompose(position, quaternion, scale);
            divElement.text(hoveredObj.userData.tooltipText);

            setTimeout(function() {
                divElement.css({
                    opacity: 1.0
                });
            }, 25);
        }
    }

    // This will immediately hide tooltip.
    function hideTooltip() {
        var divElement = $("#tooltip");
        if (divElement) {
            divElement.css({
                display: "none"
            });
        }
    }
    
    var randomCartesians = [];
        
    function createRandomSpheres() {
        var length = 10;
        var radius = 0.5;

        for (var i = 0; i < 10; i++) {
            var x = Math.random() * length;
            var y = Math.random() * length;
            var z = Math.random() * length;

            var geometry = new THREE.SphereGeometry(radius, 32, 32);
            var material = new THREE.MeshLambertMaterial({color: 0xffff00, vertexColors: THREE.FaceColors});
            var sphere = new THREE.Mesh(geometry, material);

            sphere.position.set(x ,y, z);
            
            randomCartesians.push(new THREE.Vector3( x, y, z ));

            scene.add( sphere);
        }

        calcBestFitPlane(randomCartesians);
    }
    
    function calcBestFitPlane(cartesians) {
        var Adata = [];
        var Bdata = [];

        for(let i = 0; i < cartesians.length; i++) {
            var cartesian = cartesians[i];

            var row = [cartesian.x, cartesian.y, 1];

            Adata.push(row);
            Bdata.push(-cartesian.z);
        }

        var A = math.matrix(Adata);
        var B = math.matrix(Bdata);

        //calc pseudo inverse matrix

        var AT = math.transpose(A);

        var tmp = math.multiply(AT, A);

        tmp = math.inv(tmp);

        tmp = math.multiply(tmp, AT);

        let result = math.multiply(tmp, B);

        var resultArray = result.valueOf();

        var normal = new THREE.Vector3(resultArray[0], resultArray[1], 1);

        var distance = resultArray[2] / normal.length();

        normal.normalize();

        console.log(normal);
        console.log(distance);

        var plane = new THREE.Plane(normal, distance);

        var helper = new THREE.PlaneHelper(plane, 20, 0xffff00);
        scene.add(helper);
    }
    
    function start(data) {
        init();
        createLight();
        createAxis();

        var totalThickness = 0;

        for (var i = 0; i < data.length; i++)
            totalThickness += data[i].thickness;

        var heightGapBetweenCubic = 0;
        var verticalHeight = 0;

        if(totalThickness >= 8) {
            heightGapBetweenCubic = 0.1;
            verticalHeight = totalThickness + heightGapBetweenCubic * (data.length);
        }
        else {
            heightGapBetweenCubic = (8 - totalThickness) / (data.length);
            verticalHeight = 8;
        }

        createGrid(8, verticalHeight);

        createRandomSpheres();

        /*
        var height = heightGapBetweenCubic;

        for (i = 0; i < data.length; i++)
        {
            createCubic(i, data[i].leftBottom, data[i].rightTop, height, data[i].thickness);

            height = height + data[i].thickness + heightGapBetweenCubic;
        }

         */

        animate();
    }

    return {
        start: start
    }
})();