const backColor = '000000';
const countryFocus = "China";
const globeRadius = 750;
let globe;

// Main scene vars
let camera, scene, renderer, spotLight;
let camPos = {x: 100, y: 100, z: 1200};
let browserRender;

function initSceneVars() {
    // changes background colour
    $('body').css('background-color', '#'+backColor);

    // removes previous canvas if exists
    $('canvas').remove();

    // Creating new scene
    scene = new THREE.Scene();

    // Setting the camera
    camera = new THREE.PerspectiveCamera(60,
        window.innerWidth / window.innerHeight,
        1,
        5000);

    camera.position.set(camPos.x, camPos.y, camPos.z);
}

function initWebGLScene() {
    // Setting the renderer (with shadows)
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Switch off the shadows for safari due to the three.js bug with it
    if (!$.browser.safari && $.browser.version !== "534.57.2") {
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;
    }

    $('body').append(renderer.domElement);

    const particles = new THREE.Geometry();

    particles.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 0, 0)));

    const gpMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 3800,
        map: THREE.ImageUtils.loadTexture(
            "img/world_glow.png"
        ),
        blending: THREE.AdditiveBlending,
    });

    const particleGlow = new THREE.ParticleSystem(particles, gpMaterial);

    particleGlow.sortParticles = true;
    scene.add(particleGlow);

    const matDif = THREE.ImageUtils.loadTexture("img/world_diffuse.jpg");

    // setting up the bump map
    const mapBump = THREE.ImageUtils.loadTexture("img/world_bump.jpg");

    mapBump.anisotropy = 1;
    mapBump.repeat.set(1, 1);
    mapBump.offset.set(0, 0);
    mapBump.wrapS = mapBump.wrapT = THREE.RepeatWrapping;
    mapBump.format = THREE.RGBFormat;

    // setting up the material
    const sphereMaterial = new THREE.MeshPhongMaterial({
        ambient: 0x444444,
        color: 0x777777,
        shininess: 40,
        specular: 0x222222,
        shading: THREE.SmoothShading,
        side: THREE.DoubleSide,
        map: matDif,
        bumpMap: mapBump,
        bumpScale: 10
    });

    globe = new THREE.Mesh(new THREE.SphereGeometry(globeRadius,
        64,
        64),
        sphereMaterial);

    globe.receiveShadow = true;
    // add the globe to the scene
    scene.add(globe);

    // focus the globe on a certain country
    const countryConfig = country[countryFocus];
    globe.rotation.set(countryConfig.lat.toRad(), Math.PI - countryConfig.lng.toRad(), 0);

    let light = new THREE.DirectionalLight(0x999999);
    light.position.set(-1, 0, 1).normalize();
    scene.add(light);

    light = new THREE.DirectionalLight(0x999999);
    light.position.set(0, 1, -1).normalize();
    scene.add(light);

    light = new THREE.DirectionalLight(0x999999);
    light.position.set(1, 0, -1).normalize();
    scene.add(light);

    spotLight = new THREE.SpotLight(0xFFFFFF, 2);
    spotLight.position.set(camPos.x, camPos.y, camPos.z);
    spotLight.target.position.set(0, 0, 0);

    spotLight.shadowCameraNear = 1;
    spotLight.shadowCameraFar = 3000;
    spotLight.shadowCameraFov = 100;
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 0.4;
    spotLight.shadowBias = 0.001;

    scene.add(spotLight);
}

function initScene() {
    // Detecting the renderer:
    browserRender = detectRenderer();

    // Setting the renderer to null in case an old version of FF or IE
    if (($.browser.msie && parseFloat($.browser.version) < 9) ||
        ($.browser.mozilla && parseFloat($.browser.version) < 2)) {
        browserRender = null;
    }

    if (browserRender === 'webgl') {
        initSceneVars();
        initWebGLScene();
    } else {

    }
}

function animateScene() {
    requestAnimationFrame(animateScene);

    if (browserRender === 'webgl') {
        // set the spotlight to move with the camera
        spotLight.position.set(camera.position.x,
            camera.position.y - 200,
            camera.position.z + 200);
    }

    const rotation = globe.rotation;

    globe.rotation.set(rotation.x, rotation.y + 0.002, 0);
    renderer.render(scene, camera);
}

// Converts numeric degrees to radians
if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

function detectRenderer (){
    // Detecting the renderer - from webgl detector
    var ifcanvas = !! window.CanvasRenderingContext2D;
    var ifwebgl = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )();

    // Init vars and scene depending on the renderer
    if ( ifwebgl ) {
        return 'webgl'
    }
    else if ( ifcanvas ) {
        return 'canvas'
    }
    else {
        return 'none';
    }
}

initScene();
animateScene();