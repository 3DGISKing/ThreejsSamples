var clock = new THREE.Clock();
var container;

var isMouseDown = false,
    isMouseMove = false;
var camera, renderer;
var plane, cube;
var raycaster,
    isShiftDown = false;
var raycasterposX, raycasternegX, raycasterposZ, raycasternegZ;

var rollOverMesh, rollOverMaterial;
var cubeGeo, cubeMaterial;
var objArray;

var objects = [];

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    ASPECT = WIDTH / HEIGHT,
    UNITSIZE = 250;

// Global vars
var t = THREE,
    scene,
    cam,
    renderer,
    controls,
    projector;
var p = Physijs;
var mouse = { x: 0, y: 0 };

var mapW = 1000,
    mapH = 1000;
var timeStep;

var world;
var meshArray = [];
var bodyArray = [];

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var canMove = false;

var controlsEnabled = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

var materials = [
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/blocks/white-bricks.jpg") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/blocks/BrickLargeSpecial.jpg") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/blocks/BrickLargeSpecial1.jpg") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/blocks/BrickRound.jpg") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/blocks/ground.jpg") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/blocks/wood.jpg") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/blocks/stone.png") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/blocks/concrete.jpg") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/blocks/ConcreteBunkerDirty.jpg") }),
    new t.MeshLambertMaterial({ color: 0xfbebcd }),
];

var planeMaterials = [
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("images/ground.jpg") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/snow.jpg") }),
    new t.MeshLambertMaterial({ map: t.ImageUtils.loadTexture("textures/concrete.jpg") }),
];

var havePointerLock = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
if (havePointerLock) {
    var element = document.body;
    var pointerlockchange = function (event) {
        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
            controlsEnabled = true;
            controls.enabled = true;
        } else {
            controls.enabled = false;
            //console.log("This doesn't work");
            instructions.style.display = "-webkit-box";
        }
    };

    var pointerlockerror = function (event) {
        instructions.style.display = "";
    };

    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    document.addEventListener("pointerlockerror", pointerlockerror, false);
    document.addEventListener("mozpointerlockerror", pointerlockerror, false);
    document.addEventListener("webkitpointerlockerror", pointerlockerror, false);

    instructions.addEventListener(
        "pointerdown",
        function (event) {
            instructions.style.display = "none";
            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            if (/Firefox/i.test(navigator.userAgent)) {
                var fullscreenchange = function (event) {
                    if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
                        document.removeEventListener("fullscreenchange", fullscreenchange);
                        document.removeEventListener("mozfullscreenchange", fullscreenchange);
                        element.requestPointerLock();
                    }
                };
                document.addEventListener("fullscreenchange", fullscreenchange, false);
                document.addEventListener("mozfullscreenchange", fullscreenchange, false);
                element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
                element.requestFullscreen();
            } else {
                element.requestPointerLock();
            }
        },
        false
    );
} else console.log("This doesn't work 2");

// Editor Variables////

console.log(window.opener.theApp);

const editorApp = window.opener.theApp;

var editor = {
    voxelArray: editorApp.voxels,
    spawnPoint: editorApp.willBeSpawnedObject.position,
    hasPhysics: editorApp._enablePhysics,
    gravity: editorApp._gravity,
    impulse: editorApp._impulse,
    blockMass: editorApp._blockMass,
    isStatic: editorApp._static,
    planeSize: editorApp.gridHalfSize * 2,
    Mountains: editorApp._skyMap.Mountains,
    bluefreeze: editorApp._skyMap.bluefreeze,
    darkland: editorApp._skyMap.darkland,
    city: editorApp._skyMap.city,
    comawhite: editorApp._skyMap.comawhite,
    currentPlaneMaterial: editorApp.currentPlaneMaterial,
};

// var block = window.opener.block;
var block = {
    BRICK: 0,
    GROUND: 1,
    WOOD: 2,
    STONE: 3,
    SPAWN: 4,
};


Physijs.scripts.worker = "libs/physijs_worker.js";
Physijs.scripts.ammo = "ammo.js";

