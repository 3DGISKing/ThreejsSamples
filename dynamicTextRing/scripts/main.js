var camera;
var controls;
var scene;
var light;
var projector;
var raycaster;
var renderer;

var colors = [];
var goldColor;
var globalArrowM;
var goldM; // gold material
var gemM;
var pearlMaterial;
var beadMaterial;
var cabochonMaterial;
var markerNotSelColor;

var gemColor = [];
var pearlTable = [];

var mainRingSelected = false;
var mainRingModelId = null, mainRingModelName = null;

var metalEnvTexture = null, plasticEnvTexture = null;
var markerSelColor = 16711680;

var roomMesh;

var globalResolution = "med", cameraZoom = 400, specialFont = null;

var mainMode = false;

var platformMobile = false;
var iconPrev;
var iconNext;
var iconScrollGroup = [];

var activePrev;
var activeNext;
var texturePrev;
var textureNext;

var activeScrollGroup = [];
var activeSize = 4;
var activeStart = 0;
var activeEnd = activeSize - 1;
var TYPE_SELECTED = null;

var activeDispGroup = [];

var container;

var mouse = new THREE.Vector2();
var ACTIVE_SELECTED_prev_color = null;
var ACTIVE_INTERSECTED = null;
var ACTIVE_SELECTED = null;
var ACTIVE_SCROLL_INTERSECTED;
var introMode = 0;

var activeRingObj = null, activeRing, activeRingsObjects = [], activeRings = [], activeRingsMarkers = [], activeRingIndex = null;
var defaultR = 80, defaultNeckR = 40, defaultEarR = 80, defaultBraceR = 200, defaultCuffLinkR = 40, defaultTieClipR = 40, mainRingR, mainRingT, mainRingH;

var TEXTURE_SCROLL_INTERSECTED = null, asmMode = 0, ASM_INTERSECTED = null, ASM_INTERSECTED_prev_color;
var asmTargetRotationY = 0, asmTargetRotationYOnMouseDown = 0, asmTargetRotationX = 0, asmTargetRotationXOnMouseDown = 0, asmMouseX = 0, asmMouseXOnMouseDown = 0, asmMouseY = 0, asmMouseYOnMouseDown = 0;
var ARMode = 0, ARMesh, ARStart = !1, videoTex, videoCam, videoScene, threexAR, srcElement, markers = {}, wallMode = 1, prodMode = 0;
var exportMode = 0, exportObj, showExample = Math.floor(1e4 * Math.random());
var printMode = 0, loadMode = 0, getImageData = false, previewImg = null;
var mainRingObj, mainRing, mainRingG, lastMainRing, objTutorials = [], windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, windowQuartY = window.innerHeight / 4, window3QuartY = 3 * window.innerHeight / 4;

var pearSizeOptions = [ {
    w: 3,
    h: 4
}, {
    w: 3,
    h: 5
}, {
    w: 4,
    h: 5
}, {
    w: 4,
    h: 6
}, {
    w: 5,
    h: 6
}, {
    w: 5,
    h: 7
}, {
    w: 6,
    h: 8
}, {
    w: 6,
    h: 9
}, {
    w: 7,
    h: 10
}, {
    w: 8,
    h: 12
}, {
    w: 9,
    h: 13
}, {
    w: 9,
    h: 14
}, {
    w: 10,
    h: 15
} ];

var marquiseSizeOptions = [ {
    w: 2,
    h: 4
}, {
    w: 2.5,
    h: 5
}, {
    w: 3,
    h: 6
}, {
    w: 3.5,
    h: 7
}, {
    w: 4,
    h: 8
}, {
    w: 5,
    h: 10
}, {
    w: 6,
    h: 12
}, {
    w: 7,
    h: 14
}, {
    w: 8,
    h: 16
} ];

var ovalSizeOptions = [ {
    w: 3,
    h: 5
}, {
    w: 4,
    h: 6
}, {
    w: 5,
    h: 7
}, {
    w: 6,
    h: 8
}, {
    w: 7,
    h: 9
}, {
    w: 8,
    h: 10
}, {
    w: 9,
    h: 11
}, {
    w: 10,
    h: 12
}, {
    w: 10,
    h: 14
}, {
    w: 12,
    h: 14
}, {
    w: 12,
    h: 16
}, {
    w: 13,
    h: 18
}, {
    w: 15,
    h: 20
} ];

var emeraldSizeOptions = [ {
    w: 3,
    h: 5
}, {
    w: 4,
    h: 6
}, {
    w: 5,
    h: 7
}, {
    w: 6,
    h: 8
}, {
    w: 7,
    h: 9
}, {
    w: 8,
    h: 10
}, {
    w: 9,
    h: 11
}, {
    w: 10,
    h: 12
}, {
    w: 12,
    h: 14
}, {
    w: 12,
    h: 16
}, {
    w: 13,
    h: 18
}, {
    w: 15,
    h: 20
} ];

var roundSizeOptions = [ {
    w: 2,
    h: 2
}, {
    w: 2.5,
    h: 2.5
}, {
    w: 3,
    h: 3
}, {
    w: 3.5,
    h: 3.5
}, {
    w: 4,
    h: 4
}, {
    w: 4.5,
    h: 4.5
}, {
    w: 5,
    h: 5
}, {
    w: 5.5,
    h: 5.5
}, {
    w: 6,
    h: 6
}, {
    w: 7,
    h: 7
}, {
    w: 8,
    h: 8
}, {
    w: 9,
    h: 9
}, {
    w: 10,
    h: 10
}, {
    w: 1.2,
    h: 1.2
}, {
    w: 1.6,
    h: 1.6
} ];

var heartSizeOptions = [ {
    w: 3,
    h: 3
}, {
    w: 4,
    h: 4
}, {
    w: 5,
    h: 5
}, {
    w: 6,
    h: 6
}, {
    w: 7,
    h: 7
}, {
    w: 8,
    h: 8
}, {
    w: 9,
    h: 9
}, {
    w: 10,
    h: 10
}, {
    w: 11,
    h: 11
}, {
    w: 12,
    h: 12
} ];

var princessSizeOptions = [ {
    w: 2,
    h: 2
}, {
    w: 2.5,
    h: 2.5
}, {
    w: 3,
    h: 3
}, {
    w: 3.5,
    h: 3.5
}, {
    w: 4,
    h: 4
}, {
    w: 4.5,
    h: 4.5
}, {
    w: 5,
    h: 5
}, {
    w: 5.5,
    h: 5.5
}, {
    w: 6,
    h: 6
}, {
    w: 7,
    h: 7
}, {
    w: 8,
    h: 8
}, {
    w: 9,
    h: 9
}, {
    w: 10,
    h: 10
} ];

var trillionSizeOptions = [ {
    w: 2,
    h: 2
}, {
    w: 2.5,
    h: 2.5
}, {
    w: 3,
    h: 3
}, {
    w: 3.5,
    h: 3.5
}, {
    w: 4,
    h: 4
}, {
    w: 4.5,
    h: 4.5
}, {
    w: 5,
    h: 5
}, {
    w: 5.5,
    h: 5.5
}, {
    w: 6,
    h: 6
}, {
    w: 7,
    h: 7
}, {
    w: 8,
    h: 8
}, {
    w: 9,
    h: 9
}, {
    w: 10,
    h: 10
} ];

var cushionSizeOptions = [ {
    w: 3,
    h: 5
}, {
    w: 4,
    h: 6
}, {
    w: 6,
    h: 8
}, {
    w: 8,
    h: 10
}, {
    w: 9,
    h: 11
}, {
    w: 10,
    h: 12
}, {
    w: 10,
    h: 14
}, {
    w: 12,
    h: 14
} ];

var radiantSizeOptions = [ {
    w: 3,
    h: 4
}, {
    w: 3,
    h: 5
}, {
    w: 4,
    h: 6
}, {
    w: 4.5,
    h: 6.5
}, {
    w: 5,
    h: 7
}, {
    w: 6,
    h: 8
}, {
    w: 6.5,
    h: 8.5
}, {
    w: 7,
    h: 9
}, {
    w: 8,
    h: 10
}, {
    w: 9,
    h: 11
}, {
    w: 10,
    h: 12
} ];

var ringDiameterNames = [ "US 3", "US 3.5", "US 4", "US 4.5", "US 5", "US 5.5", "US 6", "US 6.5", "US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 11.5", "US 12", "US 12.5", "US 13", "US 13.5", "US 14", "US 14.5", "US 15" ];

var ringDiameter = [ 141, 145, 149, 152.7, 157, 161, 165.1, 169.2, 173.5, 177.5, 181.9, 185.3, 188.9, 194.1, 198.4, 202, 206.8, 210.8, 214.9, 218.9, 223.3, 226, 230, 234.2, 238.3 ];
var ringSizeOptions = [];

for (var i = 0; i < ringDiameter.length; i++)
    ringSizeOptions.push({
        w: ringDiameter[i] / defaultR,
        h: ringDiameter[i] / defaultR
    });

var wg = {
    lang: 'en',
    sds_colors: {
        "primary1": "#5d5a58",
        "primary2": "#4c4a48",
        "material": null
    },
    sds_model: {"id":2402,"name":"name ring","type":"ring","color":0,"items":[{"name":"Name ring","id":14,"shape":"name","text":"Songri Paio","font":"script","fontLang":"english","fontWeight":"bold","fontStyle":"normal","ringR":90.95,"volume":178.35285476296,"area":654.60222851388,"extPathActions":[],"extPathCurves":[],"extPathNurbs":[],"extPathTypes":[],"holePathActions":[],"holePathCurves":[],"holePathNurbs":[],"holePathTypes":[],"position":[{"x":0,"y":0,"z":0}],"rotation":[{"x":0,"y":0,"z":0}],"editSelected":[0,1,10,2,2,1,0,0,1,0,0],"asmSelected":[false,false,false,false,false,false,false,false,false,false],"asmObject":[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]}],"updated":{"date":"2018-02-18 17:25:06.000000","timezone_type":3,"timezone":"America\/New_York"},"owner":"isaac@wizegem.com","originator":"isaac@wizegem.com","private":true,"c_edit":false,"viewer":false,"viewer_name":"","view_count":1357,"resources":[{"texture":{"grayScale":null,"width":null,"height":null}}]},
    "exclude": ["add letters connectors","attach letters","texture type","user-save","material-change"]
};

if (typeof person != "undefined" && person )
    wg.sds_model.items["text"] = person;

