const Vector3 = THREE.Vector3;

let camera, scene, renderer, controls, stats;

const sceneBoundingRadius = 100;

const fov = 45;
const near = 1;
const far = sceneBoundingRadius * 10;

const initCameraPosition = new Vector3(0, sceneBoundingRadius * 2, sceneBoundingRadius * 2);
//const initCameraPosition = new Vector3(0, 0, sceneBoundingRadius * 2);

class Viewer {
    constructor(containerId) {
        this._container = document.getElementById(containerId);

        this._initThreejs();
        this._setupScene();
        this._initGUI();

        this._loop(0);
    }

    _initThreejs(){
        const width = this._container.offsetWidth;
        //const width = window.innerWidth;

        const height = this._container.offsetHeight;

        // camera
        camera = new THREE.PerspectiveCamera( fov, width / height, near, far );

        //camera.rotation.order = "ZXY";
        camera.position.copy(initCameraPosition);
        camera.lookAt(new Vector3(0, 0, 0))

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
        controls = new THREE.OrbitControls( camera, renderer.domElement );

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

    _createFrustum(){
        const f = 0.3;

        const positions = [
            0,  0,  0,
            -f, -f, +1,

            0,  0,  0,
            f, -f, +1,

            0,  0,  0,
            f,  f, +1,

            0,  0,  0,
            -f,  f, +1,

            -f, -f, +1,
            f, -f, +1,

            f, -f, +1,
            f,  f, +1,

            f,  f, +1,
            -f,  f, +1,

            -f,  f, +1,
            -f, -f, +1,
        ];

        const geometry = new THREE.LineGeometry();

        geometry.setPositions(positions);
        geometry.verticesNeedUpdate = true;
        geometry.computeBoundingSphere();

        let material = new THREE.LineMaterial({
            color: 0x6f7292,
            linewidth: 2,
            resolution:  new THREE.Vector2(1000, 1000),
        });

        const line = new THREE.Line2(geometry, material);

        line.computeLineDistances();

        // draw face

        let geom = new THREE.Geometry();

        geom.vertices.push(new THREE.Vector3(-f, -f, 1));
        geom.vertices.push(new THREE.Vector3(f, -f, 1));
        geom.vertices.push(new THREE.Vector3(f, f, 1));
        geom.vertices.push(new THREE.Vector3(-f, f, 1));

        geom.faces.push(new THREE.Face3(0, 1, 2));
        geom.faces.push(new THREE.Face3(0, 2, 3));

        geom.faceVertexUvs[0].push([
            new THREE.Vector2(0, 1),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(1, 0)
        ]);

        geom.faceVertexUvs[0].push([
            new THREE.Vector2(0, 1),
            new THREE.Vector2(1, 0),
            new THREE.Vector2(0, 0)
        ]);

        material = new THREE.MeshBasicMaterial({
            color: 0x4c4c4c,
            side: THREE.DoubleSide,
            opacity: 0.5,
            transparent: true
        });

        const mesh = new THREE.Mesh(geom, material);

        line.add(mesh);

        return line;
    }

    _setupMyScene(){
        // todo

        const geometry = new THREE.SphereGeometry( sceneBoundingRadius / 10, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        const sphere = new THREE.Mesh( geometry, material );

        sphere.position.set(sceneBoundingRadius, 0, 0);
        scene.add( sphere );

        let frustum = this._createFrustum();

        const scale = 50;

        frustum.scale.set(scale, scale, scale);

        frustum.position.set(sceneBoundingRadius  , 0 ,0);

        const axesHelper = new THREE.AxesHelper( sceneBoundingRadius * 1.5);

        axesHelper.position.set(sceneBoundingRadius  , 0 ,0);
        scene.add( axesHelper );

        frustum.rotation.set((-45 + 180) * Math.PI/ 180, 0, 0);

        scene.add( frustum );
    }

    _initGUI(){
        const gui = new dat.gui.GUI();

        const twoPi = 6.28;

        const data = {
            rotationX: camera.rotation.x * 180 / Math.PI,
            rotationY: camera.rotation.y * 180 / Math.PI,
            rotationZ: camera.rotation.z * 180 / Math.PI,
        };

        function onChange() {
            console.log(data);

            camera.rotation.set(data.rotationX * Math.PI / 180, data.rotationY * Math.PI / 180, data.rotationZ * Math.PI / 180);
        }

        const folder = gui.addFolder( 'Camera Rotation' );

        folder.add( data, 'rotationX', -360, 360 ).step( 1 ).onChange( onChange );
        folder.add( data, 'rotationY', -360, 360 ).step( 1 ).onChange( onChange );
        folder.add( data, 'rotationZ', -360, 360 ).step( 1 ).onChange( onChange );
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
}

export default Viewer;

