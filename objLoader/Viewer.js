const Vector3 = THREE.Vector3;

let camera, scene, renderer, controls;

const sceneBoundingRadius = 15;

const fov = 45;
const near = 1;
const far = sceneBoundingRadius * 10;

const initCameraPosition = new Vector3(0, 0, sceneBoundingRadius * 2);

class Viewer {
    constructor(containerId) {
        this._container = document.getElementById(containerId);

        this._debug = true;

        this._obj = null;

        this._initThreejs();
        this._setupScene();

        this._loop(0);
    }

    _initThreejs() {
        const width = this._container.offsetWidth;
        //const width = window.innerWidth;

        const height = this._container.offsetHeight;

        // camera
        camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
        camera.position.copy(initCameraPosition);
        // camera.lookAt(new Vector3(0, 0, 0))

        // scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        //renderer
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        this._container.appendChild(renderer.domElement);

        // controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);

        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 0;
        controls.maxDistance = sceneBoundingRadius * 10;

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    _setupScene() {
        if(this._debug) {
            this._setupSceneDebugHelpers();
        }

        this._setupLights();
        this._setupMyScene();
    }

    _setupSceneDebugHelpers() {
        const axesHelper = new THREE.AxesHelper(sceneBoundingRadius * 1.5);
        scene.add(axesHelper);

        const size = sceneBoundingRadius * 2;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);
    }

    _setupLights() {
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        camera.add(new THREE.PointLight(0xffffff, 0.5));

        scene.add(camera);
    }

    _setupMyScene() {
        if(this._debug) {
            const geometry = new THREE.SphereGeometry(sceneBoundingRadius / 10, 32, 32);
            let material = new THREE.MeshBasicMaterial({color: 0xffff00});
            const sphere = new THREE.Mesh(geometry, material);

            sphere.position.set(sceneBoundingRadius, 0, 0);
            scene.add(sphere);
        }

        // todo

        const objLoader = new THREE.OBJLoader();

        let material = new THREE.MeshPhongMaterial(
         {
                color: 'red',
         });

        objLoader.load('untitled.obj', (obj) =>  {
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });

            this._obj = obj.children[0];

            scene.add(obj.children[0]);
        });
    }

    onWindowResize() {
        const width = this._container.offsetWidth;
        const height = this._container.offsetHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    _loop(now) {
        this._simulate(now);
        this._render();

        window.requestAnimationFrame(this._loop.bind(this));
    }

    _render() {
        renderer.render(scene, camera);
    }

    _simulate(now) {
        if(!this._obj)
            return;

        //this._obj.rotation.y += 0.01;
    }
}

export default Viewer;

