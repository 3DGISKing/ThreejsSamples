import * as THREE from '../../lib/three.js-r123/build/three.module.js'
import {OrbitControls} from '../../lib/three.js-r123/examples/jsm/controls/OrbitControls.js'
import {GUI} from "../../lib/three.js-r123/examples/jsm/libs/dat.gui.module.js";
import Stats from '../../lib/three.js-r123/examples/jsm/libs/stats.module.js';

const Vector3 = THREE.Vector3;

const sceneBoundingRadius = 100;

const fov = 45;
const near = 1;
const far = sceneBoundingRadius * 10;

const initCameraPosition = new Vector3(0, sceneBoundingRadius * 2, sceneBoundingRadius * 2);

class Viewer {
    constructor(containerId) {
        this._container = document.getElementById(containerId);

        this._containerId = containerId;

        this._initThreejs();
        this._setupScene();
        this._initGUI();

        this._loop(0);
    }

    _initThreejs(){
        const width = this._container.offsetWidth;
        const height = this._container.offsetHeight;

        // camera
        this._camera = new THREE.PerspectiveCamera( fov, width * 2 / height, near, far );

        const camera = this._camera;
        camera.position.copy(initCameraPosition);

        // scene
        this._scene = new THREE.Scene();

        const scene = this._scene;
        scene.background = new THREE.Color( 0x000000 );
        scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

        //renderer
        const renderer = new THREE.WebGLRenderer( { antialias: true } );

        this._renderer = renderer;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio( window.devicePixelRatio );

        renderer.setSize( width, height );

        if(this._containerId === 'threejsContainerLeft') {
            renderer.setViewport(0, 0, width * 2, height);

            window.leftCamera = camera;
        }
        else {
            renderer.setViewport(-width, 0, width * 2, height);
            window.rightCamera = camera;
        }

        this._container.appendChild( renderer.domElement );

        // controls
        const controls = new OrbitControls( camera, renderer.domElement );

        controls.addEventListener('change', () =>{
            if(this._containerId === 'threejsContainerLeft') {
                window.rightCamera.position.copy(window.leftCamera.position);
                window.rightCamera.rotation.copy(window.leftCamera.rotation);
            }
            else {
                window.leftCamera.position.copy(window.rightCamera.position);
                window.leftCamera.rotation.copy(window.rightCamera.rotation);
            }
        });

        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 0;
        controls.maxDistance = sceneBoundingRadius * 10;

        this._stats = new Stats();
        document.body.appendChild( this._stats.dom );

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    }

    _setupScene(){
        this._setupSceneDebugHelpers();
        this._setupLights();
        this._setupMyScene();
    }

    _setupSceneDebugHelpers(){
        const scene = this._scene;

        const axesHelper = new THREE.AxesHelper( sceneBoundingRadius * 1.5);
        scene.add( axesHelper );

        const size = sceneBoundingRadius * 2;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper( size, divisions );
        scene.add( gridHelper );
    }

    _setupLights() {
        const scene = this._scene;

        scene.add( new THREE.AmbientLight( 0x666666 ) );

        let light = new THREE.DirectionalLight( 0xdfebff, 1 );
        light.position.set( sceneBoundingRadius, sceneBoundingRadius,  0);

        light.castShadow = true;

        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;

        let d = 300;

        light.shadow.camera.left = - d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = - d;

        light.shadow.camera.far = 1000;

        scene.add( light );

        const helper = new THREE.DirectionalLightHelper( light, 5 );
        scene.add( helper );
    }

    _setupMyScene(){
        // todo

        const scene = this._scene;

        const geometry = new THREE.SphereGeometry( sceneBoundingRadius / 10, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        const sphere = new THREE.Mesh( geometry, material );

        sphere.position.set(sceneBoundingRadius, 0, 0);
        scene.add( sphere );
    }

    _initGUI(){
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

        }

        const folder = gui.addFolder( 'THREE.SphereBufferGeometry' );

        folder.add( data, 'radius', 1, 30 ).onChange( onChange );
        folder.add( data, 'widthSegments', 3, 32 ).step( 1 ).onChange( onChange );
        folder.add( data, 'heightSegments', 2, 32 ).step( 1 ).onChange( onChange );
        folder.add( data, 'phiStart', 0, twoPi ).onChange( onChange );
        folder.add( data, 'phiLength', 0, twoPi ).onChange( onChange );
        folder.add( data, 'thetaStart', 0, twoPi ).onChange( onChange );
        folder.add( data, 'thetaLength', 0, twoPi ).onChange( onChange );
    }

    onWindowResize(){
        const width = this._container.offsetWidth;
        const height = this._container.offsetHeight;

        const camera = this._camera;

        camera.aspect = width * 2 / height;
        camera.updateProjectionMatrix();
        this._renderer.setSize( width, height );

        if(this._containerId === 'threejsContainerLeft')
            this._renderer.setViewport(0, 0, width * 2, height);
        else
            this._renderer.setViewport(-width, 0, width * 2 , height);
    }

    _loop(now){
        this._simulate(now);
        this._render();

        this._stats.update();

        window.requestAnimationFrame(this._loop.bind(this));
    }

    _render() {
        this._renderer.render( this._scene, this._camera );
    }

    _simulate(now) {

    }
}

export default Viewer;