wg.edits = {};

wg.edits["Name ring"] = {
    "name":"Name ring",
    "edits":[
        {
            "text change":[
                0,
                1
            ]
        },
        {
            "ring depth":[
                0.8,
                0.9,
                1,
                1.1,
                1.2,
                1.3,
                1.4,
                1.5
            ]
        },
        {
            "ring diameter":[
                "US 3",
                "US 3.5",
                "US 4",
                "US 4.5",
                "US 5",
                "US 5.5",
                "US 6",
                "US 6.5",
                "US 7",
                "US 7.5",
                "US 8",
                "US 8.5",
                "US 9",
                "US 9.5",
                "US 10",
                "US 10.5",
                "US 11",
                "US 11.5",
                "US 12",
                "US 12.5",
                "US 13",
                "US 13.5",
                "US 14",
                "US 14.5",
                "US 15"
            ]
        },
        {
            "ring height":[
                2,
                2.5,
                3,
                3.5,
                4,
                5
            ]
        },
        {
            "name size":[
                7,
                8,
                10,
                12,
                14,
                16,
                18
            ]
        },
        {
            "add letters connectors":[
                "yes",
                "no"
            ]
        },
        {
            "ring section":[
                "edgeless",
                "convex",
                "D shape",
                "comfort",
                "court"
            ]
        },
        {
            "texture change":[
                0,
                1
            ]
        },
        {
            "attach letters":[
                "no",
                "yes"
            ]
        },
        {
            "shank type":[
                "split",
                "streight",
                "none"
            ]
        },
        {
            "texture type":[
                "normal",
                "negative"
            ]
        }
    ]
};

var wizegem = {
    'view_mode'   : true,	/* indicates viewer */
    'user_model'  : false,	/* its a user clone */
    'user_name'   : null,	/* user email */
    'sds'		  : true, 	/* sds mode (used with view_mode) */
    'render'      : false,  /* render only mode */
    'loaded'      : [],     /* loaded modules */
    'fonts'       : [],     /* loaded fonts */
    'env'         : 'p',    /* environment */
    'cache_hash'  : '1530716556'
};

function wg_bootstrap() {
    init(function() {
        onBootComplete();
        animate();
    })
}

function init(callback) {
    container = document.createElement("div");
    camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1120);

    camera.position.z = 400;
    camera.position.y = 0;
    camera.position.x = 0;

    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 1;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;
   // controls.enabled = false;

    scene = new THREE.Scene();

    light = new THREE.DirectionalLight(16777215, 1.5);
    light.position.set(0, 0, 10);

    scene.add(light);

    var helper = new THREE.DirectionalLightHelper( light, 5 );

    scene.add( helper );


    genGemColorTable();
    genPearlTable();

    raycaster = new THREE.Raycaster();
    projector = new THREE.Projector();

    renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false
    });

    renderer.setClearColor(16777215);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;

    document.body.appendChild( renderer.domElement );
    renderer.clearColor();

    var b = document.createElement("div");
    b.style.position = "absolute";
    b.style.top = "10px";
    b.style.width = "100%";
    b.style.textAlign = "center";

    container.appendChild(b);
    document.addEventListener("mousedown", asmAreaMouseDown, false);

    document.addEventListener("mousemove", activeObjectsMouseMove, false);
    document.addEventListener("click", activeScrollMouseClick, false);
    document.addEventListener("mousemove", activeScrollMouseMove, false);
    window.addEventListener("resize", onWindowResize, false);

    createMaterials();

   // createAxis();

    var i = "Design/Client/textures/";

    THREE.ImageUtils.loadTexture("Design/Client/textures/material1_58.jpg", void 0, function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 16;

        goldM.map = texture;
        goldM.bumpMap = texture;

        var s = [i + "pisa_px.jpg", i + "pisa_nx.jpg", i + "pisa_py.jpg", i + "pisa_ny.jpg", i + "pisa_pz.jpg", i + "pisa_nz.jpg"];

        THREE.ImageUtils.loadTextureCube(s, THREE.CubeRefractionMapping, function(texture) {
            metalEnvTexture = texture;
            goldM.envMap = metalEnvTexture;

            callback();
        });
    });
}

function activeObjectsMouseMove(e) {
    activeObjectsMove(e)
}

function activeObjectsMove(e) {
    mouse.x = e.clientX / window.innerWidth * 2 - 1,
        mouse.y = -e.clientY / window.innerHeight * 2 + 1;
    var t = new THREE.Vector3(mouse.x,mouse.y,1);
    t.unproject(camera),
        raycaster.set(camera.position, t.sub(camera.position).normalize());
    var i = raycaster.intersectObjects(activeDispGroup);
    if (i.length > 0) {
        if (ACTIVE_INTERSECTED != i[0].object && (null != ACTIVE_INTERSECTED && ACTIVE_INTERSECTED.material.color.setHex(ACTIVE_INTERSECTED_prev_color),
                ACTIVE_INTERSECTED = i[0].object,
                ACTIVE_INTERSECTED_prev_color = ACTIVE_INTERSECTED.material.color.getHex(),
            ACTIVE_INTERSECTED != ACTIVE_SELECTED && ACTIVE_INTERSECTED.material.color.setHex(markerNotSelColor[0]),
                helpMode)) {
            for (var s = 0; s < activeRingsMarkers.length; s++)
                if (activeRingsMarkers[s].insId == ACTIVE_INTERSECTED.insId)
                    var a = activeRingsObjects[s];
            null != (c = document.getElementsByTagName("activeHelp").item(0)) && c.parentNode.removeChild(c),
                (c = document.createElement("activeHelp")).style.position = "absolute";
            var o = a.geometry.boundingBox.size()
                , r = Math.round(o.x) / 10
                , n = Math.round(o.y) / 10
                , h = Math.round(o.z) / 10
                , l = Math.round(a.diameter) / 10;
            c.innerHTML = a.insName + ":<br />",
            null != a.diameter && (c.innerHTML += "In Diameter: " + l + "mm<br />"),
                c.innerHTML += "X size: " + r + "mm<br />",
                c.innerHTML += "Y size: " + n + "mm<br />",
                c.innerHTML += "Z size: " + h + "mm<br />",
                c.style.left = e.clientX - 120 + "px",
                c.style.top = e.clientY + "px",
                c.style.color = "white",
                c.style.backgroundColor = "black",
                document.body.appendChild(c)
        }
    } else if (null != ACTIVE_INTERSECTED) {
        var c;
        null == ACTIVE_SELECTED ? ACTIVE_INTERSECTED.material.color.setHex(ACTIVE_INTERSECTED_prev_color) : ACTIVE_INTERSECTED != ACTIVE_SELECTED && ACTIVE_INTERSECTED.material.color.setHex(ACTIVE_INTERSECTED_prev_color),
            ACTIVE_INTERSECTED = null,
        null != (c = document.getElementsByTagName("activeHelp").item(0)) && c.parentNode.removeChild(c)
    }
}

function activeScrollMouseMove(e) {
    activeScrollMove(e)
}

function activeScrollMouseClick(e) {
    activeScrollDown(e)
}

function activeScrollMove(e) {
    mouse.x = e.clientX / window.innerWidth * 2 - 1,
        mouse.y = -e.clientY / window.innerHeight * 2 + 1;
    var t = new THREE.Vector3(mouse.x,mouse.y,1);
    t.unproject(camera),
        raycaster.set(camera.position, t.sub(camera.position).normalize());
    var i = raycaster.intersectObjects(activeScrollGroup);
    i.length > 0 ? ACTIVE_SCROLL_INTERSECTED != i[0].object && (ACTIVE_SCROLL_INTERSECTED && ACTIVE_SCROLL_INTERSECTED.material.color.setHex(colors[0].value),
        (ACTIVE_SCROLL_INTERSECTED = i[0].object).material.color.setHex(markerNotSelColor[0])) : null != ACTIVE_SCROLL_INTERSECTED && (ACTIVE_SCROLL_INTERSECTED.material.color.setHex(colors[0].value),
        ACTIVE_SCROLL_INTERSECTED = null)
}

function activeScrollDown(e) {
    null != ACTIVE_SCROLL_INTERSECTED && (RemoveActive(activeStart, activeEnd),
        ACTIVE_SCROLL_INTERSECTED == activePrev && activeStart > 0 ? (activeStart -= activeSize,
            activeEnd -= activeSize) : ACTIVE_SCROLL_INTERSECTED == activeNext && activeEnd < activeRingsMarkers.length - 1 && (activeStart += activeSize,
            activeEnd += activeSize),
        DispActive(activeStart, activeEnd))
}

function RemoveActive(e, t) {
    for (var i = e, s = 0; i <= t && i < activeRingsMarkers.length; i++,
        s++)
        scene.remove(activeDispGroup[s]);
    activeDispGroup = []
}
function DispActive(e, t) {
    for (var i = e, s = 0; i <= t && i < activeRingsMarkers.length; i++,
        s++) {
        activeDispGroup.push(activeRingsMarkers[i]);
        window.innerHeight;
        activeDispGroup[s].position.x = 1060,
            activeDispGroup[s].position.y = 360 - 250 * s,
            activeDispGroup[s].position.z = -400,
            activeDispGroup[s].rotation.y = Math.PI / 8,
            scene.add(activeDispGroup[s])
    }
}

function asmAreaMouseDown(a) {
    asmAreaDown(a);
}

function asmAreaDown(a) {
    introMode || a.clientY > window.innerHeight / 4 * 1.2 && a.clientY < 7 * window.innerHeight / 8 && a.clientX > window.innerWidth / 6 && a.clientX < 5 * window.innerWidth / 6 && (document.addEventListener("mouseup", asmAreaMouseUp, !1),
        document.addEventListener("mouseout", asmAreaMouseOut, !1), wizegem.sds ? document.querySelector(".sds-events").addEventListener("touchend", asmAreaTouchEnd, !1) : document.addEventListener("touchend", asmAreaTouchEnd, !1),
        asmMouseXOnMouseDown = a.clientX - windowHalfX, asmMouseYOnMouseDown = a.clientY - windowQuartY,
        asmTargetRotationYOnMouseDown = asmTargetRotationY, asmTargetRotationXOnMouseDown = asmTargetRotationX,
        document.addEventListener("mousemove", asmAreaMouseMove, !1), wizegem.sds ? document.querySelector(".sds-events").addEventListener("touchmove", asmAreaTouchMove, !1) : document.addEventListener("touchmove", asmAreaTouchMove, !1));
}