init();
//render();

var playerObject;
function init() {
    mouseTemp = new THREE.Vector2(0, 0);
    container = document.createElement("div");
    document.body.appendChild(container);

    // objArray = createArray(30, 30, 30);
    objArray = [];

    projector = new t.Projector(); // Used in bullet projection

    if (editor.hasPhysics) {
        scene = new p.Scene();
        scene.setGravity(new THREE.Vector3(0, editor.gravity, 0));
        scene.addEventListener("update", function () {
            scene.simulate();
        });
    } else scene = new t.Scene();

    // Set up camera
    cam = new t.PerspectiveCamera(60, ASPECT, 1, 10000); // FOV, aspect, near, far
    cam.position.y = 30;

    scene.add(cam);

    scene.fog = new t.FogExp2(0xd6f1ff, 0.0005); // color, density

    // Camera moves with mouse, flies around with WASD/arrow keys

    controls = new THREE.PointerLockControls(cam);
    controls.getObject().position.x = editor.spawnPoint.x;
    controls.getObject().position.z = editor.spawnPoint.z;
    controls.getObject().position.y = editor.spawnPoint.y += 25;
    scene.add(controls.getObject());

    controls.moveForward = false;
    controls.moveBackward = false;
    controls.moveLeft = false;
    controls.moveRight = false;

    // function that determines the latest direction of the player for the raycaster
    controls.move = function (moveDir) {
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        switch (moveDir) {
            case "forward":
                this.moveForward = true;
                break;
            case "backward":
                this.moveBackward = true;
                break;
            case "left":
                this.moveLeft = true;
                break;
            case "right":
                this.moveRight = true;
                break;
        }
    };

    // cubes

    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xfeb74c, shading: THREE.FlatShading, map: THREE.ImageUtils.loadTexture("textures/white-bricks.jpg") });

    playerObject = new p.BoxMesh(cubeGeo, new p.createMaterial(cubeMaterial, 0.4, 0.8), 0);
    playerObject.position.copy(controls.getObject().position);
    //playerObject.add(controls.getObject());
    playerObject.position.y += 30;

    //scene.add(playerObject);

    // Set up raycaster for jumping
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    setupScene();

    // Lights

    var ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1.75, 0.5).normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.domElement.style.backgroundColor = '#D6F1FF';
    renderer.setClearColor(0xd6f1ff);
    container.appendChild(renderer.domElement);

    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("mousedown", onDocumentMouseDown, false);
    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener("keyup", onDocumentKeyUp, false);
    document.addEventListener("mouseup", onDocumentMouseUp, false);

    //

    //window.addEventListener( 'resize', onWindowResize, false );

    if (editor.hasPhysics) scene.simulate();

    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    render();
}

