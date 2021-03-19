import * as THREE from '../../lib/three.js-r123/build/three.module.js'
import {OrbitControls} from '../../lib/three.js-r123/examples/jsm/controls/OrbitControls.js'
import {GUI} from "../../lib/three.js-r123/examples/jsm/libs/dat.gui.module.js";
import Stats from '../../lib/three.js-r123/examples/jsm/libs/stats.module.js';
import {EffectComposer} from '../../lib/three.js-r123/examples/jsm/postprocessing/EffectComposer.js'
import {RenderPass} from '../../lib/three.js-r123/examples/jsm/postprocessing/RenderPass.js'
import {ShaderPass} from '../../lib/three.js-r123/examples/jsm/postprocessing/ShaderPass.js'
import {UnrealBloomPass} from '../../lib/three.js-r123/examples/jsm/postprocessing/UnrealBloomPass.js'

const Vector3 = THREE.Vector3;

const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );
const darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
const materials = {};

class Viewer {
    constructor(containerId) {
        this._container = document.getElementById(containerId);

        this._sceneBoundingRadius = 100;

        this._fov = 45;
        this._near = 1;
        this._far = this._sceneBoundingRadius * 10;
        this._initCameraPosition = new Vector3(0, this._sceneBoundingRadius * 2, this._sceneBoundingRadius * 2);

        this._initThreejs();
        this._setupScene();
        this._initGUI();

        this._loop(0);
    }

    _initThreejs() {
        const width = this._container.offsetWidth;
        const height = this._container.offsetHeight;

        // camera
        this._camera = new THREE.PerspectiveCamera(this._fov, width / height, this._near, this._far);
        this._camera.position.copy(this._initCameraPosition);

        // scene
        const scene = new THREE.Scene();
        this._scene = scene;

        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

        //renderer
        const renderer = new THREE.WebGLRenderer({antialias: true});

        this._renderer = renderer;

        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        this._container.appendChild(renderer.domElement);

        const bloomPass = new UnrealBloomPass( new THREE.Vector2( width, height ), 1.5, 0.4, 0.85 );

        const params = {
            exposure: 1,
            bloomStrength: 0.8,
            bloomThreshold: 0,
            bloomRadius: 0
        };

        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;

        const bloomComposer = new EffectComposer( renderer );

        this._composer = bloomComposer;

        const renderPass = new RenderPass( scene, this._camera );

        bloomComposer.renderToScreen = false;
        bloomComposer.addPass( renderPass );
        bloomComposer.addPass( bloomPass );

        const finalPass = new ShaderPass(
            new THREE.ShaderMaterial( {
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: bloomComposer.renderTarget2.texture }
                },
                vertexShader: document.getElementById( 'vertexshader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                defines: {}
            } ), "baseTexture"
        );

        finalPass.needsSwap = true;

        const finalComposer = new EffectComposer( renderer );

        this._finalComposer = finalComposer;

        finalComposer.addPass( renderPass );
        finalComposer.addPass( finalPass );


        // controls
        let controls = new OrbitControls(this._camera, this._renderer.domElement);

        this._controls = controls;

        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 0;
        controls.maxDistance = this._sceneBoundingRadius * 10;

        this._stats = new Stats();
        document.body.appendChild(this._stats.dom);

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    _setupScene() {
        this._setupSceneDebugHelpers();
        this._setupLights();
        this._setupMyScene();
    }

    _setupSceneDebugHelpers() {
        const scene = this._scene;

        const axesHelper = new THREE.AxesHelper(this._sceneBoundingRadius * 1.5);
        scene.add(axesHelper);

        const size = this._sceneBoundingRadius * 2;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);
    }

    _setupLights() {
        const scene = this._scene;

        scene.add(new THREE.AmbientLight(0x666666));

        let light = new THREE.DirectionalLight(0xdfebff, 1);
        light.position.set(this._sceneBoundingRadius, this._sceneBoundingRadius, 0);

        light.castShadow = true;

        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;

        let d = 300;

        light.shadow.camera.left = -d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = -d;

        light.shadow.camera.far = 1000;

        scene.add(light);

        const helper = new THREE.DirectionalLightHelper(light, 5);

        scene.add(helper);

        this._camera.add(new THREE.PointLight(0xffffff, 0.9));

        scene.add(this._camera);
    }

    _setupMyScene() {
        // todo

        const scene = this._scene;

        const geometry = new THREE.SphereGeometry(this._sceneBoundingRadius / 3, 32, 32);
        const material = new THREE.MeshPhongMaterial({color: 0xffff00});
        const sphere1 = new THREE.Mesh(geometry, material);
        const sphere2 = new THREE.Mesh(geometry, material);

        sphere1.position.set(this._sceneBoundingRadius, 0, 0);
        sphere2.position.set(-this._sceneBoundingRadius, 0, 0);

        scene.add(sphere1);
        scene.add(sphere2);

        sphere1.layers.enable( BLOOM_SCENE );
    }

    _initGUI() {
        const gui = new GUI();

        const twoPi = 6.28;

        const data = {
            radius: 15,
            widthSegments: 8,
            heightSegments: 6,
            phiStart: 0,
            phiLength: twoPi,
            thetaStart: 0,
            thetaLength: Math.PI
        };

        function onChange() {
            console.log(data);
        }

        const folder = gui.addFolder('THREE.SphereBufferGeometry');

        folder.add(data, 'radius', 1, 30).onChange(onChange);
        folder.add(data, 'widthSegments', 3, 32).step(1).onChange(onChange);
        folder.add(data, 'heightSegments', 2, 32).step(1).onChange(onChange);
        folder.add(data, 'phiStart', 0, twoPi).onChange(onChange);
        folder.add(data, 'phiLength', 0, twoPi).onChange(onChange);
        folder.add(data, 'thetaStart', 0, twoPi).onChange(onChange);
        folder.add(data, 'thetaLength', 0, twoPi).onChange(onChange);
    }

    onWindowResize() {
        const width = this._container.offsetWidth;
        const height = this._container.offsetHeight;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
    }

    _loop(now) {
        this._simulate(now);
        this._render();

        this._stats.update();

        window.requestAnimationFrame(this._loop.bind(this));
    }

    _render() {
        this.renderBloom(true);
        this._finalComposer.render();
    }

    renderBloom( mask ) {

        if ( mask === true ) {

            this._scene.traverse( darkenNonBloomed );
            this._composer.render();
            this._scene.traverse( restoreMaterial );

        } else {

            camera.layers.set( BLOOM_SCENE );
            bloomComposer.render();
            camera.layers.set( ENTIRE_SCENE );

        }

    }

    _simulate(now) {

    }
}

function darkenNonBloomed( obj ) {

    if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {

        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;

    }

}

function restoreMaterial( obj ) {

    if ( materials[ obj.uuid ] ) {

        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];

    }

}

export default Viewer;