function asmAreaMouseMove(a) {
    asmAreaMove(a, .02);
}

function asmAreaMove(a, b) {
    asmMouseX = a.clientX - windowHalfX, asmMouseY = a.clientY - windowQuartY, asmTargetRotationY = asmTargetRotationYOnMouseDown + (asmMouseX - asmMouseXOnMouseDown) * b,
        asmTargetRotationX = asmTargetRotationXOnMouseDown + (asmMouseY - asmMouseYOnMouseDown) * b;
}

function asmAreaMouseUp(a) {
    document.removeEventListener("mousemove", asmAreaMouseMove, !1), document.removeEventListener("mouseup", asmAreaMouseUp, !1),
    document.removeEventListener("mouseout", asmAreaMouseOut, !1);
}

function asmAreaMouseOut(a) {
    document.removeEventListener("mousemove", asmAreaMouseMove, !1), document.removeEventListener("mouseup", asmAreaMouseUp, !1),
        document.removeEventListener("mouseout", asmAreaMouseOut, !1);
}

function asmAreaTouchEnd(a) {
    wizegem.sds ? (document.querySelector(".sds-events").removeEventListener("touchmove", asmAreaTouchMove, !1),
        document.querySelector(".sds-events").removeEventListener("touchend", asmAreaTouchEnd, !1)) : (document.removeEventListener("touchmove", asmAreaTouchMove, !1),
        document.removeEventListener("touchend", asmAreaTouchEnd, !1));
}

function asmAreaTouchMove(a) {
    asmAreaMove(a.changedTouches[0], .04);
}

function createAxis() {
    var length = 500;

    var headLength = length * 0.1;
    var headWidth = length * 0.03;

    var xdir = new THREE.Vector3( 1, 0, 0 );

    var origin = new THREE.Vector3( 0, 0, 0 );

    var hex = 0xff0000;

    var arrowHelper = new THREE.ArrowHelper( xdir, origin, length, hex, headLength, headWidth );
    scene.add( arrowHelper );

    var ydir = new THREE.Vector3( 0, 1, 0 );
    hex = 0xffff00;

    arrowHelper = new THREE.ArrowHelper( ydir, origin, length, hex, headLength, headWidth );
    scene.add( arrowHelper );

    var zdir = new THREE.Vector3( 0, 0, 1 );
    hex = 0x0000ff;

    arrowHelper = new THREE.ArrowHelper( zdir, origin, length, hex, headLength, headWidth );
    scene.add( arrowHelper );
}


function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    windowQuartY = window.innerHeight / 4;
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    if (mainRing == null)
        return;

    //controls.update();
   // renderer.autoClear = false;
   // renderer.clear();
    renderer.render(scene, camera);


    if (mainRing && mainRing.rotation){
        mainRing.rotation.y += .05 * (asmTargetRotationY - mainRing.rotation.y);

        mainRing.rotation.x += .05 * (asmTargetRotationX - mainRing.rotation.x);

        var x = document.getElementById("refreshDiv");

        x.style.display = "none";
    }
    else {
        var x = document.getElementById("refreshDiv");

        x.style.display = "block";
    }
}

function ZoomInPressed() {
    null != mainRing && mainRing.position.z < .7 * cameraZoom && (mainRing.position.z += 30);
}

function ZoomOutPressed() {
    null != mainRing && mainRing.position.z > 1.25 * -cameraZoom && (mainRing.position.z -= 30);
}

function createMaterials() {
    colors.push({
        name: "yellow gold",
        value: 11180356
    });

    colors.push({
        name: "white gold",
        value: 15657130
    });

    colors.push({
        name: "red gold",
        value: 15122058
    });

    colors.push({
        name: "silver",
        value: 12632256
    });

    goldColor = colors[0].value;

    globalArrowM = new THREE.MeshPhongMaterial({
        color: colors[0].value,
        specular: 12298905,
        shininess: 50,
        reflectivity: 20,
        combine: THREE.MixOperation
    });

    var shininess = 50;
    var bumpScale = 1;
    var shading = THREE.SmoothShading;
    var specularMetal = 1249551;
    var specularPlastic = 0 ;

    goldM = new THREE.MeshPhongMaterial({
        bumpScale: bumpScale,
        color: goldColor,
        ambient: 0,
        specular: specularMetal,
        shininess: shininess,
        shading: shading,
        refractionRatio: 0.95
    });

    gemM = new THREE.MeshPhongMaterial({
            color: goldColor,
            refractionRatio: .95
        });
    pearlMaterial = new THREE.MeshPhongMaterial({
            bumpScale: bumpScale,
            color: goldColor,
            ambient: 0,
            specular: specularMetal,
            shininess: 20,
            shading: shading
        });
    beadMaterial = new THREE.MeshPhongMaterial({
            bumpScale: bumpScale,
            color: goldColor,
            ambient: 0,
            specular: specularPlastic,
            shininess: 1,
            shading: shading
        });
    cabochonMaterial = new THREE.MeshPhongMaterial({
            bumpScale: bumpScale,
            color: goldColor,
            ambient: 0,
            specular: specularMetal,
            shininess: 20,
            shading: shading
        });

    markerNotSelColor = [ 2611239, 12120504, 5831768, 7398512, 8834694, 326404, 4830793, 239363, 1936669, 1536279, 1135889, 87041 ];

    for(var  ii = 0; ii < 30; ii++) markerNotSelColor.push(87041);
}

function GenMainArea(e) {
    scene.remove(roomMesh);
    mainMode = true;

    iconPrev = new THREE.Mesh(genArrowGeometry(), globalArrowM.clone());

    iconPrev.position.x = -600;
    iconPrev.position.y = 300;
    iconPrev.position.z = -100;
    iconPrev.name = "icon previous";

    iconNext = new THREE.Mesh(genArrowGeometry(), globalArrowM.clone());

    iconNext.rotation.x = Math.PI;
    iconNext.position.x = -600;
    iconNext.position.y = -150;
    iconNext.position.z = -100;
    iconNext.name = "icon next";

    iconScrollGroup.push(iconPrev);
    iconScrollGroup.push(iconNext);

    activePrev = new THREE.Mesh(genArrowGeometry(),globalArrowM.clone());

    activePrev.position.x = 800;
    activePrev.position.y = 360;
    activePrev.position.z = -200;
    activePrev.name = "active previous";

    activeNext = new THREE.Mesh(genArrowGeometry(),globalArrowM.clone());

    activeNext.rotation.x = Math.PI;
    activeNext.position.x = 800;
    activeNext.position.y = -420;
    activeNext.position.z = -200;
    activeNext.name = "active next";

    activeScrollGroup.push(activePrev);
    activeScrollGroup.push(activeNext);

    //scene.add(activePrev);
    //scene.add(activeNext);

    texturePrev = new THREE.Mesh(genArrowGeometry(),globalArrowM.clone());

    texturePrev .position.x = -500;
    texturePrev.position.y = 310;
    texturePrev.position.z = -100;
    texturePrev.name = "texture previous";

    textureNext = new THREE.Mesh(genArrowGeometry(),globalArrowM.clone());

    textureNext.rotation.x = Math.PI;
    textureNext.position.x = -500;
    textureNext.position.y = -200;
    textureNext.position.z = -100;
    textureNext.name = "texture next";
}

function getObjectFont(e) {
    for (var t = {
        lateef: {
            normal: "lateef_regular.typeface"
        },
        david: {
            normal: "david_regular.typeface",
            bold: "david_bold.typeface"
        },
        devanagari: {
            normal: "devanagari_regular.typeface"
        },
        germania: {
            normal: "germania_regular.typeface"
        },
        guttman: {
            normal: "guttman_regular.typeface",
            bold: "guttman_bold.typeface"
        },
        helvetiker: {
            normal: "helvetiker_regular.typeface",
            bold: "helvetiker_bold.typeface"
        },
        italianno: {
            normal: "italianno_regular.typeface",
            bold: "italianno_bold.typeface"
        },
        keter: {
            normal: "keter_regular.typeface",
            bold: "keter_bold.typeface"
        },
        lancelot: {
            normal: "lancelot_regular.typeface",
            bold: "lancelot_bold.typeface"
        },
        merienda: {
            normal: "merienda_regular.typeface"
        },
        monogram: {
            normal: "monogram_regular.typeface",
            bold: "monogram_bold.typeface"
        },
        optimer: {
            normal: "optimer_regular.typeface",
            bold: "optimer_bold.typeface"
        },
        parisienne: {
            normal: "parisienne_regular.typeface",
            bold: "parisienne_bold.typeface"
        },
        script: {
            normal: "script_regular.typeface",
            bold: "script_bold.typeface"
        },
        simonetta: {
            normal: "simonetta_regular.typeface",
            bold: "simonetta_bold.typeface"
        }
    }, i = [], s = 0; s < e.length; s++)
        if (e[s].hasOwnProperty("font") && void 0 !== e[s].font && e[s].hasOwnProperty("fontWeight") && void 0 !== e[s].fontWeight && t.hasOwnProperty(e[s].font) && t[e[s].font].hasOwnProperty(e[s].fontWeight)) {
            var a = t[e[s].font][e[s].fontWeight];
            -1 == wizegem.fonts.indexOf(a) && -1 == i.indexOf(a) && i.push(a)
        }
    if (0 == i.length && -1 == wizegem.fonts.indexOf(t.optimer.normal) && i.push(t.optimer.normal),
        0 == i.length)
        return Promise.resolve();
    var o = "d" == wizegem.env ? "Design/Client/fonts/" : "dist/"
        , r = "d" == wizegem.env ? ".js" : ".min.js"
        , n = [];

    return i.forEach(function(e) {
        n.push(new Promise(function(t, i) {
                $.ajaxSetup({
                    cache: !0
                }),
                $.getScript( o + e + r /*+ "?v=" + wizegem.cache_hash ugi*/).done(function(i, s) {
                    wizegem.fonts.push(e),
                        t()
                }).fail(function(e, t, s) {
                    alert("failed to find: 'dist/script_bold.typeface.min.js'");
                    i()
                }),
                $.ajaxSetup({
                    cache: !1
                })
            }
        ))
    }),
    Promise.all(n)
}

