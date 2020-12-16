const planeMaterials = [
    new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("images/ground.jpg") }),
    new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("textures/snow.jpg") }),
    new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("textures/concrete.jpg")}),
];

const block = {
    BRICK: 0,
    GROUND: 1,
    WOOD: 2,
    STONE: 3,
    SPAWN: 4,
};

let skymap = {'Mountains':true, 'bluefreeze':false, 'darkland':false, 'city':false, 'comawhite':false};

window.App = (function () {
    const DEFAULT_HALF_SIZE = 1000;

    function App() {
        this.container = null;
        this.mouseTemp = null;
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.controls = null;
        this.rayCaster = null;

        this.objects = [];

        this.rollOverMesh = null;
        this.axis = null;
        this.gridLines = null;
        this.horizontalPlane = null;

        this.willBeSpawnedObject = null;

        this._blockMaterials = null;

        this.blockSize = 50;
        this._sphereRadius = 25;
        this._cylinderHeight = 100;

        this.blockGeometry = null;

        this._spawn = true;
        this.isShiftDown = false;

        this._currentSpawnObjectName = "Block";

        this._enablePhysics = false;
        this._static = false;
        this._mapSize = 2000;
        this._impulse = 100000;
        this._gravity = -30;
        this._blockMass = 25;
        this._isStatic = false;

        this._skyMap = skymap;
        this.currentPlaneMaterial = 0;

        this._init();

        this.render();
    }

    App.prototype._addNewBlockMaterial = function(materialName, textureFileName) {
        this._blockMaterials[materialName] = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture("textures/blocks/" + textureFileName),
            side: THREE.DoubleSide
        });
    };

    App.prototype._initBlockMaterial = function() {
        this._blockMaterials = {};

        let blockMaterials = this._blockMaterials;

        this._addNewBlockMaterial('White Brick', 'white-bricks.jpg');
        this._addNewBlockMaterial('Large Brick1', 'BrickLargeSpecial.jpg');
        this._addNewBlockMaterial('Large Brick2', 'BrickLargeSpecial1.jpg');
        this._addNewBlockMaterial('Round Brick', 'BrickRound.jpg');
        this._addNewBlockMaterial('Grass', 'ground.jpg');
        this._addNewBlockMaterial('Wood', 'wood.jpg');
        this._addNewBlockMaterial('Stone', 'stone.png');
        this._addNewBlockMaterial('Concrete', 'concrete.jpg');
        this._addNewBlockMaterial('Dirty Concrete', 'ConcreteBunkerDirty.jpg');

        blockMaterials['spawn'] = new THREE.MeshLambertMaterial({ color: 0xfbebcd });

        this._currentBlockMaterialType = 'spawn';
    };

    App.prototype._initGrid = function() {
        this.gridHalfSize = DEFAULT_HALF_SIZE;
        this._gridLinesMaterial = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: false } );

        this._updateGrid(this.gridHalfSize);
    };

    App.prototype._addNewSpawnObjectObjModel = function(name, modelName, scale, cb) {
        const objLoader = new THREE.OBJLoader();

        objLoader.load(
            'models/' + modelName + '.obj',
            // called when the resource is loaded
            ( object ) => {
                object = object.children[0];

                object.geometry.center();

                //object.material.color.g = 0;
                //object.material.color.b = 0;

                let box = object.geometry.boundingBox.size();

                let height = box.y * scale;

                object.position.y = height;

                object.scale.multiplyScalar(scale);
                this._spawnObjectInfos[name].loaded = true;
                this._tryBuildSpawnObjectTypesGUI();

                cb(object);
            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
        this._spawnObjectInfos[name] = {
            loaded: false
        };
    };

    App.prototype._loadedAll = function() {
        for(const objectName in this._spawnObjectInfos) {
            if(this._spawnObjectInfos[objectName].loaded === false) {
                return false;
            }
        }

        return true;
    };


    App.prototype._initSpawnObjects = function(){
        this._spawnObjectInfos = {
            "Block" : {

            },
            "Sphere" :{

            },
            "Circle" : {},
            "Torus" : {},
            "Cylinder" :{},
            "Plane" :{}
        };

        this._addNewSpawnObjectObjModel("Tree", "Tree", 50, (object) => {
            this._tree = object;
        });

        this._addNewSpawnObjectObjModel("AirPlane", "feiji", 1, (object) => {
            this._airPlane = object;
        });

        this._addNewSpawnObjectObjModel("Wall", "oldWall", 20, (object) => {
            this._wall = object;
        });

        this._addNewSpawnObjectObjModel("Wall1", "weilan", 30, (object) => {
            this._wall1 = object;
        });

        this._addNewSpawnObjectObjModel("Car", "qiche", 1, (object) => {
            this._car = object;
        });

        this.blockGeometry = new THREE.BoxGeometry(this.blockSize, this.blockSize, this.blockSize);
        this._sphereGeometry = new THREE.SphereGeometry(this._sphereRadius, 32, 32);
        this._circleGeometry = new THREE.CircleGeometry(this._sphereRadius, 32, 32);
        this._torusGeometry = new THREE.TorusGeometry( this._sphereRadius, 3, 16, 100 );
        this._cylinderGeometry = new THREE.CylinderGeometry(this._sphereRadius, this._sphereRadius, this._cylinderHeight, 32 );
        this._planeGeometry = new THREE.PlaneGeometry(this.blockSize, this.blockSize, 32);
    };

    App.prototype._initThreeJs = function() {
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000);

        camera.position.set(0, 800, 1300);
        camera.lookAt(new THREE.Vector3());

        this.camera = camera;

        scene = new THREE.Scene();

        this.scene = scene;

        // roll-over helpers
        const rollOverBox = new THREE.BoxGeometry(this.blockSize, this.blockSize, this.blockSize);
        const rollOverMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });

        this.rollOverMesh = new THREE.Mesh(rollOverBox, rollOverMaterial);
        scene.add(this.rollOverMesh);

        // add axis
        let axis = new THREE.AxisHelper(500);

        this.axis = axis;

        axis.position.y += 25;
        axis.position.x -= 1000;
        axis.position.z -= 1000;

        //axis.position.x += 2;
        scene.add(axis);

        this._initSpawnObjects();

        let material = this._currentBlockMaterial();

        let willBeSpawnedObject = new THREE.Mesh(this.blockGeometry, material);

        this.willBeSpawnedObject = willBeSpawnedObject;

        willBeSpawnedObject.type = block.SPAWN;
        willBeSpawnedObject.position.y = this.blockSize / 2;

        scene.add(willBeSpawnedObject);
        this.objects.push(willBeSpawnedObject);

        this._initGrid();

        // Lights

        const ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff);

        directionalLight.position.set(1, 1.75, 0.5).normalize();
        scene.add(directionalLight);

        renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer = renderer;

        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        this.container.appendChild(renderer.domElement);

        // controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);

        this.controls = controls;

        this.rayCaster = new THREE.Raycaster();
        this.normalizedMousePosition = new THREE.Vector2();
    };

    App.prototype._init = function() {
        if (!Detector.webgl)
            Detector.addGetWebGLMessage();

        this.container = document.createElement("div");

        this._createHeader();

        this.mouseTemp = new THREE.Vector2(0, 0);

        this._initBlockMaterial();
        this._initThreeJs();

        // gui
        this._setUpGui();

        document.addEventListener("mousemove", this.onDocumentMouseMove.bind(this), false);
        document.addEventListener("mousedown", this.onDocumentMouseDown.bind(this), false);
        document.addEventListener("keydown", this.onDocumentKeyDown.bind(this), false);
        document.addEventListener("keyup", this.onDocumentKeyUp.bind(this), false);
        document.addEventListener("mouseup", this.onDocumentMouseUp.bind(this), false);
        document.addEventListener("mousewheel", this.onDocumentWheel.bind(this), { passive: false });
        document.addEventListener("drop", this.onDrop.bind(this), false);
        document.addEventListener("dragover", this.onDragOver.bind(this), false);

        // Buttons
        const exportButton = this.createButton("export", "Export Map", 50, 50, -window.innerHeight / 2 + 25, window.innerWidth / 2 - 125);
        exportButton.addEventListener("click", this.onExportClick.bind(this));

        const clearButton = this.createButton("clear", "Clear Map", 50, 50, -window.innerHeight / 2 + 25, window.innerWidth / 2 - 250);
        clearButton.addEventListener("click", this.clearScreen.bind(this));

        const playButton = this.createButton("play", "Play Map", 50, 50, -window.innerHeight / 2 + 70, -50);
        playButton.addEventListener("click", this.openWindow.bind(this));

        this.loadSkyMap();

        window.addEventListener("resize", this.onWindowResize.bind(this), false);
    };

    App.prototype.openWindow = function() {
        this.saveJSON(false);
        window.open("level.html");
    };

    App.prototype.createButton = function(name, text, width, height, top, left) {
        var button = document.createElement("BUTTON");
        var buttonText = document.createTextNode(text);
        button.appendChild(buttonText);

        button.style.position = "absolute";
        button.tagName = name;

        button.style.width = width;
        button.style.height = height;
        button.style.top = window.innerHeight / 2 + top + "px";
        button.style.left = window.innerWidth / 2 + left + "px";
        document.body.appendChild(button);

        return button;
    };

    App.prototype._createHeader = function() {
        const container = this.container;

        document.body.appendChild(container);

        let info = document.createElement("div");

        info.style.position = "absolute";
        info.style.top = "10px";
        info.style.width = "100%";
        //info.style.height = '10%';
        info.style.textAlign = "center";
        info.style.color = "green";
        info.style.fontSize = "20px";
        info.style.backgroundColor = "black";
        info.innerHTML = "VulcanVerse V.1 Sandbox <br><strong>Click</strong>: add block, <strong>Shift + click</strong>: remove block, Access GUI controls to change blocktype, in-game physics, and map size";
        container.appendChild(info);
    };

    App.prototype.loadSkyMap = function() {
        const scene = this.scene;

        if (this.skyboxMesh !== null)
            scene.remove(this.skyboxMesh);

        let skyMapType;

        if (skymap.Mountains)
            skyMapType = "mountains";
        else if (skymap.bluefreeze)
            skyMapType = "bluefreeze";
        else if (skymap.darkland)
            skyMapType = "darkland";
        else if (skymap.city)
            skyMapType = "city";
        else if (skymap.comawhite)
            skyMapType = "comawhite";
        else
            console.log("no value found");

        // skybox

        const urlPrefix = "textures/skyboxmaps/" + skyMapType + "/";
        const urls = [urlPrefix + "right.jpg", urlPrefix + "left.jpg", urlPrefix + "top.jpg", urlPrefix + "top.jpg", urlPrefix + "front.jpg", urlPrefix + "back.jpg"];
        const textureCube = THREE.ImageUtils.loadTextureCube(urls);

        const shader = THREE.ShaderLib["cube"];
        const uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        uniforms["tCube"].value = textureCube; // textureCube has been init before

        const material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: uniforms,
            depthWrite: false,
            side: THREE.DoubleSide,
        });

        // build the skybox Mesh
        this.skyboxMesh = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000, 1, 1, 1), material);

        // add it to the scene
        scene.add(this.skyboxMesh);
    };

    App.prototype.onExportClick = function() {
        this.saveJSON(true);
        //console.log(jsonArray.toString);
    };

    App.prototype.onDragOver = function(event) {
        event.preventDefault();
    };

    App.prototype.onDocumentWheel = function(event) {
        event.preventDefault();
        this.render();
        //controls.update();
    };

    App.prototype.onWindowResize = function() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    App.prototype.onDocumentMouseMove = function(event) {
        this.normalizedMousePosition.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

        this.mouseTemp.x += this.normalizedMousePosition.x;
        this.mouseTemp.y += this.normalizedMousePosition.y;

        this.rayCaster.setFromCamera(this.normalizedMousePosition, this.camera);

        const intersects = this.rayCaster.intersectObjects(this.objects);

        //console.log(intersects.length);

        if (intersects.length > 0) {
            const intersect = intersects[0];

            this.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
            this.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        }

        this.render();
    };

    App.prototype.onDocumentMouseDown = function(event) {
        event.preventDefault();

        this.mouseTemp = new THREE.Vector2(0, 0);
    };

    App.prototype._currentBlockMaterial = function() {
        return  this._blockMaterials[this._currentBlockMaterialType];
    };

    App.prototype._newBlock = function() {
        const material = this._currentBlockMaterial();

        let mesh = new THREE.Mesh(this.blockGeometry, material);

        let type;

        switch (this._currentBlockMaterialType) {
            case 'White Brick':
                type = 0;
                break;
            case 'Large Brick1':
                type = 1;
                break;
            case 'Large Brick2':
                type = 2;
                break;
            case 'Round Brick':
                type = 3;
                break;
            case 'Grass':
                type = 4;
                break;
            case 'Wood':
                type = 5;
                break;
            case 'Stone':
                type = 6;
                break;
            case 'Concrete':
                type = 7;
                break;
            case 'Dirty Concrete':
                type = 8;
                break;
            case 'spawn':
                type = 9;
                break;
        }

        mesh.type = type;
        mesh.static = false;

        return mesh;
    };

    App.prototype._changeWillBeSpawnedObject = function(intersect) {
        const scene = this.scene;
        let objects = this.objects;
        let willBeSpawnedObject = this.willBeSpawnedObject;

        scene.remove(willBeSpawnedObject);
        objects.splice(objects.indexOf(willBeSpawnedObject), 1);

        willBeSpawnedObject = this._newBlock();

        willBeSpawnedObject.position.copy(intersect.point).add(intersect.face.normal);
        //console.log(voxel.position);

        willBeSpawnedObject.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

        //console.log(voxel.position);
        scene.add(willBeSpawnedObject);
        objects.push(willBeSpawnedObject);

        this.willBeSpawnedObject = willBeSpawnedObject;
        this.rollOverMesh.visible = false;
    };

    App.prototype._newSphere = function() {
        const material = this._currentBlockMaterial();

        return new THREE.Mesh(this._sphereGeometry, material);
    };

    App.prototype._newCircle = function() {
        const material = this._currentBlockMaterial();

        return new THREE.Mesh(this._circleGeometry, material);
    };

    App.prototype._newTorus = function() {
        const material = this._currentBlockMaterial();

        return new THREE.Mesh(this._torusGeometry, material);
    };

    App.prototype._newCylinder = function() {
        const material = this._currentBlockMaterial();

        return new THREE.Mesh(this._cylinderGeometry, material);
    };

    App.prototype._newPlane = function() {
        const material = this._currentBlockMaterial();

        return new THREE.Mesh(this._planeGeometry, material);
    };

    App.prototype._newTree = function() {
        return this._tree.clone();
    };

    App.prototype._is3DModel = function(type) {
        if(this._currentSpawnObjectName === 'Block')
            return false;
        else if (this._currentSpawnObjectName === 'Sphere')
            return false;
        else if (this._currentSpawnObjectName === 'Circle')
            return false;
        else if (this._currentSpawnObjectName === 'Torus')
            return false;
        else if (this._currentSpawnObjectName === 'Cylinder')
            return false;
        else if (this._currentSpawnObjectName === 'Plane')
            return false;
        else if (this._currentSpawnObjectName === 'Tree')
            return true;
        else if (this._currentSpawnObjectName === 'AirPlane')
            return true;
        else if (this._currentSpawnObjectName === 'Wall')
            return true;
        else if (this._currentSpawnObjectName === 'Wall1')
            return true;
        else if (this._currentSpawnObjectName === 'Car')
            return true;

        return false;
    };

    App.prototype._spawnNewObject = function(intersect) {
        let object = null;

        if(this._currentSpawnObjectName === 'Block')
            object = this._newBlock();
        else if (this._currentSpawnObjectName === 'Sphere')
            object = this._newSphere();
        else if (this._currentSpawnObjectName === 'Circle')
            object = this._newCircle();
        else if (this._currentSpawnObjectName === 'Torus')
            object = this._newTorus();
        else if (this._currentSpawnObjectName === 'Cylinder')
            object = this._newCylinder();
        else if (this._currentSpawnObjectName === 'Plane')
            object = this._newPlane();
        else if (this._currentSpawnObjectName === 'Tree')
            object = this._newTree();
        else if (this._currentSpawnObjectName === 'AirPlane')
            object = this._airPlane.clone();
        else if (this._currentSpawnObjectName === 'Wall')
            object = this._wall.clone();
        else if (this._currentSpawnObjectName === 'Wall1')
            object = this._wall1.clone();
        else if (this._currentSpawnObjectName === 'Car')
            object = this._car.clone();

        let originalHeight = object.position.y;

        object.position.copy(intersect.point).add(intersect.face.normal);
        object.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

        if(this._is3DModel(this._currentSpawnObjectName)){
            object.position.y = originalHeight / 2;
        }

        if(this._currentSpawnObjectName === "Cylinder") {
            object.position.y = this._cylinderHeight / 2;
        }

        console.log(object.position);

        this.scene.add(object);
        this.objects.push(object);

        this.rollOverMesh.visible = false;
    };

    App.prototype.onDocumentMouseUp = function(event) {
        event.preventDefault();

        this.normalizedMousePosition.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

        this.rayCaster.setFromCamera(this.normalizedMousePosition, this.camera);

        const intersects = this.rayCaster.intersectObjects(this.objects);

        if(intersects.length <= 0)
            return;

        const scene = this.scene;
        let objects = this.objects;
        let willBeSpawnedObject = this.willBeSpawnedObject;

        const intersect = intersects[0];

        // delete cube
        if (this.isShiftDown) {
            if (intersect.object !== this.horizontalPlane && intersect.object !== willBeSpawnedObject) {
                scene.remove(intersect.object);

                objects.splice(objects.indexOf(intersect.object), 1);
            }
        } else {
            if (this.mouseTemp.length() <= 3) {
                if (this._spawn) {
                    this._spawnNewObject(intersect);
                } else {
                    this._changeWillBeSpawnedObject(intersect);
                }
            }
        }
    };

    App.prototype.onDocumentKeyDown = function(event) {
        switch (event.keyCode) {
            case 16:
                this.isShiftDown = true;
                break;
        }

        this.render();
    };

    App.prototype.onDocumentKeyUp = function(event) {
        switch (event.keyCode) {
            case 16:
                this.isShiftDown = false;
                break;
        }

        this.render();
    };

    App.prototype.onDrop = function(event) {
        event.preventDefault();

        for (var i = 0; i < event.dataTransfer.files.length; i++) {
            var file = event.dataTransfer.files[i];

            var reader = new FileReader();

            reader.onload = (event) => {
                var dataUri = event.target.result;
                var base64 = dataUri.match(/[^,]*,(.*)/)[1];
                var json = window.atob(base64);

                this.loadJSON(json);
            };

            reader.readAsDataURL(file);
        }
    };

    App.prototype.saveJSON = function(openWindow) {
        const children = this.scene.children;

        this.voxels = [];

        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (child instanceof THREE.Mesh === false)
                continue;

            if (child.geometry instanceof THREE.CubeGeometry === false)
                continue;

            if (child === this.rollOverMesh)
                continue;

            if (child === this.skyboxMesh)
                continue;

            if (child === this.willBeSpawnedObject)
                continue;

            this.voxels.push({
                x: (child.position.x - 25) / 50,
                y: (child.position.y - 25) / 50,
                z: (child.position.z - 25) / 50,
                t: child.type,
                static: child.static,
                id: child.id
            });
        }

        // if we hit the export button, open a window with the json
        if (openWindow) {
            const dataUri = "data:application/json;charset=utf-8," + JSON.stringify(this.voxels);

            window.open(dataUri, "mywindow");
        }
    };

    App.prototype.loadJSON = function(mapJSON) {
        let objects = this.objects;

        // delete all cubes
        const children = scene.children.slice(0);

        for (let i = 0; i < children.length; i++) {
            if (children[i] instanceof THREE.Mesh === false)
                continue;

            if (children[i].geometry instanceof THREE.CubeGeometry === false)
                continue;

            if (children[i] === rollOverMesh)
                continue;

            if (children[i] === this.skyboxMesh)
                continue;

            objects.splice(objects.indexOf(children[i]), 1);
            scene.remove(children[i]);
        }

        // push new cubes
        let voxels = [];

        voxels = JSON.parse(mapJSON);

        for (var i = 0; i < voxels.length; i++) {
            var voxel = voxels[i];
            var mesh = new THREE.Mesh(blockGeometry, materials[voxel.t]);
            mesh.position.x = voxel.x * 50 + 25;
            mesh.position.y = voxel.y * 50 + 25;
            mesh.position.z = voxel.z * 50 + 25;
            //conole.log('hello');
            //console.log("this is the static: " + voxel.static);
            mesh.type = voxel.t;
            mesh.static = voxel.static;
            mesh.matrixAutoUpdate = true;

            if (voxel.t === block.SPAWN) {
                spawnBlock = mesh;
                //scene.remove(willBeSpawnedObject);
            }

            mesh.updateMatrix();
            scene.add(mesh);
            objects.push(mesh);
        }
    };

    App.prototype.clearScreen = function() {
        let objects = this.objects;

        // delete all cubes
        const children = scene.children.slice(0);

        for (let i = 0; i < children.length; i++) {
            if (children[i] instanceof THREE.Mesh === false)
                continue;

            if (children[i].geometry instanceof THREE.CubeGeometry === false)
                continue;

            if (children[i] === this.rollOverMesh)
                continue;

            if (children[i] === this.willBeSpawnedObject)
                continue;

            if (children[i] === this.horizontalPlane)
                continue;

            if (children[i] === this.skyboxMesh)
                continue;

            objects.splice(objects.indexOf(children[i]), 1);
            scene.remove(children[i]);
        }
    };

    App.prototype.render = function() {
        this.controls.update();

        this.rollOverMesh.visible = !this.isShiftDown;

        this.renderer.render(this.scene, this.camera);
    };

    App.prototype._buildSpawnObjectTypesGUI = function(){
        let data = {};

        for(const objectName in this._spawnObjectInfos) {
            data[objectName] = objectName === this._currentSpawnObjectName;
        }

        let spawnObjectFolder = this._gui.addFolder("Spawn Object");

        for(const objectName in this._spawnObjectInfos) {
            spawnObjectFolder.add(data, objectName).listen().onChange((value) => {
                this._currentSpawnObjectName = objectName;

                for(const key in data)
                    data[key] = key === objectName;
            });
        }
    };

    App.prototype._tryBuildSpawnObjectTypesGUI = function(){
        if(this._loadedAll())
            this._buildSpawnObjectTypesGUI()
    };

    App.prototype._buildBlockMaterialsGUI = function(gui){
        let data = {};

        for(const blockMaterialType in this._blockMaterials) {
           data[blockMaterialType] = blockMaterialType === this._currentBlockMaterialType;
        }

        let blocksFolder = gui.addFolder("Block Materials");

        for(const blockMaterialType in this._blockMaterials) {
            blocksFolder.add(data, blockMaterialType).listen().onChange((value) => {
                this._currentBlockMaterialType = blockMaterialType;

                for(const key in data)
                    data[key] = key === blockMaterialType;
            });
        }
    };

    App.prototype._setUpGui = function()
    {
        // gui
        const gui = new dat.GUI();

        let data = {
          "Map Size" : this.gridHalfSize * 2
        };

        gui.add(data, 'Map Size').min(1000).max(10000).listen().onChange( (value) => {
            value = Math.round(value / 2);
            value = Math.round(value / this.blockSize);
            value = Math.round(value * this.blockSize);

            this._updateGrid(value);
            this.gridHalfSize = value;
        });

        const physicsFolder = gui.addFolder("Physics");

        data = {
            "EnablePhysics" : this._enablePhysics,
            "Gravity" : this._gravity,
            "BlockMass" : this._blockMass,
            "impulse" : this._impulse
        };

        physicsFolder.add(data, 'EnablePhysics').listen();
        physicsFolder.add(data, 'Gravity').min(-100).max(100).listen();
        physicsFolder.add(data, 'Gravity').min(0).max(100).listen();
        physicsFolder.add(data, 'Gravity').min(0).max(1000000).listen();

        const s = gui.addFolder("SkyBox");

        const loadSkyMap = this.loadSkyMap.bind(this);

        s.add(skymap, 'Mountains').listen().onChange((value) => {falsifyMap('Mountains'); this.currentPlaneMaterial = 0; loadSkyMap(); });
        s.add(skymap, 'bluefreeze').listen().onChange((value) => {falsifyMap('bluefreeze'); this.currentPlaneMaterial = 1; loadSkyMap(); });
        s.add(skymap, 'darkland').listen().onChange((value) => {falsifyMap('darkland'); this.currentPlaneMaterial = 0; loadSkyMap(); });
        s.add(skymap, 'city').listen().onChange((value) => {falsifyMap('city'); this.currentPlaneMaterial = 2; loadSkyMap(); });
        s.add(skymap, 'comawhite').listen().onChange((value) => {falsifyMap('comawhite'); this.currentPlaneMaterial = 1; loadSkyMap(); });

        data = {
            'Spawn Enable' : this._spawn
        };

        gui.add(data, 'Spawn Enable').listen().onChange((value) => {
            this._spawn = value;
        });

        //this._buildSpawnObjectTypesGUI(gui);
        this._buildBlockMaterialsGUI(gui);

        gui.domElement.id = 'gui';

        this._gui = gui;
    };

    function falsifyMap(mycolor)
    {
        for (property in skymap)
        {
            if (property == mycolor)
            {
                skymap[property] = true;
                //currentBlockType = property;
                continue;
            }

            skymap[property] = false;
        }
    }

    App.prototype._updateGrid = function(halfSize)
    {
        const scene = this.scene;
        let objects = this.objects;

        if(this.gridLines)
            scene.remove(this.gridLines);

        let gridLineGeometry = new THREE.Geometry();

        for ( let i = - halfSize; i <= halfSize; i += this.blockSize ) {
            gridLineGeometry.vertices.push( new THREE.Vector3( - halfSize, 0, i ) );
            gridLineGeometry.vertices.push( new THREE.Vector3(  halfSize, 0, i ) );

            gridLineGeometry.vertices.push( new THREE.Vector3( i, 0, - halfSize ) );
            gridLineGeometry.vertices.push( new THREE.Vector3( i, 0,   halfSize ) );
        }

        this.gridLines = new THREE.LineSegments( gridLineGeometry, this._gridLinesMaterial);

        scene.add( this.gridLines );

        if(this.horizontalPlane)
            scene.remove(this.horizontalPlane);

        objects.splice(objects.indexOf(this.horizontalPlane), 1);

        gridLineGeometry = new THREE.PlaneBufferGeometry( halfSize * 2, halfSize * 2 );

        gridLineGeometry.rotateX( - Math.PI / 2 );

        this.horizontalPlane = new THREE.Mesh( gridLineGeometry, planeMaterials[this.currentPlaneMaterial] );

        scene.add( this.horizontalPlane );
        objects.push(this.horizontalPlane);

        this.axis.position.x = -halfSize;
        this.axis.position.z = -halfSize;
    };

    return App;
})();