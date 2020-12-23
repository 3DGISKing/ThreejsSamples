import * as THREE from '../lib/three.js-r123/build/three.module.js'
import {OrbitControls} from '../lib/three.js-r123/examples/jsm/controls/OrbitControls.js'
import {GUI} from "../lib/three.js-r123/examples/jsm/libs/dat.gui.module.js";
import Stats from '../lib/three.js-r123/examples/jsm/libs/stats.module.js';
import {Timeliner, ThreeJsObjectKeyingSet} from "./timeliner/timeliner.js"

const Vector3 = THREE.Vector3;

let camera, scene, renderer, controls, stats;

const sceneBoundingRadius = 100;

const fov = 45;
const near = 1;
const far = sceneBoundingRadius * 10;

const initCameraPosition = new Vector3(0, sceneBoundingRadius * 2, sceneBoundingRadius * 2);
let sphere, cube;
let timelineWidget;

class Viewer {
    constructor(containerId) {
        this._container = document.getElementById(containerId);

        this._initThreejs();
        this._setupScene();
        this._initGUI();

        this._loop(0);

        timelineWidget = new Timeliner();
    }

    _initThreejs(){
        const width = this._container.offsetWidth;
        //const width = window.innerWidth;

        const height = this._container.offsetHeight;

        // camera
        camera = new THREE.PerspectiveCamera( fov, width / height, near, far );
        camera.position.copy(initCameraPosition);
       // camera.lookAt(new Vector3(0, 0, 0))

        // scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x000000 );
        scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

        //renderer
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( width, height );

        this._container.appendChild( renderer.domElement );

        // controls
        controls = new OrbitControls( camera, renderer.domElement );

        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 0;
        controls.maxDistance = sceneBoundingRadius * 10;

        stats = new Stats();
        document.body.appendChild( stats.dom );

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    }

    _setupScene(){
        this._setupSceneDebugHelpers();
        this._setupLights();
        this._setupMyScene();
    }

    _setupSceneDebugHelpers(){
        const axesHelper = new THREE.AxesHelper( sceneBoundingRadius * 1.5);
        scene.add( axesHelper );

        const size = sceneBoundingRadius * 2;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper( size, divisions );
        scene.add( gridHelper );
    }

    _setupLights() {
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

        let geometry = new THREE.SphereGeometry( sceneBoundingRadius / 10, 32, 32 );
        let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        sphere = new THREE.Mesh( geometry, material );

        sphere.position.set(0, 0, 0);
        scene.add( sphere );

        geometry = new THREE.BoxGeometry( sceneBoundingRadius / 5, sceneBoundingRadius / 5, sceneBoundingRadius / 5 );
        material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
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
            console.log(data);
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
        //const width = window.innerWidth;

        const height = this._container.offsetHeight;
        //const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
    }

    _loop(now){
        this._simulate(now);
        this._render();

        stats.update();

        window.requestAnimationFrame(this._loop.bind(this));
    }

    _render() {
        renderer.render( scene, camera );
    }

    _simulate(now) {
    }

    initSphereAnimation () {
        timelineWidget.setTargetThreeJsObject(sphere);

        timelineWidget.addThreeJsObjectKeyingLayer(ThreeJsObjectKeyingSet.PositionX);

        timelineWidget.addThreejsObjectKeyFrame(ThreeJsObjectKeyingSet.PositionX, {
            "time": 0,
            "value": -sceneBoundingRadius,
            "_color": "#893c0f",
            "tween": "quadEaseIn"
        });

        timelineWidget.addThreejsObjectKeyFrame(ThreeJsObjectKeyingSet.PositionX, {
            "time": 3,
            "value": 0,
            "_color": "#b074a0",
            "tween": "quadEaseIn"
        });

        // for last frame no need tween and color
        timelineWidget.addThreejsObjectKeyFrame(ThreeJsObjectKeyingSet.PositionX, {
            "time": 6,
            "value": sceneBoundingRadius,
        });
    }

    initCubeAnimation () {
        timelineWidget.setTargetThreeJsObject(cube);

        timelineWidget.addThreeJsObjectKeyingLayer(ThreeJsObjectKeyingSet.PositionZ);

        timelineWidget.addThreejsObjectKeyFrame(ThreeJsObjectKeyingSet.PositionZ, {
            "time": 0,
            "value": -sceneBoundingRadius,
            "_color": "#000000",
            "tween": "quadEaseIn"
        });

        timelineWidget.addThreejsObjectKeyFrame(ThreeJsObjectKeyingSet.PositionZ, {
            "time": 3,
            "value": 0,
            "_color": "#ffffff",
            "tween": "quadEaseIn"
        });

        // for last frame no need tween and color
        timelineWidget.addThreejsObjectKeyFrame(ThreeJsObjectKeyingSet.PositionZ, {
            "time": 5,
            "value": sceneBoundingRadius,
        });
    }

    selectSphere() {
        timelineWidget.setTargetThreeJsObject(sphere);
    }

    selectCube() {
        timelineWidget.setTargetThreeJsObject(cube);
    }
}

export default Viewer;