function parseSrvObj(e, t)
{
    var i, s;

    i = "object" == typeof e ? e : JSON.parse(e);

    getObjectFont(i.items).then(function () {
        
    }).then(function () {
        mainRing = {};
        activeRingsMarkers = [];
        activeDispGroup = [];
        activeStart = 0;
        activeEnd = activeSize - 1;

        genJewelryObjects(i.items, function()
        {
            if (!wizegem.view_mode && !wizegem.sds)
                for (var e = 0; e < activeRingsObjects.length; e++)
                    addActiveObject(activeRingsObjects[e]);

            asmTargetRotationY = Math.PI / 4;
            asmTargetRotationX = 0;

           // mainRing.material.wireframe = true;
            scene.add(mainRing);
            activeRing = mainRing;
            activeRingObj = mainRingObj;
            activeRingIndex = 0;
            mainRingSelected = false;
            mainRingModelId = i.id;
            mainRingModelName = i.name;
            window.cust = i.c_edit;
            wizegem.view_mode || showModelOptions(mainRingModelName, mainRingModelId),
            wizegem.view_mode || wizegem.sds || (ACTIVE_SELECTED = activeRingsMarkers[0], ACTIVE_SELECTED_prev_color = activeRingsMarkers[0].material.color.getHex(),
            ACTIVE_SELECTED.material.color.setHex(markerSelColor)),
            t()
        });
    }).catch(function (a, b) {

    }) ;
}

function showModelOptions() {
    
}

function genArrowGeometry(a, b) {
    var c = a || 40, d = b || 5, e = new THREE.CylinderGeometry(d, d, c, 8, 2, !1), f = new THREE.CylinderGeometry(1, 1.4 * d, .375 * c, 8, 5, !1), g = new THREE.Mesh(f);
    return g.position.y += 1.375 * c / 2 - .5, THREE.GeometryUtils.merge(e, g), e;
}

