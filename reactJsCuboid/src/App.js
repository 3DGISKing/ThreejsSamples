import React, {Component} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Dat from "dat.gui";
import "three-dat.gui";

const MIN_CUBOID_WIDTH = 1;
const MAX_CUBOID_WIDTH = 10;

const MIN_CUBOID_DEPTH = 1;
const MAX_CUBOID_DEPTH = 10;

const CUBOID_HEIGHT = 8;

class App extends Component {
    constructor(props) {
        super(props);

        this._cuboidWidth = 1;
        this._cuboidDepth = 1;

    }

    initThreeJs () {
        this.scene = new THREE.Scene();

        // Background could be white.
        //this.scene.background = new THREE.Color(0xffffff );
        this.scene.background = new THREE.Color(0x000000 );

        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.setupCamera();
        this.createLight();
        this.setupGUIScene();
        this.setupScene();

        let self = this;

        let animate = function () {
            requestAnimationFrame(animate);

            self.cube.rotation.x += 0.01;
            self.cube.rotation.y += 0.01;
            self.renderer.render(self.scene, self.camera);
        };

        animate();
    }

    setupCamera() {
        let fov = 75;
        let near = 0.1;
        let far = 1000;

        this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);
        this.camera.position.z = 20;

        // Use OrbitControl to control the camera.
        this.controls = new OrbitControls( this.camera, this.renderer.domElement);

        this.controls.maxPolarAngle = Math.PI * 1.5;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 50;
    }

    createLight() {
        this.scene.add( new THREE.AmbientLight(0x000066));

        let pointLight = new THREE.PointLight(0xffffff, 1, 10);
        pointLight.position.set(4, 10, 4);
        this.scene.add( pointLight );

        let sphereSize = 1;
        let pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize );

        this.scene.add(pointLightHelper);
    }

    createAxis() {
        let length = 10;

        let headLength = length * 0.1;
        let headWidth = length * 0.03;

        let xDirection = new THREE.Vector3( 1, 0, 0 );

        let origin = new THREE.Vector3( 0, 0, 0 );

        // x axis is red color
        let hex = 0xff0000;

        let arrowHelper = new THREE.ArrowHelper( xDirection, origin, length, hex, headLength, headWidth);
        this.scene.add( arrowHelper );

        // y axis is yellow color
        let yDirection = new THREE.Vector3( 0, 1, 0 );
        hex = 0xffff00;

        arrowHelper = new THREE.ArrowHelper( yDirection, origin, length, hex, headLength, headWidth);
        this.scene.add( arrowHelper );

        // z axis is blue color
        let zDirection = new THREE.Vector3( 0, 0, 1 );
        hex = 0x0000ff;

        arrowHelper = new THREE.ArrowHelper(zDirection, origin, length, hex, headLength, headWidth);
        this.scene.add( arrowHelper);
    }

    setupScene() {
        this.createAxis();

        // The cuboid’s height is always 8’.

        this.boxGeometry = new THREE.BoxGeometry(this._cuboidWidth, CUBOID_HEIGHT, this._cuboidDepth);
        let material = new THREE.MeshLambertMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
        this.cube = new THREE.Mesh(this.boxGeometry, material);

        this.gui.addMaterial("Cuboid Material", material);

        this.scene.add(this.cube);
    }

    setupGUIScene() {
        let folder = this.gui = new Dat.GUI();

        this.gui.addFolder( 'Cuboid Size' );

        let data = {
            Width: this._cuboidWidth,
            Depth: this._cuboidDepth
        };

        let self = this;

        folder.add(data, 'Width').min(MIN_CUBOID_WIDTH).max(MAX_CUBOID_WIDTH).step(1).onChange( function (value) {
            self._cuboidWidth = value;
            self.updateCuboid();
        });

        folder.add(data, 'Depth').min(MIN_CUBOID_DEPTH).max(MAX_CUBOID_DEPTH).step(1).onChange( function (value) {
            self._cuboidDepth = value;
            self.updateCuboid();
        });
    }

    updateCuboid() {
        let scaleFactorX = this._cuboidWidth / this.boxGeometry.parameters.width;
        let scaleFactorY = 1;
        let scaleFactorZ = this._cuboidDepth / this.boxGeometry.parameters.depth;

        this.cube.scale.set( scaleFactorX, scaleFactorY, scaleFactorZ );
    }

    componentDidMount() {
        this.initThreeJs();
    }

    render() {
        return (
            <div/>
        )
    }
}

export default App;