// Set up the objects in the world
var cannonShape, cannonBody, body;
function setupScene() {
    //meshArray.push(5);
    var UNITSIZE = 250,
        units = mapW;

    var skymaptype;
    if (editor.Mountains) skymaptype = "mountains";
    else if (editor.bluefreeze) skymaptype = "bluefreeze";
    else if (editor.darkland) skymaptype = "darkland";
    else if (editor.city) skymaptype = "city";
    else if (editor.comawhite) skymaptype = "comawhite";
    else console.log("no value found");

    // skybox
    var urlPrefix = "textures/skyboxmaps/" + skymaptype + "/";
    var urls = [urlPrefix + "right.jpg", urlPrefix + "left.jpg", urlPrefix + "top.jpg", urlPrefix + "top.jpg", urlPrefix + "front.jpg", urlPrefix + "back.jpg"];
    var textureCube = THREE.ImageUtils.loadTextureCube(urls);

    var shader = THREE.ShaderLib["cube"];
    var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    uniforms["tCube"].value = textureCube; // textureCube has been init before

    var material = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: uniforms,
        depthWrite: false,
        side: THREE.DoubleSide,
    });

    // build the skybox Mesh
    skyboxMesh = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000, 1, 1, 1), material);
    // add it to the scene
    scene.add(skyboxMesh);

    // Geometry: floor
    var floor = editor.hasPhysics
        ? new p.BoxMesh(new t.CubeGeometry(editor.planeSize * 2, 0, editor.planeSize * 2), new p.createMaterial(planeMaterials[editor.currentPlaneMaterial], 0.4, 0.8), 0)
        : new t.Mesh(new t.CubeGeometry(editor.planeSize * 2, 0, editor.planeSize * 2), planeMaterials[editor.currentPlaneMaterial]);

    scene.add(floor);
    objects.push(floor);

    // Geometry: blocks
    var cube = new t.CubeGeometry(50, 50, 50);

    for (var i = 0; i < editor.voxelArray.length; i++) {
        var voxel = editor.voxelArray[i];

        //if (voxel.t != block.SPAWN) {
            var mesh = editor.hasPhysics
                ? voxel.static
                    ? new p.BoxMesh(cube, new p.createMaterial(materials[voxel.t], 0.4, 0.8), 0)
                    : new p.BoxMesh(cube, new p.createMaterial(materials[voxel.t], 0.4, 0.8), editor.blockMass)
                : new t.Mesh(cube, materials[voxel.t]);

            mesh.position.x = voxel.x * 50 + 25;
            mesh.position.y = voxel.y * 50 + 25;
            mesh.position.z = voxel.z * 50 + 25;
            //mesh.matrixAutoUpdate = true;
            //mesh.updateMatrix();

            let id = voxel.id;

            let object = editorApp.scene.getObjectById(id);

            console.log(object);

            meshArray.push(mesh);
            scene.add(mesh);
            objects.push(mesh);
        //}
    } // end for
} // end function

var bullets = [];
var sphereMaterial = new t.MeshBasicMaterial({ color: 0x333333 });
var sphereGeo = new t.SphereGeometry(5);
var sphere;
var mVec;

function createBullet(obj) {
    if (obj === undefined) {
        obj = controls.getObject();
    }
    sphere = new p.SphereMesh(sphereGeo, new p.createMaterial(sphereMaterial, 0.4, 0.4));

    var vector = controls.getDirection(new t.Vector3(0, 0, 0)).clone();
    //mVec = vector.clone();
    vector.normalize();

    // gets euler angles
    //var angle = Math.acos( vector.dot(new THREE.Vector3(1, 0, 0)) );
    var anglex = Math.acos(vector.dot(new THREE.Vector3(1, 0, 0)));
    var angley = Math.acos(vector.dot(new THREE.Vector3(0, 1, 0)));
    var anglez = Math.acos(vector.dot(new THREE.Vector3(0, 0, 1)));

    // calculates proper position of projectile from euler angles
    sphere.position.set(obj.position.x + 50 * Math.cos(anglex), obj.position.y + 20 + 50 * Math.cos(angley), obj.position.z + 50 * Math.cos(anglez));

    sphere.owner = obj;

    bullets.push(sphere);
    scene.add(sphere);

    mVec = vector.clone();
    sphere.applyCentralImpulse(new t.Vector3(mVec.x * editor.impulse, mVec.y * editor.impulse, mVec.z * editor.impulse));
    //console.log("vector is: " + vector.x);

    return sphere;
}

var mouseTemp;
function onDocumentMouseDown(event) {
    event.preventDefault();

    if (event.which == 1 && controls.enabled && editor.hasPhysics) createBullet();
}

function onDocumentMouseUp(event) {
    event.preventDefault();
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            controls.move("forward");
            moveForward = true;
            break;
        case 37: // left
        case 65: // a
            controls.move("left");
            moveLeft = true;
            break;
        case 40: // down
        case 83: // s
            controls.move("backward");
            moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            controls.move("right");
            moveRight = true;
            break;
        case 32: // space
            if (canJump === true) velocity.y += 350;
            canJump = false;
            break;
    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;
        case 37: // left
        case 65: // a
            moveLeft = false;
            break;
        case 40: // down
        case 83: // s
            moveBackward = false;
            break;
        case 39: // right
        case 68: // d
            moveRight = false;
            break;
    }
}