function genJewelryObjects(items, onComplete) {
    activeRingsObjects = [];
    activeRings = [];
    activeRingIndex = -1;

    for (var i = 0; i < items.length; i++) {
        activeRingsObjects.push(null);
        activeRings.push(null);
    }

    for (i = 0; i < items.length; i++) {
        var item = items[i];

        var objName = item.name;

        switch (objName) {
            case "Name ring":
                var currRingObj = new THREE.NameRing(defaultR, false);
                break;
        }

        var edit_num = wg.edits[currRingObj.name].edits.length;

        currRingObj.editName = [],
            currRingObj.editOptions = [];
        for (var e = 0; e < edit_num; e++) {
            var editName = Object.keys(wg.edits[currRingObj.name].edits[e])[0]
                , editOptions = wg.edits[currRingObj.name].edits[e][editName];
            currRingObj.editName.push(editName),
                currRingObj.editOptions.push(editOptions)
        }

        if (currRingObj.id = item.id,
            currRingObj.id >= THREE.RingIdCount && (THREE.RingIdCount = currRingObj.id),
            null != item.shape && (currRingObj.shape = item.shape),
            null != item.text && (currRingObj.text = item.text),
            null != item.font && (currRingObj.font = item.font),
            null != item.fontLang && (currRingObj.fontLang = item.fontLang),
            null != item.fontWeight && (currRingObj.fontWeight = item.fontWeight),
            null != item.fontStyle && (currRingObj.fontStyle = item.fontStyle),
            null != item.typeface && (currRingObj.typeface = item.typeface,
                eval(currRingObj.typeface),
                specialFont = {
                    font: item.font,
                    fontWeight: item.fontWeight
                }),
            null != item.texture && (currRingObj.texture = item.texture),
            null != item.ringTexture && (currRingObj.ringTexture = item.ringTexture),
            null != item.ringR && (currRingObj.ringR = item.ringR),
            null != item.neckR && (currRingObj.neckR = item.neckR),
            null != item.accR && (currRingObj.accR = item.accR),
                currRingObj.loadNewPath = !0,
            null != item.pathPoints && (currRingObj.pathPoints = item.pathPoints,
                currRingObj.path = new THREE.Path(item.pathPoints)),
            null != item.pathActions) {
            currRingObj.path = new THREE.Path;
            for (var c = 0; c < item.pathActions.length; c++) {
                var action = item.pathActions[c].action
                    , args = item.pathActions[c].args;
                "moveTo" == action ? currRingObj.path.moveTo(args[0], args[1]) : "lineTo" == action ? currRingObj.path.lineTo(args[0], args[1]) : "quadraticCurveTo" == action ? currRingObj.path.quadraticCurveTo(args[0], args[1], args[2], args[3]) : "bezierCurveTo" == action && currRingObj.path.bezierCurveTo(args[0], args[1], args[2], args[3], args[4], args[5])
            }
        }

        if (null != item.pathCurves && null == item.pathActions) {
            currRingObj.path = new THREE.CurvePath;
            for (var c = 0; c < item.pathCurves.length; c++) {
                var curveInfo = item.pathCurves[c];
                "line" == curveInfo.type ? currRingObj.path.add(new THREE.LineCurve3(curveInfo.v1, curveInfo.v2)) : "quad" == curveInfo.type ? currRingObj.path.add(new THREE.QuadraticBezierCurve3(curveInfo.v0, curveInfo.v1, curveInfo.v2)) : "bez" == curveInfo.type && currRingObj.path.add(new THREE.CubicBezierCurve3(curveInfo.v0, curveInfo.v1, curveInfo.v2, curveInfo.v3)),
                    currRingObj.path.curves[currRingObj.path.curves.length - 1].type = curveInfo.type
            }
        }

        if (null != item.pathNurbs && (currRingObj.path = new THREE.NURBSCurve(item.pathNurbs.degree, item.pathNurbs.knots, item.pathNurbs.controlPoints)),
            (null != item.extPathActions || null != item.extPathCurves || null != item.extPathNurbs) && (currRingObj.extPath = [],
            null != item.extPathTypes))
            var currExtPathActions = []
                , currExtPathCurves = []
                , currExtPathNurbs = [];

        if (null != item.extPathActions)
            for (var h = 0; h < item.extPathActions.length; h++) {
                for (var extPath = new THREE.Path, extPathActions = item.extPathActions[h], c = 0; c < extPathActions.length; c++) {
                    var action = extPathActions[c].action
                        , args = extPathActions[c].args;
                    "moveTo" == action ? extPath.moveTo(args[0], args[1]) : "lineTo" == action ? extPath.lineTo(args[0], args[1]) : "quadraticCurveTo" == action ? extPath.quadraticCurveTo(args[0], args[1], args[2], args[3]) : "bezierCurveTo" == action && extPath.bezierCurveTo(args[0], args[1], args[2], args[3], args[4], args[5])
                }
                null != item.extPathTypes ? currExtPathActions.push(extPath) : currRingObj.extPath.push(extPath)
            }

        if (null != item.extPathCurves)
            for (var h = 0; h < item.extPathCurves.length; h++) {
                for (var extPath = new THREE.CurvePath, extPathCurves = item.extPathCurves[h], c = 0; c < extPathCurves.length; c++) {
                    var curveInfo = extPathCurves[c];
                    "line" == curveInfo.type ? extPath.add(new THREE.LineCurve3(curveInfo.v1, curveInfo.v2)) : "quad" == curveInfo.type ? extPath.add(new THREE.QuadraticBezierCurve3(curveInfo.v0, curveInfo.v1, curveInfo.v2)) : "bez" == curveInfo.type && extPath.add(new THREE.CubicBezierCurve3(curveInfo.v0, curveInfo.v1, curveInfo.v2, curveInfo.v3)),
                        extPath.curves[extPath.curves.length - 1].type = curveInfo.type
                }
                null != item.extPathTypes ? currExtPathCurves.push(extPath) : currRingObj.extPath.push(extPath)
            }

        if (null != item.extPathNurbs)
            for (var h = 0; h < item.extPathNurbs.length; h++) {
                var extPath = new THREE.NURBSCurve(item.extPathNurbs[h].degree, item.extPathNurbs[h].knots, item.extPathNurbs[h].controlPoints);
                null != item.extPathTypes ? currExtPathNurbs.push(extPath) : currRingObj.extPath.push(extPath)
            }

        if (null != item.extPathTypes)
            for (var actionsIndex = 0, curvesIndex = 0, nurbsIndex = 0, t = 0; t < item.extPathTypes.length; t++)
                "actions" == item.extPathTypes[t] ? (currRingObj.extPath.push(currExtPathActions[actionsIndex]),
                    actionsIndex += 1) : "curves" == item.extPathTypes[t] ? (currRingObj.extPath.push(currExtPathCurves[curvesIndex]),
                    curvesIndex += 1) : (currRingObj.extPath.push(currExtPathNurbs[nurbsIndex]),
                    nurbsIndex += 1);

        if ((null != item.holePathActions || null != item.holePathCurves || null != item.holePathNurbs) && (currRingObj.holePath = [],
            null != item.extPathTypes))
            var currHolePathActions = []
                , currHolePathCurves = []
                , currHolePathNurbs = [];


        if (null != item.holePathActions)
            for (var h = 0; h < item.holePathActions.length; h++) {
                for (var holePath = new THREE.Path, holePathActions = item.holePathActions[h], c = 0; c < holePathActions.length; c++) {
                    var action = holePathActions[c].action
                        , args = holePathActions[c].args;
                    "moveTo" == action ? holePath.moveTo(args[0], args[1]) : "lineTo" == action ? holePath.lineTo(args[0], args[1]) : "quadraticCurveTo" == action ? holePath.quadraticCurveTo(args[0], args[1], args[2], args[3]) : "bezierCurveTo" == action && holePath.bezierCurveTo(args[0], args[1], args[2], args[3], args[4], args[5])
                }
                null != item.holePathTypes ? currHolePathActions.push(holePath) : currRingObj.holePath.push(holePath)
            }

        if (null != item.holePathCurves)
            for (var h = 0; h < item.holePathCurves.length; h++) {
                for (var holePath = new THREE.CurvePath, holePathCurves = item.holePathCurves[h], c = 0; c < holePathCurves.length; c++) {
                    var curveInfo = holePathCurves[c];
                    "line" == curveInfo.type ? holePath.add(new THREE.LineCurve3(curveInfo.v1, curveInfo.v2)) : "quad" == curveInfo.type ? holePath.add(new THREE.QuadraticBezierCurve3(curveInfo.v0, curveInfo.v1, curveInfo.v2)) : "bez" == curveInfo.type && holePath.add(new THREE.CubicBezierCurve3(curveInfo.v0, curveInfo.v1, curveInfo.v2, curveInfo.v3)),
                        holePath.curves[holePath.curves.length - 1].type = curveInfo.type
                }
                null != item.holePathTypes ? currHolePathCurves.push(holePath) : currRingObj.holePath.push(holePath)
            }

        if (null != item.holePathNurbs)
            for (var h = 0; h < item.holePathNurbs.length; h++) {
                var holePath = new THREE.NURBSCurve(item.holePathNurbs[h].degree, item.holePathNurbs[h].knots, item.holePathNurbs[h].controlPoints);
                null != item.holePathTypes ? currHolePathNurbs.push(holePath) : currRingObj.holePath.push(holePath)
            }

        if (null != item.holePathTypes)
            for (var actionsIndex = 0, curvesIndex = 0, nurbsIndex = 0, t = 0; t < item.holePathTypes.length; t++)
                "actions" == item.holePathTypes[t] ? (currRingObj.holePath.push(currHolePathActions[actionsIndex]),
                    actionsIndex += 1) : "curves" == item.holePathTypes[t] ? (currRingObj.holePath.push(currHolePathCurves[curvesIndex]),
                    curvesIndex += 1) : (currRingObj.holePath.push(currHolePathNurbs[nurbsIndex]),
                    nurbsIndex += 1);

        if ((null != item.embossPathActions || null != item.embossPathCurves || null != item.embossPathNurbs) && (currRingObj.embossPath = [],
            null != item.embossPathTypes))
            var currEmbossPathActions = []
                , currEmbossPathCurves = []
                , currEmbossPathNurbs = [];

        if (null != item.embossPathActions)
            for (var h = 0; h < item.embossPathActions.length; h++) {
                for (var embossPath = new THREE.Path, embossPathActions = item.embossPathActions[h], c = 0; c < embossPathActions.length; c++) {
                    var action = embossPathActions[c].action
                        , args = embossPathActions[c].args;
                    "moveTo" == action ? embossPath.moveTo(args[0], args[1]) : "lineTo" == action ? embossPath.lineTo(args[0], args[1]) : "quadraticCurveTo" == action ? embossPath.quadraticCurveTo(args[0], args[1], args[2], args[3]) : "bezierCurveTo" == action && embossPath.bezierCurveTo(args[0], args[1], args[2], args[3], args[4], args[5])
                }
                null != item.embossPathTypes ? currEmbossPathActions.push(embossPath) : currRingObj.embossPath.push(embossPath)
            }

        if (null != item.embossPathCurves)
            for (var h = 0; h < item.embossPathCurves.length; h++) {
                for (var embossPath = new THREE.CurvePath, embossPathCurves = item.embossPathCurves[h], c = 0; c < embossPathCurves.length; c++) {
                    var curveInfo = embossPathCurves[c];
                    "line" == curveInfo.type ? embossPath.add(new THREE.LineCurve3(curveInfo.v1, curveInfo.v2)) : "quad" == curveInfo.type ? embossPath.add(new THREE.QuadraticBezierCurve3(curveInfo.v0, curveInfo.v1, curveInfo.v2)) : "bez" == curveInfo.type && embossPath.add(new THREE.CubicBezierCurve3(curveInfo.v0, curveInfo.v1, curveInfo.v2, curveInfo.v3)),
                        embossPath.curves[embossPath.curves.length - 1].type = curveInfo.type
                }
                null != item.embossPathTypes ? currEmbossPathCurves.push(embossPath) : currRingObj.embossPath.push(embossPath)
            }

        if (null != item.embossPathNurbs)
            for (var h = 0; h < item.embossPathNurbs.length; h++) {
                var embossPath = new THREE.NURBSCurve(item.embossPathNurbs[h].degree, item.embossPathNurbs[h].knots, item.embossPathNurbs[h].controlPoints);
                null != item.embossPathTypes ? currEmbossPathNurbs.push(embossPath) : currRingObj.embossPath.push(embossPath)
            }
        if (null != item.embossPathTypes)
            for (var actionsIndex = 0, curvesIndex = 0, nurbsIndex = 0, t = 0; t < item.embossPathTypes.length; t++)
                "actions" == item.embossPathTypes[t] ? (currRingObj.embossPath.push(currEmbossPathActions[actionsIndex]),
                    actionsIndex += 1) : "curves" == item.embossPathTypes[t] ? (currRingObj.embossPath.push(currEmbossPathCurves[curvesIndex]),
                    curvesIndex += 1) : (currRingObj.embossPath.push(currEmbossPathNurbs[nurbsIndex]),
                    nurbsIndex += 1);

        if (null != item.nurbs && (currRingObj.nurbs = item.nurbs),
            null != item.lastPathSelected && (currRingObj.lastPathSelected = item.lastPathSelected),
            null != item.lastGeometrySelected && (currRingObj.lastGeometrySelected = item.lastGeometrySelected),
            null != item.iconGeometry)
            for (var c = 0; c < item.iconGeometry.length; c++) {
                for (var loader = new THREE.STLLoader, iconG = loader.parseASCII(item.iconGeometry[c]), faceVertexUv = [], f = 0; f < iconG.faces.length; f++)
                    faceVertexUv.push([new THREE.Vector2(iconG.vertices[iconG.faces[f].a].x, iconG.vertices[iconG.faces[f].a].y), new THREE.Vector2(iconG.vertices[iconG.faces[f].b].x, iconG.vertices[iconG.faces[f].b].y), new THREE.Vector2(iconG.vertices[iconG.faces[f].c].x, iconG.vertices[iconG.faces[f].c].y)]);
                var faceVertexUvs = [];
                faceVertexUvs.push(faceVertexUv),
                    iconG.faceVertexUvs = faceVertexUvs;
                var iconM = new THREE.Mesh(iconG.clone());
                currRingObj.addIcon(iconM)
            }

        if (void 0 !== item.objURL && null != item.objURL && item.objURL.length > 0)
            _get_jszip().then(function () {
                JSZipUtils.getBinaryContent(item.objURL, function (e, t) {
                    if (e)
                        throw e;
                    currRingObj.objURL = item.objURL,
                        JSZip.loadAsync(t, {
                            base64: !0
                        }).then(function (e) {
                            var t = e.files[Object.keys(e.files)[0]];
                            e.file(t.name).async("arraybuffer").then(function (e) {
                                for (var t = (new THREE.STLLoader).parse(e), i = [], s = 0; s < t.faces.length; s++)
                                    i.push([new THREE.Vector2(t.vertices[t.faces[s].a].x, t.vertices[t.faces[s].a].y), new THREE.Vector2(t.vertices[t.faces[s].b].x, t.vertices[t.faces[s].b].y), new THREE.Vector2(t.vertices[t.faces[s].c].x, t.vertices[t.faces[s].c].y)]);
                                (f = []).push(i),
                                    t.faceVertexUvs = f;
                                var a = new THREE.Mesh(t);
                                a.scale.x = a.scale.y = a.scale.z = 10;
                                t = new THREE.Geometry;
                                if (THREE.GeometryUtils.merge(t, a),
                                    null == item.objType)
                                    currRingObj.objG = t.clone();
                                else if ("obj" == item.objType)
                                    currRingObj.objG = t.clone();
                                else if ("icon" == item.objType)
                                    currRingObj.icon = t.clone();
                                else if ("iconGeometry" == item.objType)
                                    for (var o = 0, r = 0, n = 0; n < item.iconGeometryInfo.length; n++) {
                                        for (var h = new THREE.Geometry, l = o + item.iconGeometryInfo[n].vertices_length - 1, c = o; c <= l; c++) {
                                            var p = t.vertices[c]
                                                , m = new THREE.Vector3(p.x, p.y, p.z);
                                            h.vertices.push(m)
                                        }
                                        var d = r + item.iconGeometryInfo[n].faces_length - 1
                                            , u = o;
                                        for (s = r; s <= d; s++) {
                                            var E, y, g, T = t.faces[s], x = T.vertexNormals, w = T.vertexColors;
                                            (E = new THREE.Face3(T.a - u, T.b - u, T.c - u)).normal.copy(T.normal);
                                            for (var v = 0, R = x.length; v < R; v++)
                                                y = x[v].clone(),
                                                    E.vertexNormals.push(y);
                                            E.color.copy(T.color);
                                            for (v = 0,
                                                     R = w.length; v < R; v++)
                                                g = w[v],
                                                    E.vertexColors.push(g.clone());
                                            E.materialIndex = T.materialIndex,
                                                h.faces.push(E)
                                        }
                                        o += item.iconGeometryInfo[n].vertices_length,
                                            r += item.iconGeometryInfo[n].faces_length;
                                        for (i = [],
                                                 s = 0; s < h.faces.length; s++)
                                            i.push([new THREE.Vector2(h.vertices[h.faces[s].a].x, h.vertices[h.faces[s].a].y), new THREE.Vector2(h.vertices[h.faces[s].b].x, h.vertices[h.faces[s].b].y), new THREE.Vector2(h.vertices[h.faces[s].c].x, h.vertices[h.faces[s].c].y)]);
                                        var f;
                                        (f = []).push(i),
                                            h.faceVertexUvs = f;
                                        var H = new THREE.Mesh(h.clone());
                                        currRingObj.addIcon(H)
                                    }
                                else
                                    currRingObj.freeGeometry = t.clone(),
                                        currRingObj.freeGeometry.computeBoundingBox();
                                contGenJewelryObjects()
                            })
                        })
                })
            });
        else {
            if ("" == item.objG)
                currRingObj.objG = "";
            else if (null != item.objG) {
                for (var loader = new THREE.STLLoader, objG = loader.parseASCII(item.objG), faceVertexUv = [], f = 0; f < objG.faces.length; f++)
                    faceVertexUv.push([new THREE.Vector2(objG.vertices[objG.faces[f].a].x, objG.vertices[objG.faces[f].a].y), new THREE.Vector2(objG.vertices[objG.faces[f].b].x, objG.vertices[objG.faces[f].b].y), new THREE.Vector2(objG.vertices[objG.faces[f].c].x, objG.vertices[objG.faces[f].c].y)]);
                var faceVertexUvs = [];
                faceVertexUvs.push(faceVertexUv),
                    objG.faceVertexUvs = faceVertexUvs,
                    currRingObj.objG = objG.clone()
            }
            contGenJewelryObjects()
        }


        function _handleSdsTextereLoad() {
            return new Promise(function (e, t) {
                    wizegem.sds || e();

                    var i = "Design/Client/textures/";
                    THREE.ImageUtils.loadTexture("Design/Client/textures/material1_58.jpg", void 0, function (t) {
                        t.wrapS = t.wrapT = THREE.RepeatWrapping,
                            t.anisotropy = 16,
                            goldM.map = t,
                            goldM.bumpMap = t;
                        var s = [i + "pisa_px.jpg", i + "pisa_nx.jpg", i + "pisa_py.jpg", i + "pisa_ny.jpg", i + "pisa_pz.jpg", i + "pisa_nz.jpg"];
                        THREE.ImageUtils.loadTextureCube(s, THREE.CubeRefractionMapping, function (t) {
                            if (metalEnvTexture = t,
                                    goldM.envMap = metalEnvTexture,
                                null !== currRingObj.color)
                                if (currRingObj.hasOwnProperty("stoneType") && null !== currRingObj.stoneType)
                                    if ("gem" == currRingObj.stoneType) {
                                        var s = "diamond"
                                            , a = [i + s + ".jpg", i + s + ".jpg", i + s + ".jpg", i + s + ".jpg", i + s + ".jpg", i + s + ".jpg"];
                                        THREE.ImageUtils.loadTextureCube(a, THREE.CubeRefractionMapping, function (t) {
                                            var i = t;
                                            gemM.envMap = i,
                                                e()
                                        })
                                    } else if ("pearl" == currRingObj.stoneType)
                                        THREE.ImageUtils.loadTexture("/Design/Client/textures/material1_30.jpg", void 0, function (t) {
                                            t.wrapS = t.wrapT = THREE.RepeatWrapping,
                                                t.anisotropy = 16,
                                                pearlMaterial.map = t,
                                                pearlMaterial.bumpMap = t;
                                            var s = [i + "pearl.jpg", i + "pearl.jpg", i + "pearl.jpg", i + "pearl.jpg", i + "pearl.jpg", i + "pearl.jpg"];
                                            THREE.ImageUtils.loadTextureCube(s, THREE.CubeRefractionMapping, function (t) {
                                                pearlMaterial.envMap = t,
                                                    e()
                                            })
                                        });
                                    else if ("cabochon" == currRingObj.stoneType)
                                        a = [i + "pearl.jpg", i + "pearl.jpg", i + "pearl.jpg", i + "pearl.jpg", i + "pearl.jpg", i + "pearl.jpg"],
                                            THREE.ImageUtils.loadTextureCube(a, THREE.CubeRefractionMapping, function (t) {
                                                cabochonMaterial.envMap = t;
                                                THREE.ImageUtils.loadTexture("/Design/Client/textures/ny.jpg", void 0, function (t) {
                                                    t.wrapS = t.wrapT = THREE.RepeatWrapping,
                                                        t.anisotropy = 16,
                                                        cabochonMaterial.map = t,
                                                        cabochonMaterial.bumpMap = t,
                                                        e()
                                                })
                                            });
                                    else
                                        THREE.ImageUtils.loadTexture("/Design/Client/textures/ny.jpg", void 0, function (t) {
                                            t.wrapS = t.wrapT = THREE.RepeatWrapping,
                                                t.anisotropy = 16,
                                                beadMaterial.map = t,
                                                beadMaterial.bumpMap = t,
                                                e()
                                        });
                                else
                                    e();
                            else
                                e()
                        })
                    })
                }
            )
        }

        function contGenJewelryObjects() {
            if (null != item.icon) {
                for (var e = (new THREE.STLLoader).parseASCII(item.icon), t = [], s = 0; s < e.faces.length; s++)
                    t.push([new THREE.Vector2(e.vertices[e.faces[s].a].x, e.vertices[e.faces[s].a].y), new THREE.Vector2(e.vertices[e.faces[s].b].x, e.vertices[e.faces[s].b].y), new THREE.Vector2(e.vertices[e.faces[s].c].x, e.vertices[e.faces[s].c].y)]);
                (o = []).push(t),
                    e.faceVertexUvs = o,
                    currRingObj.icon = e.clone()
            }
            if (null != item.freeGeometry) {
                var a = (new THREE.STLLoader).parseASCII(item.freeGeometry);
                for (t = [],
                         s = 0; s < a.faces.length; s++)
                    t.push([new THREE.Vector2(a.vertices[a.faces[s].a].x, a.vertices[a.faces[s].a].y), new THREE.Vector2(a.vertices[a.faces[s].b].x, a.vertices[a.faces[s].b].y), new THREE.Vector2(a.vertices[a.faces[s].c].x, a.vertices[a.faces[s].c].y)]);
                var o;
                (o = []).push(t),
                    a.faceVertexUvs = o,
                    currRingObj.freeGeometry = a.clone(),
                    currRingObj.freeGeometry.computeBoundingBox()
            }
            if (currRingObj.position = item.position,
                null != item.rotation && (currRingObj.rotation = item.rotation),
                currRingObj.editSelected.length > item.editSelected.length)
                for (var r = 0; r < item.editSelected.length; r++)
                    currRingObj.editSelected[r] = item.editSelected[r],
                    null != item.editName && (currRingObj.editName[r] = item.editName[r]);
            else
                currRingObj.editSelected = item.editSelected,
                null != item.editName && (currRingObj.editName = item.editName);
            if (currRingObj.asmSelected.length > item.asmSelected.length)
                for (var n = 0; n < item.asmSelected.length; n++)
                    currRingObj.asmSelected[n] = item.asmSelected[n],
                        currRingObj.asmObject[n] = item.asmObject[n];
            else
                currRingObj.asmSelected = item.asmSelected,
                    currRingObj.asmObject = item.asmObject;
            if (null != item.asmName && (currRingObj.asmName = item.asmName),
                null != item.asmInfo && (currRingObj.asmInfo = item.asmInfo),
                null != item.asmOptions)
                for (n = currRingObj.asmMarker.length; n < item.asmOptions.length; n++)
                    if (currRingObj.asmOptions.push(item.asmOptions[n]),
                        "scalar" == item.asmInfo[n].type) {
                        if (null != (w = item.asmOptions[n]).path)
                            for (var h = new THREE.CurvePath, l = 0; l < w.path.curves.length; l++) {
                                var c = w.path.curves[l];
                                "line" == c.type ? h.add(new THREE.LineCurve3(c.v1, c.v2)) : "quad" == c.type ? h.add(new THREE.QuadraticBezierCurve3(c.v0, c.v1, c.v2)) : "bez" == c.type && h.add(new THREE.CubicBezierCurve3(c.v0, c.v1, c.v2, c.v3)),
                                    h.curves[h.curves.length - 1].type = c.type
                            }
                        currRingObj.asmOptions[n].path = h
                    }
            var p = new THREE.Mesh(genArrowGeometry());
            p.geometry.computeBoundingBox();
            var m = p.geometry.boundingBox;
            p.rotation.x = -Math.PI / 2,
                p.position.z = m.max.y;
            var d = new THREE.Geometry;
            THREE.GeometryUtils.merge(d, p);
            for (n = currRingObj.asmMarker.length; n < currRingObj.asmOptions.length; n++) {
                var u = new THREE.Geometry
                    , E = currRingObj.asmOptions[n];
                if ("scalar" == currRingObj.asmInfo[n].type) {
                    if ((w = E).position = new THREE.Vector3(w.position.x, w.position.y, w.position.z),
                            w.rotation = new THREE.Vector3(w.rotation.x, w.rotation.y, w.rotation.z),
                        null == w.path)
                        var y = new THREE.Mesh(d);
                    else
                        y = new THREE.Mesh(BuildCreatePathConnGeometry(w.path));
                    var g = new THREE.Vector3(w.position.x, w.position.y, w.position.z)
                        , T = new THREE.Vector3(w.rotation.x, w.rotation.y, w.rotation.z);
                    y.position.set(g.x, g.y, g.z),
                        y.rotation.set(T.x, T.y, T.z),
                        THREE.GeometryUtils.merge(u, y)
                } else
                    for (var x = 0; x < E.length; x++) {
                        var w;
                        (w = E[x]).position = new THREE.Vector3(w.position.x, w.position.y, w.position.z),
                            w.rotation = new THREE.Vector3(w.rotation.x, w.rotation.y, w.rotation.z);
                        y = new THREE.Mesh(d),
                            g = new THREE.Vector3(w.position.x, w.position.y, w.position.z),
                            T = new THREE.Vector3(w.rotation.x, w.rotation.y, w.rotation.z);
                        y.position.set(g.x, g.y, g.z),
                            y.rotation.set(T.x, T.y, T.z),
                            THREE.GeometryUtils.merge(u, y)
                    }
                currRingObj.asmMarker.push(u)
            }
            currRingObj.resolution = 1 == platformMobile ? "low" : globalResolution;
            activeRingObj = currRingObj;
            currRingObj.buildGeometry();

            _handleSdsTextereLoad().then(function () {
                if (null != currRingObj.color) {
                    if (currRingObj.hasOwnProperty("stoneType") && null != currRingObj.stoneType)
                        if ("gem" == currRingObj.stoneType)
                            var e = gemM.clone();
                        else if ("pearl" == currRingObj.stoneType)
                            e = pearlMaterial.clone();
                        else if ("cabochon" == currRingObj.stoneType)
                            e = cabochonMaterial.clone();
                        else
                            e = beadMaterial.clone();
                    else
                        e = gemM.clone();
                    e.color.setHex(currRingObj.color)
                } else
                    e = goldM.clone();
                (activeRing = new THREE.Mesh(currRingObj.geometry, e)).id = currRingObj.id,
                    activeRing.position.x = currRingObj.position[0].x,
                    activeRing.position.y = currRingObj.position[0].y,
                    activeRing.position.z = currRingObj.position[0].z,
                    activeRing.rotation.x = currRingObj.rotation[0].x,
                    activeRing.rotation.y = currRingObj.rotation[0].y,
                    activeRing.rotation.z = currRingObj.rotation[0].z,

                    //ugi
                    i =0;
                    activeRingsObjects[i] = currRingObj,
                    activeRings[i] = activeRing,
                ++activeRingIndex + 1 == items.length && completeAsyncLoop()
            }).catch(function (e) {
                console.log("ERR: ", e)
            })
        }

    }
    (i);

    function completeAsyncLoop() {
        for (var e = 0; e < activeRings.length; e++)
            0 == e ? (mainRing = activeRings[0],
                mainRingObj = activeRingsObjects[0]) : mainRing.add(activeRings[e]);

        "bracelet" == TYPE_SELECTED && (mainRing.position.z = .75 * -cameraZoom),
            activeRingsObjects[0].insName = activeRingsObjects[0].shapeName,
            THREE.RingIdCount++,
            editAsmRing(0),
            onComplete()
    }
}

