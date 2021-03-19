import * as THREE from '../../lib/three.js-r123/build/three.module.js'
import {OrbitControls} from '../../lib/three.js-r123/examples/jsm/controls/OrbitControls.js'
import {GUI} from "../../lib/three.js-r123/examples/jsm/libs/dat.gui.module.js";
import Stats from '../../lib/three.js-r123/examples/jsm/libs/stats.module.js';
import {EffectComposer} from '../../lib/three.js-r123/examples/jsm/postprocessing/EffectComposer.js'
import {RenderPass} from '../../lib/three.js-r123/examples/jsm/postprocessing/RenderPass.js'
import {ShaderPass} from '../../lib/three.js-r123/examples/jsm/postprocessing/ShaderPass.js'

const Vector3 = THREE.Vector3;

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

        const renderTargetParameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            stencilBuffer: false
        };

        const renderTarget = new THREE.WebGLRenderTarget(width, height, renderTargetParameters);

        const composer2 = new EffectComposer(renderer, renderTarget);

        this._composer = composer2;
        var render2Pass = new RenderPass( scene, this._camera );
        composer2.addPass( render2Pass );

        var effectHorizBlur = new ShaderPass( THREE1.HorizontalBlurShader );
        var effectVertiBlur = new ShaderPass( THREE1.VerticalBlurShader );

        effectHorizBlur.uniforms[ "h" ].value = 2 / width;
        effectVertiBlur.uniforms[ "v" ].value = 2 / height;

        composer2.addPass( effectHorizBlur );
        composer2.addPass( effectVertiBlur );

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
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.set(0, 0, 0);
        scene.add(sphere);
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
        //const width = window.innerWidth;

        const height = this._container.offsetHeight;
        //const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    _loop(now) {
        this._simulate(now);
        this._render();

        this._stats.update();

        window.requestAnimationFrame(this._loop.bind(this));
    }

    _render() {
        //this._renderer.render(this._scene, this._camera);

        this._composer.render();
    }

    _simulate(now) {

    }
}

export default Viewer;

