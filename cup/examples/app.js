import * as THREE from '../build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

let container;
let camera, scene, renderer;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let controls;

const showDebugPointLightHelper = false;
const showDebugAxis = false;
const debugAxisSize = 50;
const showDebugGrid = false;
const debugGridSize = 50;

let cup1, cup2Inside, cup2Outside, lid1_0, lid1_1 , lid2;
let whiteTexture, cartonTexture, blackLidTexture, whiteLidTexture;

const initCameraPosition = new THREE.Vector3( 6.880063557512055, 24.004917616686033, 31.076246626784418);
const textureLoader = new THREE.TextureLoader();

init();
load();
animate();

function init() {
    threeJsInit();

    const jqUserImage = $("#userImage");

    jqUserImage.change(function(){
        const image = document.createElement('img');
        let texture = new THREE.Texture(image);

        image.onload = function()  {
            texture.needsUpdate = true;

            cup2Outside.material.map = texture;
            cup2Outside.material.needsUpdate = true;
        };

        const fileData = jqUserImage.prop('files')[0];

        const reader = new FileReader();

        reader.onload = function(e) {
            image.src = e.target.result;
        };

        reader.readAsDataURL(fileData);
    });

    whiteTexture = textureLoader.load( "image/paper.jpg");
    cartonTexture = textureLoader.load( "image/carton.jpg");
    blackLidTexture = textureLoader.load( "image/black.png");
    whiteLidTexture = textureLoader.load( "image/white.png");

    const jqWhiteCarton = $("#white-carton");

    jqWhiteCarton.click( function() {
        changeCupTexture(this.checked)
    });

    $('#lid-color').on('change', function()
    {
        changeLidColor(this.value);
    });

    $('#capture').click(function () {
        const dataUrl = renderer.domElement.toDataURL("image/jpg");

        const downloadURL = function(data, fileName) {
            let a;
            a = document.createElement('a');
            a.href = data;
            a.download = fileName;
            document.body.appendChild(a);
            a.style = 'display: none';
            a.click();
            a.remove();
        };

        downloadURL(dataUrl, 'capture.jpg');

        setTimeout(function() {
            return window.URL.revokeObjectURL(dataUrl);
        }, 1000);
    });
}

function changeCupTexture(isWhite) {
    if(isWhite)
        changeAllCupTexture(whiteTexture);
    else
        changeAllCupTexture(cartonTexture);
}

function changeLidColor(color) {
    if(color === 'Black')
        changeAllLidColor( new THREE.Color(0.1, 0.1, 0.1));
    else if (color === 'White')
        changeAllLidColor( new THREE.Color(1, 1, 1));
    else
        changeAllLidColor(new THREE.Color(0.6510000228881836, 0.8980000019073486, 0.8980000019073486));
}

function initWithParam() {
    const jqParam = $('#param');

    const cupTexturePath = jqParam.attr('image');

    // this will be not work because changeCupTexture will be called after.
    const cupTexture = textureLoader.load( cupTexturePath);

    cup2Outside.material.map = cupTexture;
    cup2Outside.material.needsUpdate = true;

    const lidOption = jqParam.attr('lid_option');

    changeLidColor(lidOption);

    const paperMaterial = jqParam.attr('paper_material');

    changeCupTexture(paperMaterial === 'White');
}

function changeAllCupTexture(texture) {
    cup2Inside.material.map = texture;
    cup2Inside.material.needsUpdate = true;

    cup2Outside.material.map = texture;
    cup2Outside.material.needsUpdate = true;
}

function changeAllLidTexture(texture) {
    lid1_0.material.map = texture;
    lid1_0.material.needsUpdate = true;

    lid1_1.material.map = texture;
    lid1_1.material.needsUpdate = true;

    lid2.material.map = texture;
    lid2.material.needsUpdate = true;
}

function changeAllLidColor(color) {
    lid2.material.color = color;
    lid2.material.needsUpdate = true;
}

function threeJsInit() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.copy(initCameraPosition);

    // scene
    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5);
    scene.add( ambientLight );

    let pointLight = new THREE.PointLight( 0xffffff, 0.7);

    pointLight.position.set(10, 20, 10 );

    scene.add( pointLight );

    if(showDebugPointLightHelper) {
        const sphereSize = 1;

        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        scene.add( pointLightHelper );
    }

    scene.add( camera );

    renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true
    });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 1 );

    container.appendChild( renderer.domElement );

    controls = new OrbitControls( camera, renderer.domElement );

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 1;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    controls.target.set(7.04412551139941, 0, -19.934060715829595);

    window.addEventListener( 'resize', onWindowResize, false );

    if(showDebugAxis) {
        const axesHelper = new THREE.AxesHelper( debugAxisSize );

        scene.add( axesHelper );
    }

    if(showDebugGrid) {
        const helper = new THREE.GridHelper( debugGridSize, debugGridSize, 0xFF4444, 0x404040 );

        scene.add( helper );
    }
}

function load() {
    const loadingManager = new THREE.LoadingManager();

    loadingManager.onProgress = function ( item, loaded, total ) {
        if(loaded === total)
            initWithParam();
    };

    const gltfUrls = {
        cup2Outside : "models/cup2_outside.gltf",
        cup2Inside : "models/cup2_inside.gltf",
        lid2 : "models/lid2.gltf",
    };

    const gltfLoader = new GLTFLoader(loadingManager);

    for (let key in gltfUrls) {
        gltfLoader.load(gltfUrls[key], (function(gltf) {
                gltf.scene.traverse( function ( child ) {
                    if ( child.isMesh ) {
                        if(child.name === 'cup2_inside')
                            cup2Inside = child;

                        if(child.name === 'cup2_outside')
                            cup2Outside = child;

                        if(child.name === 'lid2')
                            lid2 = child;
                    }

                } );

                scene.add( gltf.scene );
            }
        ))
    }
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}