function _get_jszip() {
    return new Promise(function(a, b) {
        "undefined" != typeof JSZip && a(), $.when($.getScript("/bower_components/jszip/dist/jszip.min.js"), $.getScript("/bower_components/jszip-utils/dist/jszip-utils.min.js"), $.Deferred(function(a) {
            $(a.resolve);
        })).done(function() {
            a();
        });
    });
}

function BuildCreatePathConnGeometry() {
    
}

function editAsmRing(e) {
    for (var t = activeRingsObjects[e], i = 0; i < t.asmObject.length; i++) {
        for (var s = t.asmObject[i], a = -1, o = 0; o < activeRingsObjects.length; o++)
            activeRingsObjects[o].id == s && (a = o);
        if (-1 != a) {
            activeRingsObjects[a].insName = t.asmName[i] + " " + activeRingsObjects[a].shapeName;
            for (o = 0; o < activeRingsObjects[a].position.length; o++)
                for (var r = 0; r < mainRing.children.length; r++)
                    mainRing.children[r].insId == activeRings[a].insId && mainRing.remove(mainRing.children[r]);
            if (null != t.asmInfo) {
                if (null != t.asmInfo[i].fix_position)
                    var n = t.asmInfo[i].fix_position;
                if (null != t.asmInfo[i].type)
                    var h = t.asmInfo[i].type
            } else
                n = new THREE.Vector3(0,0,0),
                    h = "scalar";
            if ("array" != h ? (null != t.asmOptions[i].path && (activeRingsObjects[a].path = t.asmOptions[i].path),
                null != t.asmOptions[i].extPath && (activeRingsObjects[a].extPath = t.asmOptions[i].extPath)) : (null != t.asmOptions[i][0].path && (activeRingsObjects[a].path = t.asmOptions[i][0].path),
                null != t.asmOptions[i][0].extPath && (activeRingsObjects[a].extPath = t.asmOptions[i][0].extPath)),
                null != t.asmOptions[i].pathPart && (activeRingsObjects[a].pathPart = t.asmOptions[i].pathPart),
                    activeRingsObjects[a].pathOut = t.asmOptions[i].pathOut,
                null != t.asmOptions[i].planeCurve && (activeRingsObjects[a].planeCurve = t.asmOptions[i].planeCurve),
                null != t.asmOptions[i].planeRadius && (activeRingsObjects[a].planeRadius = t.asmOptions[i].planeRadius),
                    activeRingsObjects[a].buildGeometry(),
                    activeRingsObjects[a].position = [],
                    activeRingsObjects[a].rotation = [],
                    activeRingsObjects[a].scale = [],
                    activeRingsObjects[a].asmPosition = [],
                null != activeRingsObjects[a].color) {
                if (null != activeRingsObjects[a].stoneType)
                    if ("gem" == activeRingsObjects[a].stoneType)
                        var l = gemM.clone();
                    else if ("pearl" == activeRingsObjects[a].stoneType)
                        l = pearlMaterial.clone();
                    else if ("cabochon" == activeRingsObjects[a].stoneType)
                        l = cabochonMaterial.clone();
                    else
                        l = beadMaterial.clone();
                else
                    l = gemM.clone();
                l.color.setHex(activeRingsObjects[a].color)
            } else
                l = goldM.clone();
            if ("array" != h)
                var c = 1;
            else
                c = t.asmOptions[i].length;
            for (var p = 0; p < t.position.length; p++)
                for (o = 0; o < c; o++) {
                    if (null != activeRingsObjects[a].geometry)
                        var m = new THREE.Mesh(activeRingsObjects[a].geometry,l);
                    else
                        m = new THREE.Mesh(activeRingsObjects[a].drill_geometry,l);
                    if ("array" != h)
                        var d = t.asmOptions[i];
                    else
                        d = t.asmOptions[i][o];
                    m.insId = activeRingsObjects[a].id,
                    null != d.rotation && (m.rotation.x = d.rotation.x,
                        m.rotation.y = d.rotation.y,
                        m.rotation.z = d.rotation.z),
                        m.rotation.x += t.rotation[p].x,
                        m.rotation.y += t.rotation[p].y,
                        m.rotation.z += t.rotation[p].z,
                    null != d.scale && (m.scale.x = d.scale.x,
                        m.scale.y = d.scale.y,
                        m.scale.z = d.scale.z),
                        m.geometry.computeBoundingBox();
                    var u = m.geometry.boundingBox
                        , E = u.size();
                    if (null != d.rotation) {
                        var y = Math.max(E.x * Math.abs(Math.cos(d.rotation.z)), E.y * Math.abs(Math.sin(d.rotation.z)))
                            , g = Math.max(E.y * Math.abs(Math.cos(d.rotation.z)), E.x * Math.abs(Math.sin(d.rotation.z)));
                        E.x = y,
                            E.y = g;
                        var T = Math.abs(Math.cos(d.rotation.y)) * Math.min(u.min.x * Math.abs(Math.cos(d.rotation.z)), u.min.y * Math.abs(Math.sin(d.rotation.z)))
                            , x = Math.min(u.min.y * Math.abs(Math.cos(d.rotation.z)), u.min.x * Math.abs(Math.sin(d.rotation.z)));
                        u.min.x = T,
                            u.min.y = x
                    }
                    var w = 0
                        , v = 0
                        , R = 0;
                    if (d.position.z > .001)
                        R = -u.min.z * Math.cos(Math.abs(m.rotation.x - t.rotation[p].x)) - u.min.y * Math.sin(Math.abs(m.rotation.x - t.rotation[p].x));
                    else if (d.position.z < -.001)
                        R = u.min.z * Math.cos(Math.abs(m.rotation.x - t.rotation[p].x)) + u.min.y * Math.sin(Math.abs(m.rotation.x - t.rotation[p].x));
                    else
                        R = 0;
                    if (d.position.y > .001)
                        v = -u.min.z * Math.sin(Math.abs(m.rotation.x - t.rotation[p].x)) - u.min.y * Math.cos(Math.abs(m.rotation.x - t.rotation[p].x));
                    else if (d.position.y < -.001)
                        v = u.min.z * Math.sin(Math.abs(m.rotation.x - t.rotation[p].x)) + u.min.y * Math.cos(Math.abs(m.rotation.x - t.rotation[p].x));
                    else
                        v = 0;
                    if (v *= Math.abs(Math.cos(m.rotation.y)),
                        d.position.x > .001)
                        w = -u.min.z * Math.sin(Math.abs(m.rotation.y - t.rotation[p].y)) - u.min.x * Math.cos(Math.abs(m.rotation.x - t.rotation[p].x));
                    else if (d.position.x < -.001)
                        w = u.min.z * Math.sin(Math.abs(m.rotation.y - t.rotation[p].y)) + u.min.x * Math.cos(Math.abs(m.rotation.x - t.rotation[p].x));
                    else
                        w = 0;
                    null != n && (null != activeRingsObjects[a].fix_position ? activeRingsObjects[a].fix_position = new THREE.Vector3(activeRingsObjects[a].fix_position.x || n.x,activeRingsObjects[a].fix_position.y || n.y,activeRingsObjects[a].fix_position.z || n.z) : activeRingsObjects[a].fix_position = new THREE.Vector3(n.x,n.y,n.z)),
                    null != activeRingsObjects[a].fix_position && (activeRingsObjects[a].fix_position.x && (w = 0),
                    activeRingsObjects[a].fix_position.y && (v = 0),
                    activeRingsObjects[a].fix_position.z && (R = 0)),
                        m.position.z += t.position[p].z + (d.position.z + R) * Math.cos(Math.abs(t.rotation[p].x)) + (d.position.y + v) * Math.sin(Math.abs(t.rotation[p].x)),
                        m.position.y += t.position[p].y + (d.position.y + v) * Math.cos(Math.abs(t.rotation[p].x)) * Math.cos(Math.abs(t.rotation[p].z)) + (d.position.z + R) * Math.sin(Math.abs(t.rotation[p].x)),
                        m.position.x += t.position[p].x + (d.position.x + w) * Math.cos(Math.abs(t.rotation[p].x)) * Math.cos(Math.abs(t.rotation[p].z)) + (d.position.x + w) * Math.sin(Math.abs(t.rotation[p].x)) + (d.position.y + v) * Math.sin(Math.abs(t.rotation[p].z)),
                        mainRing.add(m),
                        activeRingsObjects[a].position.push(new THREE.Vector3(m.position.x,m.position.y,m.position.z)),
                        activeRingsObjects[a].rotation.push(new THREE.Vector3(m.rotation.x,m.rotation.y,m.rotation.z)),
                        activeRingsObjects[a].scale.push(new THREE.Vector3(m.scale.x,m.scale.y,m.scale.z)),
                        activeRingsObjects[a].asmPosition.push(new THREE.Vector3(d.position.x,d.position.y,d.position.z))
                }
            activeRings[a] = m,
                editAsmRing(a)
        }
    }
}