function render() {
    if (controlsEnabled) {
        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;
        var intersections = raycaster.intersectObjects(objects);
        var isOnObject = intersections.length > 0;
        var time = performance.now();
        var delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        // playerObject.__dirtyPosition = true;
        //playerObject.__dirtyRotation = true;

        //playerObject.rotation.y = controls.getObject().rotation.y;

        //playerObject.setAngularVelocity(new t.Vector3(0,0,0));
        //playerObject.setLinearVelocity(new t.Vector3(0,0,0));

        if (moveForward) velocity.z -= 1000.0 * delta;
        if (moveBackward) velocity.z += 1000.0 * delta;
        if (moveLeft) velocity.x -= 1000.0 * delta;
        if (moveRight) velocity.x += 1000.0 * delta;

        if (isOnObject === true) {
            velocity.y = Math.max(0, velocity.y);
            //controls.getObject().position.y = intersections[0].position.y;
            canJump = true;
        }

        detectCollision();

        if (canMove) {
            controls.getObject().translateX(velocity.x * delta);

            controls.getObject().translateZ(velocity.z * delta);
        }

        controls.getObject().translateY(velocity.y * delta);

        /*
        console.log(controls.getObject().rotation.y);
        console.log(controls.getObject().rotation.x);
        console.log(controls.getObject().rotation.z);
        console.log("Player: " + playerObject.rotation.y);
        console.log(player-Object.rotation.x);
        console.log(playerObject.rotation.z);
        */
        //playerObject.translateX(velocity.x * delta);
        //playerObject.translateY(velocity.y * delta);
        //playerObject.translateZ(velocity.z * delta);

        //controls.getObject().position.x = playerObject.position.x;
        //controls.getObject().position.y = playerObject.position.y;
        //controls.getObject().position.z = playerObject.position.z;

        //console.log(controls.moveLeft);

        if (controls.getObject().position.y < 25) {
            velocity.y = 0;
            controls.getObject().position.y = 25;
            canJump = true;
        }

        if (isOnObject) {
            console.log("YEP");
            //controls.getObject().position.y = intersections[0].position.y + 25;
        }
        prevTime = time;
    }

    // Step the physics world
    // console.log(body.position + "this is the first body position before world step");

    //console.log(body.position + "this is the first body position");

    requestAnimationFrame(render);
    renderer.render(scene, cam);
}

function detectCollision() {
    //canMove = false;
    var rotationMatrix;
    var cameraDirection = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();

    // if the player is looking straight up, the x and z components are both set to zero?
    cameraDirection.setY(0);

    if (controls.moveForward) {
        //console.log("We do nothing");
    } else if (controls.moveBackward) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY((180 * Math.PI) / 180);
    } else if (controls.moveLeft) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY((90 * Math.PI) / 180);
    } else if (controls.moveRight) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(((360 - 90) * Math.PI) / 180);
    } else return;

    if (rotationMatrix !== undefined) {
        cameraDirection.applyMatrix4(rotationMatrix);
    }
    var myrayCaster = new THREE.Raycaster(controls.getObject().position, cameraDirection);
    var intersects = myrayCaster.intersectObjects(objects);

    if (intersects.length > 0 && intersects[0].distance < 25) canMove = false;
    else canMove = true;
}

function onDocumentMouseMove(e) {
    e.preventDefault();
    mouse.x = (e.clientX / WIDTH) * 2 - 1;
    mouse.y = -(e.clientY / HEIGHT) * 2 + 1;
}

$(window).resize(function () {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    ASPECT = WIDTH / HEIGHT;
    if (cam) {
        cam.aspect = ASPECT;
        cam.updateProjectionMatrix();
    }
    if (renderer) {
        renderer.setSize(WIDTH, HEIGHT);
    }
});

$(window).focus(function () {
    if (controls) controls.freeze = false;
});
$(window).blur(function () {
    if (controls) controls.freeze = true;
});

function calcDegrees(radians) {
    return (radians * 180) / Math.PI;
}