function genGemColorTable() {
    gemColor.push({
        base_name: "Red",
        tone_names: [ "very light", "light, strong sat", "light, very slightly brownish sat", "med light, strong sat", "med light, very slightly brownish sat", "med light, slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med, slightly brownish sat", "med dark, strong sat", "med dark, very slightly brownish sat", "dark" ],
        colors: [ 16771818, 16690091, 15841464, 16537688, 14970992, 13534854, 16450564, 14100520, 11881034, 10945283, 9248029, 5505281 ]
    }), gemColor.push({
        base_name: "orangey Red",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat" ],
        colors: [ 16696491, 16550232, 14979952, 16469764, 14179367, 10957827, 16696491, 16550232, 14979952, 16469764, 14179367, 10957827 ]
    }), gemColor.push({
        base_name: "reddish Orange",
        tone_names: [ "very light", "light, strong sat", "light, very slightly brownish sat", "med light, strong sat", "med light, very slightly brownish sat", "med light, slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med, slightly brownish sat", "med dark, strong sat", "med dark, very slightly brownish sat", "dark" ],
        colors: [ 16774378, 16700843, 15914939, 16558680, 14985840, 13544070, 16482308, 14188583, 11960393, 10966275, 9262365, 5516033 ]
    }), gemColor.push({
        base_name: "Orange",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat" ],
        colors: [ 16705195, 16567128, 14991728, 16494596, 14197543, 10974723, 16705195, 16567128, 14991728, 16494596, 14197543, 10974723 ]
    }), gemColor.push({
        base_name: "orangey Yellow",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat" ],
        colors: [ 16709035, 16575576, 14997872, 16507396, 14206503, 10983171, 16709035, 16575576, 14997872, 16507396, 14206503, 10983171 ]
    }), gemColor.push({
        base_name: "Yellow",
        tone_names: [ "very light", "light, strong sat", "light, very slightly brownish sat", "med light, strong sat", "med light, very slightly brownish sat", "med light, slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med, slightly brownish sat", "med dark, strong sat", "med dark, very slightly brownish sat", "dark" ],
        colors: [ 16777185, 16711339, 15856056, 16579672, 15000688, 13553286, 16513796, 14211111, 11974217, 10987267, 9276701, 5526529 ]
    }), gemColor.push({
        base_name: "greenish Yellow",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat" ],
        colors: [ 16121515, 15531096, 14279792, 14875396, 13031463, 9938691, 16121515, 15531096, 14279792, 14875396, 13031463, 9938691 ]
    }), gemColor.push({
        base_name: "yellowish Green",
        tone_names: [ "very light", "light, strong sat", "light, very slightly brownish sat", "med light, strong sat", "med light, very slightly brownish sat", "med light, slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med, slightly brownish sat", "med dark, strong sat", "med dark, very slightly brownish sat", "dark" ],
        colors: [ 16318433, 15400619, 14938552, 13892696, 13165680, 12373638, 12450564, 11327527, 10204745, 8300291, 7507229, 4215809 ]
    }), gemColor.push({
        base_name: "slightly yellowish Green",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat" ],
        colors: [ 14024363, 11205720, 11199600, 8452868, 8443943, 5613315, 14024363, 11205720, 11199600, 8452868, 8443943, 5613315 ]
    }), gemColor.push({
        base_name: "Green",
        tone_names: [ "very light", "light, strong sat", "light, very slightly brownish sat", "med light, strong sat", "med light, very slightly brownish sat", "med light, slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med, slightly brownish sat", "med dark, strong sat", "med dark, very slightly brownish sat", "dark" ],
        colors: [ 15400938, 11271851, 12120504, 5831768, 7398512, 8834694, 326404, 2611239, 4830793, 239363, 1936669, 87041 ]
    }), gemColor.push({
        base_name: "slightly bluish Green",
        tone_names: [ "very light", "light, strong sat", "light, very slightly greyish sat", "med light, strong sat", "med light, very slightly greyish sat", "med light, slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med, slightly greyish sat", "med dark, strong sat", "med dark, very slightly greyish sat", "dark" ],
        colors: [ 15400948, 11271893, 12120533, 5831850, 7398570, 8834730, 326528, 2611328, 4830848, 239445, 1936725, 87083 ]
    }), gemColor.push({
        base_name: "bluish Green",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat" ],
        colors: [ 11271917, 5831899, 7398605, 326602, 2611381, 239494, 11271917, 5831899, 7398605, 326602, 2611381, 239494 ]
    }), gemColor.push({
        base_name: "strongly bluish Green",
        tone_names: [ "very light", "light, strong sat", "light, very slightly greyish sat", "med light, strong sat", "med light, very slightly greyish sat", "med light, slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med, slightly greyish sat", "med dark, strong sat", "med dark, very slightly greyish sat", "dark" ],
        colors: [ 15400959, 11271934, 12120561, 5831932, 7398628, 8834766, 326651, 2611416, 4830902, 239527, 1936781, 87124 ]
    }), gemColor.push({
        base_name: "Green-Blue",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat" ],
        colors: [ 11268606, 5825532, 7394276, 317179, 2604504, 233127, 11268606, 5825532, 7394276, 317179, 2604504, 233127 ]
    }), gemColor.push({
        base_name: "strongly greenish Blue",
        tone_names: [ "very light", "light, strong sat", "light, very slightly greyish sat", "med light, strong sat", "med light, very slightly greyish sat", "med light, slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med, slightly greyish sat", "med dark, strong sat", "med dark, very slightly greyish sat", "dark" ],
        colors: [ 15398911, 11263486, 12114673, 5815036, 7386852, 8827342, 301307, 2593496, 4819638, 222631, 1925517, 78676 ]
    }), gemColor.push({
        base_name: "slightly greenish Blue",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat" ],
        colors: [ 11257086, 5802492, 7377892, 282619, 2579672, 210087, 11257086, 5802492, 7377892, 282619, 2579672, 210087 ]
    }), gemColor.push({
        base_name: "Blue",
        tone_names: [ "very light", "light, strong sat", "light, very slightly greyish sat", "med light, strong sat", "med light, very slightly greyish sat", "med light, slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med, slightly greyish sat", "med dark, strong sat", "med dark, very slightly greyish sat", "dark" ],
        colors: [ 15395583, 11250686, 12105969, 5789948, 7368932, 8816334, 263419, 2566104, 4802998, 197543, 1908109, 65876 ]
    }), gemColor.push({
        base_name: "violetish Blue",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat" ],
        colors: [ 13413374, 10115324, 10383588, 6751483, 7153369, 4522919, 13413374, 10115324, 10383588, 6751483, 7153369, 4522919 ]
    }), gemColor.push({
        base_name: "bluish Violet",
        tone_names: [ "very light", "light, strong sat", "light, very slightly greyish sat", "med light, strong sat", "med light, very slightly greyish sat", "med light, slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med, slightly greyish sat", "med dark, strong sat", "med dark, very slightly greyish sat", "dark" ],
        colors: [ 16313087, 14789630, 14530801, 12736764, 12349668, 11896526, 10814715, 10102744, 9390518, 7144359, 6692237, 3604820 ]
    }), gemColor.push({
        base_name: "Violet",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat" ],
        colors: [ 15576062, 14375164, 13463780, 13239547, 11872216, 8782759, 15576062, 14375164, 13463780, 13239547, 11872216, 8782759 ]
    }), gemColor.push({
        base_name: "bluish Purple",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med dark, strong sat" ],
        colors: [ 16428030, 15948028, 14643428, 15598843, 13576152, 10355623, 16428030, 15948028, 14643428, 15598843, 13576152, 10355623 ]
    }), gemColor.push({
        base_name: "Purple",
        tone_names: [ "very light", "light, strong sat", "light, very slightly greyish sat", "med light, strong sat", "med light, very slightly greyish sat", "med light, slightly greyish sat", "med, strong sat", "med, very slightly greyish sat", "med, slightly greyish sat", "med dark, strong sat", "med dark, very slightly greyish sat", "dark" ],
        colors: [ 16771837, 16690165, 15841516, 16537836, 14971097, 13534919, 16450786, 14165958, 11946411, 10945431, 9248130, 5505355 ]
    }), gemColor.push({
        base_name: "reddish Purple",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat" ],
        colors: [ 16690145, 16537794, 14971068, 16450725, 14165914, 10945389, 16690145, 16537794, 14971068, 16450725, 14165914, 10945389 ]
    }), gemColor.push({
        base_name: "strongly purplish Red",
        tone_names: [ "very light", "light, strong sat", "light, very slightly brownish sat", "med light, strong sat", "med light, very slightly brownish sat", "med light, slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med, slightly brownish sat", "med dark, strong sat", "med dark, very slightly brownish sat", "dark" ],
        colors: [ 16771827, 16690128, 15841489, 16537762, 14971045, 13534887, 16450675, 14165879, 11946362, 10945357, 9248080, 5505318 ]
    }), gemColor.push({
        base_name: "slightly purplish Red",
        tone_names: [ "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat", "light, strong sat", "med light, strong sat", "med light, very slightly brownish sat", "med, strong sat", "med, very slightly brownish sat", "med dark, strong sat" ],
        colors: [ 16690112, 16537730, 14971021, 16450626, 14165844, 10945325, 16690112, 16537730, 14971021, 16450626, 14165844, 10945325 ]
    }), gemColor.push({
        base_name: "Grey",
        tone_names: [ "vey light grey", "light grey", "medium light grey", "grey", "medium dark grey", "dark grey", "vey light grey", "light grey", "medium light grey", "grey", "medium dark grey", "dark grey" ],
        colors: [ 16053492, 13948116, 11184810, 8355711, 5592405, 2763306, 16053492, 13948116, 11184810, 8355711, 5592405, 2763306 ]
    }), gemColor.push({
        base_name: "Normal diamond",
        tone_names: [ "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Z" ],
        colors: [ 16777205, 16777195, 16777179, 16777163, 16777153, 16777143, 16777133, 16777123, 16777113, 16777103, 16777093, 16777083 ]
    });
}

function genPearlTable() {
    pearlTable.push({
        type: "Akoya",
        shapes: [ "round", "baroque" ],
        sizes: [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
        colors: [ 13948116, 16777164, 16119040, 16218273, 2839678, 16761035, 6290199 ],
        color_names: [ "white", "cream", "yellow", "pink", "blue", "rose", "green" ]
    }), pearlTable.push({
        type: "South sea",
        shapes: [ "round", "oval", "button", "drop", "baroque" ],
        sizes: [ 8, 9, 10, 11, 12, 13, 15, 17, 20 ],
        colors: [ 13948116, 16777164, 12632256, 16119040, 13934615, 2839678, 16761035, 6290199 ],
        color_names: [ "white", "cream", "silver", "yellow", "orange", "blue", "pink", "green" ]
    }), pearlTable.push({
        type: "Tahitian",
        shapes: [ "round", "oval", "button", "drop", "baroque" ],
        sizes: [ 9, 10, 11, 12, 13, 14 ],
        colors: [ 788746, 7565166, 2824983, 5146997, 5126270, 13433693 ],
        color_names: [ "black", "grey", "brown", "bluish green", "purple", "yellowish green" ]
    }), pearlTable.push({
        type: "Freshwater",
        shapes: [ "round", "oval", "button", "baroque" ],
        sizes: [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
        colors: [ 13948116, 16777164, 16774016, 15103057, 16146603, 7089607 ],
        color_names: [ "white", "cream", "yellowish orange", "pink", "purple", "blue" ]
    });
}