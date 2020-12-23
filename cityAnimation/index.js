import {LoadingManager, FileLoader, TextureLoader, FontLoader, TextGeometry, MeshPhongMaterial} from '../lib/three.js-r123/build/three.module.js';
import {Mesh} from '../lib/three.js-r123/build/three.module.js';
import {PlaneBufferGeometry} from '../lib/three.js-r123/build/three.module.js';
import {Group, MeshBasicMaterial} from '../lib/three.js-r123/build/three.module.js';
import {Vector3, MeshLambertMaterial, Color,CatmullRomCurve3,
      BufferGeometry, LineBasicMaterial, BoxBufferGeometry} from '../lib/three.js-r123/build/three.module.js';
import { GLTFLoader } from '../lib/three.js-r123/examples/jsm/loaders/GLTFLoader.js';
import {Line, Vector2} from "../lib/three.js-r123/build/three.module.js";
import {BufferGeometryUtils} from "../lib/three.js-r123/examples/jsm/utils/BufferGeometryUtils.js";

var isDebug = false;
var useEffectComposer = true;
var cameraControlEnabled = false;
var cityGroupPosition = new Vector3(0, 1, 0);
var totalAnimationDuration = 13500;
var cityAnimationDuration = 10500;

var theWebGl;
var options_T = {
    currentSceneIdx: 1,
    clickIsEnabled: false,
    popUpIsOpened: false,
    sceneTimings: [{
        totalDuration: totalAnimationDuration,
        sloganDelay: 1200
    }]
};
var shaders_e, textures_t, gltfs_n, loadManager_l = (new URL(location.href).searchParams.get("v"), new LoadingManager);
var cityAttributeInfo_wd = {
    scale: 1.5,
    buildings: {
        vertDecimate: 1,
        scales: {
            default: 0.008,
            denominator: 120
        },
        colors: [new Color("rgb(255, 80, 30)"), new Color("rgb(250, 90, 20)"), new Color("rgb(165, 74, 19)"), new Color("rgb(204, 184, 152)"), new Color("rgb(229, 156, 77)")],
        opacities: {
            min: 0.5,
            max: 0.9
        }
    },
    floor: {
        vertDecimate: 2,
        scales: {
            default: 0.006,
            denominator: 90
        },
        colors: [new Color("rgb(60, 80, 255)"), new Color("rgb(60, 60, 215)"), new Color("rgb(90, 90, 255)"), new Color("rgb(49, 47, 68)"), new Color("rgb(126, 128, 156)"), new Color("rgb(90, 89, 94)")],
        opacities: {
            min: 0.3,
            max: 0.8
        }
    },
    sky: {
        vertDecimate: 8,
        scales: {
            default: 0.0018,
            denominator: 50
        },
        colors: [new Color("rgb(255, 255, 255)")],
        opacities: {
            min: 0.5,
            max: 1
        }
    }
};
var cityGroup_vd;
var cityUpdateable_yd;
var starGroup_bd;

var cityAnimationStartSetting = {
    scene: {
        fog: {
            color: new Color(0,0,0),
            density: 0.0062
        }
    },
    camera: {
        originalPosition: new Vector3(-42, -11, 98),
        lookatPosition: new Vector3(0),
        fov: 73
    },
    lights: {
        ambient: {
            color: new Color(1,1,1),
            intensity: 2
        }
    },
    controls: {
        enabled: cameraControlEnabled,
        minDistance: 10,
        maxDistance: 500,
        minPolarAngle: 0,
        maxPolarAngle: Math.PI / 2
    },
    postprocessing: {
        bloomPass: {
            threshold: 0.26,
            strength: 0.91,
            radius: 0.11
        },
        vignetteShader: {
            darkness: 1.24,
            offset: 1.35
        }
    }
};

var starSizeAnimationInfo_Md = {
    size: {
        width: 0.1,
        height: 2
    },
    tweens: {
        curves: [],
        splines: [],
        options: [],
        animations: [],
        opacitySpeed: 0.35
    }
};

var cityAnimationInfo_Td = {
    cameraLookat: new Vector3(0, 0, 0),
    cameraCurves: [],
    cameraSplines: [],
    cameraTweenOptions: [],
    cameraTweenAnimations: [],
    cameraOut: {
        curve: null,
        spline: null,
        tweenOptions: {
            origin: new Vector3(0, 0, 0),
            target: new Vector3(1, 0, 0),
            time: 1000,
            curve: TWEEN.Easing.Exponential.In
        },
        tween: null
    },
    cameraOrientation: {
        enabled: false,
        thresholds: {
            part1: 10.2,
            part2: 7.2,
            part3: 0.5
        },
        force: new Vector2(0),
        forceSmoother: 0
    }
};

// font variables
var fontName = "optimer";
var fontWeight = "bold";
var font = undefined;
var text = "PlayCash", 	height = 2, size = 7,  textYUpPosition = 15, curveSegments = 4, bevelThickness = 0.3, bevelSize = 0.74, bevelEnabled = true, textGeo;

var objectPropertyDefine = function(object_e, propertyName_t, value_r) {
    Object.defineProperty(object_e, propertyName_t, {
        enumerable: true,
        get: value_r
    })
};

function generateRandom_Ch(min, max) {
    return Math.random() * (max - min) + min
}

var CameraAnimationCurveViewer_ep = (function() {
    function _(name, webgl, pointArray, isDebug) {
        this.name = name;
        this.webgl = webgl;
        this.pointsArray = pointArray;
        this.isDebug = isDebug;
        this.drawLine();
    }

    _.prototype.drawLine = function() {
        var pointArray = this.pointsArray.getPoints(50);
        var geometry = (new BufferGeometry).setFromPoints(pointArray);
        var material = new LineBasicMaterial({
            color: "rgb(255,0,0)"
        });

        this.line = new Line(geometry,material);
        this.line.name = this.name;
        this.isDebug || (this.line.material.visible = false);
        this.webgl.scene.add(this.line);
    };

    return _;

})();

function onSwitchScene_A(desiredSceneIndex_e) {
    if(desiredSceneIndex_e == null)
        return;

    if(!cityAnimationInfo_Td.cameraTweenAnimations[0]._isPlaying) {
        // we immediately start
        animations_M[desiredSceneIndex_e].animationController("start");
    }
    else {
        animations_M[desiredSceneIndex_e].animationController("stop", function () {
            animations_M[desiredSceneIndex_e].animationController("start");
        } );
    }

    var liElement = $(".scenes-navigation li");

    liElement.find("span").stop().css({
        width: 0
    });

    liElement.eq(desiredSceneIndex_e).find("span").animate({
        width: "100%"
    }, options_T.sceneTimings[desiredSceneIndex_e].totalDuration, "linear");
}

function onShaderCompile_E() {
    setTimeout((function() {
            $("#loading .comment").fadeOut();
            $("#loading").removeClass("white");
            $("#loading").addClass("img_hide");
            onSwitchScene_A(0);

            setTimeout((function() {
                    $("#loading").addClass("scale")
                }
            ), 1200)
        }
    ), 0);
}

window.onload = function() {
    let options = {
        container: document.getElementById("webgl"),
        sceneOptions: {
            backgroundColor: 0
        },
        cameraOptions: {
            fov: 60,
            near: 0.1,
            far: 1000,
            x: 0,
            y: 0,
            z: 0
        },
        bloom: {
            exposure: 1,
            bloomStrength: 0.8,
            bloomThreshold: 0.2,
            bloomRadius: 0.5
        },
        vignette: {
            vignetteDarkness: 1.1,
            vignetteOffset: 1.3
        },
        ambientLight: {
            color: 16777215,
            intensity: 2
        },
        spotLight: {
            color: 16777215,
            intensity: 1.6
        },
        hasTween: true,
        isDebug: isDebug,
        useEffectComposer: useEffectComposer
    };

    theWebGl = new WebGL(options);

    loadFont();

    loadManager_l.onStart = function(url, itemsLoaded, itemsTotal) {};
    loadManager_l.onLoad = function() {
        setTimeout((function() {
                initCityScene_Ed();
            }
        ), 200)
    };

    loadManager_l.onProgress = function(url, itemsLoaded, itemsTotal) {
        $(".loadingstyle").css("width", $("#loadingholder").width() * (1 - itemsLoaded / itemsTotal ));
    };

    loadManager_l.onError = function(url) {
        console.log("there was an error loading " + url)
    };

    shaders_e = function(loadingManager) {
        var shaders_t = {
            noises: resourceDomain + "/glsl/chunk/noises.glsl",
            background_starsCustomLambertVertexShader: resourceDomain + "/glsl/background/starsLambertVertex.vert",
            background_starsCustomLambertFragmentShader: resourceDomain + "/glsl/background/starsLambertFragment.frag",
            city_customLambertVertexShader: resourceDomain + "/glsl/city/lambertVertex.vert",
            city_customLambertFragmentShader: resourceDomain + "/glsl/city/lambertFragment.frag",
            city_cityBaseDisplacement: resourceDomain + "/glsl/chunk/cityBaseDisplacement.glsl",
            city_cityFinalBehaviour: resourceDomain + "/glsl/chunk/cityFinalBehaviour.glsl"
        };

        var fileLoader_r = new FileLoader(loadingManager);

        for (let key in shaders_t) {
            fileLoader_r.load(shaders_t[key], (function(shader_n) {
                    shaders_t[key] = shader_n
                }
            ))
        }

        return shaders_t
    }(loadManager_l);

    textures_t = function(e) {
            var textures_t = {
                particle: resourceDomain + "/textures/particle.png",
                particleBlur: resourceDomain + "/textures/particleBlur.png",
            };

            var textureLoader_r = new TextureLoader(e);

            for ( let key in textures_t) {
                textureLoader_r.load(textures_t[key], (function(texture_n) {
                        textures_t[key] = texture_n
                    }
                ))
            }

            return textures_t
        }(loadManager_l);

    gltfs_n = function(loadingManager) {
            var gltfUrls = {
                buildings: resourceDomain + "/models/city/Luvr_work2_5.gltf",
                //buildings: resourceDomain + "/models/city/Luvr_work.gltf",
               // buildings: resourceDomain + "/models/city/buildings.gltf",
               floor: resourceDomain + "/models/city/floor.gltf",
               sky: resourceDomain + "/models/city/sky.gltf"
            };

            var gltfLoader_r = new GLTFLoader(loadingManager);

            for (let key in gltfUrls) {
                gltfLoader_r.load(gltfUrls[key], (function(gltf) {
                        gltfUrls[key] = gltf
                    }
                ))
            }

            return gltfUrls

        }(loadManager_l);
};

var animationCity_a = {};

function animationControllerCity_Nd(action, stopCallback) {
    switch (action) {
        case "start":
            theWebGl.updateSettings(cityAnimationStartSetting);

            cityGroup_vd.visible = true;

           // cityUpdateable_yd.materialShader.uniforms.uTimeElapsed.value = cityUpdateable_yd.time;
            cityAnimationInfo_Td.cameraOrientation.enabled = true;
            cityAnimationInfo_Td.cameraTweenAnimations[0].start();

            if(cityAnimationInfo_Td.cameraTweenAnimations[1]) {
                cityAnimationInfo_Td.cameraTweenAnimations[0].chain(cityAnimationInfo_Td.cameraTweenAnimations[1]);

                if(cityAnimationInfo_Td.cameraTweenAnimations[2]) {
                    cityAnimationInfo_Td.cameraTweenAnimations[1].chain(cityAnimationInfo_Td.cameraTweenAnimations[2]);
                    cityAnimationInfo_Td.cameraTweenAnimations[2].onComplete((() => {
                            onSwitchScene_A(0)
                        }
                    ));
                }
                else {
                    cityAnimationInfo_Td.cameraTweenAnimations[1].onComplete((() => {
                            onSwitchScene_A(0)
                        }
                    ));
                }
            }else {
                cityAnimationInfo_Td.cameraTweenAnimations[0].onComplete((() => {
                        onSwitchScene_A(0)
                    }
                ));
            }

            break;
        case "stop":
            for (var n = 0; n < cityAnimationInfo_Td.cameraTweenAnimations.length; n++)
                cityAnimationInfo_Td.cameraTweenAnimations[n]._isPlaying && cityAnimationInfo_Td.cameraTweenAnimations[n].stop();

            if(cityAnimationInfo_Td.cameraOut.tween) {
                cityAnimationInfo_Td.cameraOut.tween.start();
                cityAnimationInfo_Td.cameraOut.tween.onComplete((function() {
                        for (var r = 0; r < starGroup_bd.children.length; r++)
                            starGroup_bd.children[r].visible = false;

                        if(stopCallback)
                            stopCallback();

                        return cityAnimationInfo_Td.cameraOrientation.enabled = false;//, t()
                    }
                ));
            }

            break;
        case "pause":
            for (var r = 0; r < cityAnimationInfo_Td.cameraTweenAnimations.length; r++)
                cityAnimationInfo_Td.cameraTweenAnimations[r]._isPlaying && cityAnimationInfo_Td.cameraTweenAnimations[r].pause();

            break;
        case "resume":
            for (var i = 0; i < cityAnimationInfo_Td.cameraTweenAnimations.length; i++)
                cityAnimationInfo_Td.cameraTweenAnimations[i]._isPaused && cityAnimationInfo_Td.cameraTweenAnimations[i].resume();
    }
}

function hideCity_Ad() {
    cityGroup_vd.visible = false
}

objectPropertyDefine(animationCity_a, "init", (function() {
        return initCityScene_Ed
    }
));

objectPropertyDefine(animationCity_a, "dispose", (function() {
        return hideCity_Ad
    }
));

objectPropertyDefine (animationCity_a, "animationController", (function() {
        return animationControllerCity_Nd
    }
));

var animations_M = [animationCity_a];

function updateStar_Od(index) {
    var t = starSizeAnimationInfo_Md.tweens.options[index].origin.x;
    var n = starSizeAnimationInfo_Md.tweens.splines[index].pointsArray.getPointAt(t);

    starGroup_bd.children[index].position.copy(n);

    var r, i, o = new Vector3(0,1,0), a = new Vector3;

    i = starSizeAnimationInfo_Md.tweens.splines[index].pointsArray.getTangentAt(t).normalize(),
        a.crossVectors(o, i).normalize(),
        r = Math.acos(o.dot(i)),
        starGroup_bd.children[index].quaternion.setFromAxisAngle(a, r),
        starGroup_bd.children[index].scale.y = 1 + 18 * t,
        t < starSizeAnimationInfo_Md.tweens.opacitySpeed ? starGroup_bd.children[index].material.opacity = t / starSizeAnimationInfo_Md.tweens.opacitySpeed : t > 1 - starSizeAnimationInfo_Md.tweens.opacitySpeed && (starGroup_bd.children[index].material.opacity = (1 - t) / starSizeAnimationInfo_Md.tweens.opacitySpeed)
}

function initCityScene_Ed() {
    var cityGltfs = [gltfs_n.buildings, gltfs_n.floor, gltfs_n.sky];

    var buildingsGeometries_u = [];
    var floorGeometries_h = [];
    var skyGeometries_p = [];

    cityGltfs.forEach((function(gltf) {
            if(!gltf)
                return;

            gltf.scene.traverse((function(object) {
                    if (object.isMesh && null != object) {
                        var meshName = object.name.includes("_") ? object.name.substr(0, object.name.indexOf("_")) : object.name;
                        "floor" == meshName ? floorGeometries_h.push(object.geometry) : "sky" == meshName ? skyGeometries_p.push(object.geometry) : buildingsGeometries_u.push(object.geometry)
                    }
                }
            ))
        }
    ));

    var cityGroup_d = new Group;

    var material_f = new MeshBasicMaterial({
        color: "#ffffff",
        wireframe: useEffectComposer,
        visible: !useEffectComposer
    });

    if (buildingsGeometries_u.length > 0) {
        var m = new Mesh(BufferGeometryUtils.mergeBufferGeometries(buildingsGeometries_u, true), material_f);
        m.name = "buildings";
        cityGroup_d.add(m)
    }

    if (floorGeometries_h.length > 0) {
        var g = new Mesh(BufferGeometryUtils.mergeBufferGeometries(floorGeometries_h, true), material_f);
        g.name = "floor";
        cityGroup_d.add(g)
    }

    if (skyGeometries_p.length > 0) {
        var v = new Mesh(BufferGeometryUtils.mergeBufferGeometries(skyGeometries_p, true), material_f);
        v.name = "sky";
        cityGroup_d.add(v);
    }

    cityGroup_d.position.copy(cityGroupPosition);
    cityGroup_d.scale.copy(new Vector3(cityAttributeInfo_wd.scale,cityAttributeInfo_wd.scale,cityAttributeInfo_wd.scale));

    theWebGl.scene.add(cityGroup_d);
    initCityGroup(cityGroup_d);

    initStarAnimation();
    starGroup_bd = new Group;

    for (let i = 0; i < starSizeAnimationInfo_Md.tweens.animations.length; i++) {
        var t = new Mesh(new BoxBufferGeometry(starSizeAnimationInfo_Md.size.width,starSizeAnimationInfo_Md.size.height,starSizeAnimationInfo_Md.size.width,1,1,1),new MeshBasicMaterial({
            color: "#ffffff",
            side: 2,
            fog: false,
            transparent: true,
            opacity: 0,
            visible: true
        }));

        t.visible = false;
        starGroup_bd.add(t);
    }

    theWebGl.scene.add(starGroup_bd)
}

function initStarAnimation() {
    starSizeAnimationInfo_Md.tweens.curves.push(new CatmullRomCurve3([new Vector3(-150,-10,-100), new Vector3(400,250,-70)]));
    starSizeAnimationInfo_Md.tweens.curves.push(new CatmullRomCurve3([new Vector3(250,100,-50), new Vector3(-250,-30,-50)]));
    starSizeAnimationInfo_Md.tweens.curves.push(new CatmullRomCurve3([new Vector3(-100,70,-40), new Vector3(300,20,-30)]));

    for (let i = 0; i < starSizeAnimationInfo_Md.tweens.curves.length; i++)
        starSizeAnimationInfo_Md.tweens.splines.push(new CameraAnimationCurveViewer_ep("shootingStarsSpline" + i + 1, theWebGl, starSizeAnimationInfo_Md.tweens.curves[i], false));

    starSizeAnimationInfo_Md.tweens.options.push({
        origin: new Vector3(0,0,0),
        target: new Vector3(1,0,0),
        time: 3e3,
        curve: TWEEN.Easing.Quadratic.InOut
    });

    starSizeAnimationInfo_Md.tweens.animations.push(new TWEEN.Tween(starSizeAnimationInfo_Md.tweens.options[0].origin).to(starSizeAnimationInfo_Md.tweens.options[0].target, starSizeAnimationInfo_Md.tweens.options[0].time).easing(starSizeAnimationInfo_Md.tweens.options[0].curve).onStart((function() {
            starGroup_bd.children[0].visible = true;
            starGroup_bd.children[0].material.opacity = 0;
        }
    )).onUpdate((function() {
            updateStar_Od(0)
        }
    )).onComplete((function() {
            starGroup_bd.children[0].material.opacity = 0;
            starGroup_bd.children[0].visible = false;
        }
    )));

    starSizeAnimationInfo_Md.tweens.options.push({
        origin: new Vector3(0,0,0),
        target: new Vector3(1,0,0),
        time: 3200,
        curve: TWEEN.Easing.Quadratic.InOut
    });

    starSizeAnimationInfo_Md.tweens.animations.push(new TWEEN.Tween(starSizeAnimationInfo_Md.tweens.options[1].origin).to(starSizeAnimationInfo_Md.tweens.options[1].target, starSizeAnimationInfo_Md.tweens.options[1].time).easing(starSizeAnimationInfo_Md.tweens.options[1].curve).onStart((function() {
            starGroup_bd.children[1].visible = true,
                starGroup_bd.children[1].material.opacity = 0
        }
    )).onUpdate((function() {
            updateStar_Od(1)
        }
    )).onComplete((function() {
            starGroup_bd.children[1].material.opacity = 0,
                starGroup_bd.children[1].visible = false
        }
    )));

    starSizeAnimationInfo_Md.tweens.options.push({
        origin: new Vector3(0,0,0),
        target: new Vector3(1,0,0),
        time: 3700,
        curve: TWEEN.Easing.Quadratic.InOut
    });

    starSizeAnimationInfo_Md.tweens.animations.push(new TWEEN.Tween(starSizeAnimationInfo_Md.tweens.options[2].origin).to(starSizeAnimationInfo_Md.tweens.options[2].target, starSizeAnimationInfo_Md.tweens.options[2].time).easing(starSizeAnimationInfo_Md.tweens.options[2].curve).onStart((function() {
            starGroup_bd.children[2].visible = true,
                starGroup_bd.children[2].material.opacity = 0
        }
    )).onUpdate((function() {
            updateStar_Od(2)
        }
    )).onComplete((function() {
            starGroup_bd.children[2].material.opacity = 0,
                starGroup_bd.children[2].visible = false
        }
    )));
}

function initCityGroup(group_e) {
    var attributes = {
        startPositions: [],
        offsets: [],
        colors: [],
        scales: [],
        types: [],
        lifetimes: [],
        velocities: [],
        opacities: [],
        delays: []
    };

    cityGroup_vd = group_e;

    for (var n = 0; n < cityGroup_vd.children.length; n++) {
        var vertDecimate = undefined;

        vertDecimate = "buildings" == cityGroup_vd.children[n].name ? cityAttributeInfo_wd.buildings.vertDecimate : "floor" == cityGroup_vd.children[n].name ? cityAttributeInfo_wd.floor.vertDecimate : cityAttributeInfo_wd.sky.vertDecimate;

        for (var i = 0; i < cityGroup_vd.children[n].geometry.attributes.position.count; i++)
            if (i % vertDecimate == 0) {
                var x = cityGroup_vd.children[n].geometry.attributes.position.array[3 * i];
                var y = cityGroup_vd.children[n].geometry.attributes.position.array[3 * i + 1];
                var z = cityGroup_vd.children[n].geometry.attributes.position.array[3 * i + 2];

                var position = new Vector3(x,y,z);
                var color = undefined;
                var type= undefined;
                var scale = undefined;
                var opacity = undefined;

                "buildings" == cityGroup_vd.children[n].name ? (color = cityAttributeInfo_wd.buildings.colors[Math.floor(Math.random() * cityAttributeInfo_wd.buildings.colors.length)],
                    type = 0,
                    scale = cityAttributeInfo_wd.buildings.scales.default + (Math.random() - .5) / cityAttributeInfo_wd.buildings.scales.denominator,
                    opacity = generateRandom_Ch(cityAttributeInfo_wd.buildings.opacities.min, cityAttributeInfo_wd.buildings.opacities.max)) : "floor" == cityGroup_vd.children[n].name ? (color = cityAttributeInfo_wd.floor.colors[Math.floor(Math.random() * cityAttributeInfo_wd.floor.colors.length)],
                    type = 10,
                    scale = cityAttributeInfo_wd.floor.scales.default + (Math.random() - .5) / cityAttributeInfo_wd.floor.scales.denominator,
                    opacity = generateRandom_Ch(cityAttributeInfo_wd.floor.opacities.min, cityAttributeInfo_wd.floor.opacities.max)) : (position = new Vector3(position.x,position.y + (Math.random() * (30 * cityAttributeInfo_wd.scale + 7 * cityAttributeInfo_wd.scale) - 7 * cityAttributeInfo_wd.scale),position.z),
                    color = cityAttributeInfo_wd.sky.colors[Math.floor(Math.random() * cityAttributeInfo_wd.sky.colors.length)],
                    type = 0,
                    scale = cityAttributeInfo_wd.sky.scales.default + (Math.random() - .5) / cityAttributeInfo_wd.sky.scales.denominator,
                    opacity = generateRandom_Ch(cityAttributeInfo_wd.sky.opacities.min, cityAttributeInfo_wd.sky.opacities.max)),
                    attributes.startPositions.push(position),
                    attributes.offsets.push(position),
                    attributes.scales.push(scale * cityAttributeInfo_wd.scale),
                    attributes.colors.push(color),
                    attributes.types.push(type),
                    attributes.lifetimes.push(0),
                    attributes.velocities.push(0),
                    attributes.opacities.push(opacity),
                    attributes.delays.push(0)
            }
    }

    cityUpdateable_yd = new Updateable({
        scene: cityGroup_vd,
        shaders: {
            customVertexShader: shaders_e.city_customLambertVertexShader,
            customFragmentShader: shaders_e.city_customLambertFragmentShader,
            noises: shaders_e.noises,
            cityBaseDisplacement: shaders_e.city_cityBaseDisplacement,
            cityFinalBehaviour: shaders_e.city_cityFinalBehaviour
        },
        instanceCount: attributes.startPositions.length,
        originalG: new PlaneBufferGeometry(1,1,1),
        receiveShadow: false,
        castShadow: false,
        fade: 0,
        attributes: {
            startPositions: attributes.startPositions,
            offsets: attributes.offsets,
            colors: attributes.colors,
            scales: attributes.scales,
            types: attributes.types,
            lifetimes: attributes.lifetimes,
            velocities: attributes.velocities,
            opacities: attributes.opacities,
            delays: attributes.delays
        },
        materials: {
            base: {
                material: new MeshLambertMaterial({
                    map: textures_t.particle,
                    combine: 0,
                    reflectivity: 0,
                    vertexColors: 2,
                    fog: true,
                    transparent: true,
                    alphaTest: .08
                })
            }
        }
    },(function() {
            1 == ++d && hideCity_Ad();
            onShaderCompile_E();
        }
    ));

    theWebGl.addUpdateable(cityUpdateable_yd);

    initCityAnimation();
    var d = 0
}

function initCityAnimation0() {
    // prepare camera curve splines

    // prepare first animation spline curve
    cityAnimationInfo_Td.cameraCurves.push(new CatmullRomCurve3([new Vector3(cityAnimationStartSetting.camera.originalPosition.x - 20,
                                                                             cityAnimationStartSetting.camera.originalPosition.y - 90,
                                                                             cityAnimationStartSetting.camera.originalPosition.z),
                                                                 new Vector3(cityAnimationStartSetting.camera.originalPosition.x - 20,
                                                                             cityAnimationStartSetting.camera.originalPosition.y + 15,
                                                                             cityAnimationStartSetting.camera.originalPosition.z)]));


    cityAnimationInfo_Td.cameraCurves.push(new CatmullRomCurve3([new Vector3(40, 0, 75), new Vector3(20, 0, 60)]));
    cityAnimationInfo_Td.cameraCurves.push(new CatmullRomCurve3([new Vector3(40, -5, 35), new Vector3(10, -5, 60), new Vector3(-38, 20, 50)]));

    for (let i = 0; i < cityAnimationInfo_Td.cameraCurves.length; i++) {
        cityAnimationInfo_Td.cameraSplines.push(new CameraAnimationCurveViewer_ep("cameraSpline" + i + 1, theWebGl, cityAnimationInfo_Td.cameraCurves[i], theWebGl.isDebug));
    }

    cityAnimationInfo_Td.cameraTweenOptions.push({
        origin: new Vector3(0, 0, 0),
        target: new Vector3(1, 0, 0),
        time: 5500,
        curve: TWEEN.Easing.Exponential.Out
    });

    cityAnimationInfo_Td.cameraTweenAnimations.push(new TWEEN.Tween(cityAnimationInfo_Td.cameraTweenOptions[0].origin)
        .to(cityAnimationInfo_Td.cameraTweenOptions[0].target, cityAnimationInfo_Td.cameraTweenOptions[0].time)
        .easing(cityAnimationInfo_Td.cameraTweenOptions[0].curve).onStart((() => {
                cityUpdateable_yd.materialShader.uniforms.uFade.value = 0;
                starSizeAnimationInfo_Md.tweens.animations[1].delay(1200);
                starSizeAnimationInfo_Md.tweens.animations[1].start();
                starSizeAnimationInfo_Md.tweens.animations[0].delay(3100);
                starSizeAnimationInfo_Md.tweens.animations[0].start();
            }
        )).onUpdate((() => {
                if(theWebGl.isDebug) {
                    console.log(`animation0 ${cityAnimationInfo_Td.cameraTweenOptions[0].origin.x}`);
                }

                cityUpdateable_yd.materialShader.uniforms.uFade.value = cityAnimationInfo_Td.cameraTweenOptions[0].origin.x;

                if(cameraControlEnabled)
                    return;

                let position = cityAnimationInfo_Td.cameraSplines[0].pointsArray.getPointAt(cityAnimationInfo_Td.cameraTweenOptions[0].origin.x);

                theWebGl.camera.position.copy(position);
                cityAnimationInfo_Td.cameraOrientation.forceSmoother = cityAnimationInfo_Td.cameraTweenOptions[0].origin.x;
                cityAnimationInfo_Td.cameraLookat = new Vector3(cityAnimationInfo_Td.cameraOrientation.force.x * cityAnimationInfo_Td.cameraOrientation.thresholds.part1,theWebGl.camera.position.y + cityAnimationInfo_Td.cameraOrientation.force.y * cityAnimationInfo_Td.cameraOrientation.thresholds.part1,0);
                theWebGl.camera.lookAt(cityAnimationInfo_Td.cameraLookat);
                !options_T.clickIsEnabled && cityAnimationInfo_Td.cameraTweenOptions[0].origin.x > 0.96 && (options_T.clickIsEnabled = true);
            }
        )));

    cityAnimationInfo_Td.cameraTweenOptions.push({
        origin: new Vector3(0, 0, 0),
        target: new Vector3(1, 0, 0),
        time: 6000,
        curve: TWEEN.Easing.Linear.None
    });

    cityAnimationInfo_Td.cameraTweenAnimations.push(new TWEEN.Tween(cityAnimationInfo_Td.cameraTweenOptions[1].origin).to(cityAnimationInfo_Td.cameraTweenOptions[1].target, cityAnimationInfo_Td.cameraTweenOptions[1].time).easing(cityAnimationInfo_Td.cameraTweenOptions[1].curve).onStart((function() {
            starSizeAnimationInfo_Md.tweens.animations[1].delay(200),
                starSizeAnimationInfo_Md.tweens.animations[1].start(),
                starSizeAnimationInfo_Md.tweens.animations[2].delay(2300),
                starSizeAnimationInfo_Md.tweens.animations[2].start()
        }
    )).onUpdate((function() {
            if(theWebGl.isDebug) {
                console.log(`animation1 ${cityAnimationInfo_Td.cameraTweenOptions[1].origin.x}`);
            }

            if(cameraControlEnabled)
                return;

            let position = cityAnimationInfo_Td.cameraSplines[1].pointsArray.getPointAt(cityAnimationInfo_Td.cameraTweenOptions[1].origin.x);

            theWebGl.camera.position.copy(position);
            cityAnimationInfo_Td.cameraLookat = new Vector3(cityAnimationInfo_Td.cameraOrientation.force.x * cityAnimationInfo_Td.cameraOrientation.thresholds.part2,cityAnimationInfo_Td.cameraOrientation.force.y * cityAnimationInfo_Td.cameraOrientation.thresholds.part2,0);
            theWebGl.camera.lookAt(cityAnimationInfo_Td.cameraLookat);
        }
    )));

    cityAnimationInfo_Td.cameraTweenOptions.push({
        origin: new Vector3(0,0,0),
        target: new Vector3(1,0,0),
        time: 17000,
        curve: TWEEN.Easing.Quadratic.Out
    });

    cityAnimationInfo_Td.cameraTweenAnimations.push(new TWEEN.Tween(cityAnimationInfo_Td.cameraTweenOptions[2].origin).to(cityAnimationInfo_Td.cameraTweenOptions[2].target, cityAnimationInfo_Td.cameraTweenOptions[2].time).easing(cityAnimationInfo_Td.cameraTweenOptions[2].curve).onStart((function() {
            starSizeAnimationInfo_Md.tweens.animations[0].delay(800);
            starSizeAnimationInfo_Md.tweens.animations[0].start();
            starSizeAnimationInfo_Md.tweens.animations[1].delay(4200);
            starSizeAnimationInfo_Md.tweens.animations[1].start();
            starSizeAnimationInfo_Md.tweens.animations[2].delay(9200);
            starSizeAnimationInfo_Md.tweens.animations[2].start();
        }
    )).onUpdate((function() {
            if(theWebGl.isDebug) {
                console.log(`animation2 ${cityAnimationInfo_Td.cameraTweenOptions[2].origin.x}`);
            }

            if(cameraControlEnabled)
                return;

            let position = cityAnimationInfo_Td.cameraSplines[2].pointsArray.getPointAt(cityAnimationInfo_Td.cameraTweenOptions[2].origin.x);

            theWebGl.camera.position.copy(position);
            cityAnimationInfo_Td.cameraLookat = new Vector3(20 * cityAnimationInfo_Td.cameraOrientation.force.x * cityAnimationInfo_Td.cameraOrientation.thresholds.part3,18 * cityAnimationInfo_Td.cameraOrientation.force.y * cityAnimationInfo_Td.cameraOrientation.thresholds.part3, 0);
            theWebGl.camera.lookAt(cityAnimationInfo_Td.cameraLookat);
        }
    )));

    cityAnimationInfo_Td.cameraOut.curve = new CatmullRomCurve3([new Vector3(0, 0, 0), new Vector3(0, 50, 0)]);
    cityAnimationInfo_Td.cameraOut.spline = new CameraAnimationCurveViewer_ep("spline", theWebGl, cityAnimationInfo_Td.cameraOut.curve, false);

    cityAnimationInfo_Td.cameraOut.tween = new TWEEN.Tween(cityAnimationInfo_Td.cameraOut.tweenOptions.origin)
        .to(cityAnimationInfo_Td.cameraOut.tweenOptions.target, cityAnimationInfo_Td.cameraOut.tweenOptions.time)
        .easing(cityAnimationInfo_Td.cameraOut.tweenOptions.curve).onStart((function() {
                cityAnimationInfo_Td.cameraOut.curve.points[0] = theWebGl.camera.position;
                cityAnimationInfo_Td.cameraOut.curve.points[1] = new Vector3(theWebGl.camera.position.x,cityAnimationStartSetting.camera.originalPosition.y + 150, theWebGl.camera.position.z);
                //animationCity_r.fadeStars("out", 300),
                options_T.clickIsEnabled = false;

                for (var e = 0; e < starSizeAnimationInfo_Md.tweens.animations.length; e++)
                    starSizeAnimationInfo_Md.tweens.animations[e]._isPlaying && starSizeAnimationInfo_Md.tweens.animations[e].pause()
            }
        )).onUpdate((function() {
                if(theWebGl.isDebug) {
                    console.log(`animation out ${cityAnimationInfo_Td.cameraOut.tweenOptions.origin.x}`);
                }

                cityUpdateable_yd.materialShader.uniforms.uFade.value = 1 - cityAnimationInfo_Td.cameraOut.tweenOptions.origin.x;

                if(cameraControlEnabled)
                    return;

                let position = cityAnimationInfo_Td.cameraOut.spline.pointsArray.getPointAt(cityAnimationInfo_Td.cameraOut.tweenOptions.origin.x);

                theWebGl.camera.position.copy(position);

                for (var i = 0; i < starGroup_bd.children.length; i++)
                    starGroup_bd.children[i].visible && (starGroup_bd.children[i].material.opacity -= 0.1)
            }
        ));
}

function initCityAnimation() {
    let points = [];

    points.push(new Vector3(30.288939, 1.315369, 38.455933));
    points.push(new Vector3(-25.951635, 0.986397, 45.497322));
    points.push(new Vector3(-22.442648, 0.000000, -33.514023));
    points.push(new Vector3(23.712709, 6.460009, -22.619038));
    points.push(new Vector3(20.672434, 4.311308, 24.861179));
    points.push(new Vector3(-40.652794, 3.556099, 28.041405));
    points.push(new Vector3(-12.436474, 38.795631, -60.310799));
    points.push(new Vector3(55.418732, 32.897736, -26.560944));
    points.push(new Vector3(31.826654, 0.000000, 38.137169));

    // revolves around

    cityAnimationInfo_Td.cameraCurves.push(new CatmullRomCurve3(points));

    for (let i = 0; i < cityAnimationInfo_Td.cameraCurves.length; i++) {
        cityAnimationInfo_Td.cameraSplines.push(new CameraAnimationCurveViewer_ep("cameraSpline" + i + 1, theWebGl, cityAnimationInfo_Td.cameraCurves[i], isDebug));
    }

    cityAnimationInfo_Td.cameraTweenOptions.push({
        origin: new Vector3(0, 0, 0),
        target: new Vector3(1, 0, 0),
        time: cityAnimationDuration,
        curve: TWEEN.Easing.Linear.None
    });

    cityAnimationInfo_Td.cameraTweenAnimations.push(new TWEEN.Tween(cityAnimationInfo_Td.cameraTweenOptions[0].origin)
        .to(cityAnimationInfo_Td.cameraTweenOptions[0].target, cityAnimationInfo_Td.cameraTweenOptions[0].time)
        .easing(cityAnimationInfo_Td.cameraTweenOptions[0].curve).onStart((() => {
                cityUpdateable_yd.materialShader.uniforms.uFade.value = 0;
                starSizeAnimationInfo_Md.tweens.animations[1].delay(1200);
                starSizeAnimationInfo_Md.tweens.animations[1].start();
                starSizeAnimationInfo_Md.tweens.animations[0].delay(3100);
                starSizeAnimationInfo_Md.tweens.animations[0].start();
            }
        )).onUpdate((() => {
                if(theWebGl.isDebug) {
                    console.log(`animation0 ${cityAnimationInfo_Td.cameraTweenOptions[0].origin.x}`);
                }

                cityUpdateable_yd.materialShader.uniforms.uFade.value = cityAnimationInfo_Td.cameraTweenOptions[0].origin.x;

                if(cameraControlEnabled)
                    return;

                let position = cityAnimationInfo_Td.cameraSplines[0].pointsArray.getPointAt(cityAnimationInfo_Td.cameraTweenOptions[0].origin.x);

                theWebGl.camera.position.copy(position);
                cityAnimationInfo_Td.cameraOrientation.forceSmoother = cityAnimationInfo_Td.cameraTweenOptions[0].origin.x;

                /*
                cityAnimationInfo_Td.cameraLookat = new Vector3(cityAnimationInfo_Td.cameraOrientation.force.x * cityAnimationInfo_Td.cameraOrientation.thresholds.part1,
                                                                theWebGl.camera.position.y + cityAnimationInfo_Td.cameraOrientation.force.y * cityAnimationInfo_Td.cameraOrientation.thresholds.part1,
                                                                0);
                 */

                cityAnimationInfo_Td.cameraLookat = new Vector3(0, 0, 0);
                theWebGl.camera.lookAt(cityAnimationInfo_Td.cameraLookat);
                !options_T.clickIsEnabled && cityAnimationInfo_Td.cameraTweenOptions[0].origin.x > 0.96 && (options_T.clickIsEnabled = true);
            }
        )));

    cityAnimationInfo_Td.cameraOut.curve = new CatmullRomCurve3([new Vector3(0, 0, 0), new Vector3(0, 50, 0)]);
    cityAnimationInfo_Td.cameraOut.spline = new CameraAnimationCurveViewer_ep("spline", theWebGl, cityAnimationInfo_Td.cameraOut.curve, false);

    cityAnimationInfo_Td.cameraOut.tween = new TWEEN.Tween(cityAnimationInfo_Td.cameraOut.tweenOptions.origin)
        .to(cityAnimationInfo_Td.cameraOut.tweenOptions.target, cityAnimationInfo_Td.cameraOut.tweenOptions.time)
        .easing(cityAnimationInfo_Td.cameraOut.tweenOptions.curve).onStart((function() {
                cityAnimationInfo_Td.cameraOut.curve.points[0] = theWebGl.camera.position;
                cityAnimationInfo_Td.cameraOut.curve.points[1] = new Vector3(theWebGl.camera.position.x,cityAnimationStartSetting.camera.originalPosition.y + 150, theWebGl.camera.position.z);
                //animationCity_r.fadeStars("out", 300),
                options_T.clickIsEnabled = false;

                for (var e = 0; e < starSizeAnimationInfo_Md.tweens.animations.length; e++)
                    starSizeAnimationInfo_Md.tweens.animations[e]._isPlaying && starSizeAnimationInfo_Md.tweens.animations[e].pause()
            }
        )).onUpdate((function() {
                if(theWebGl.isDebug) {
                    console.log(`animation out ${cityAnimationInfo_Td.cameraOut.tweenOptions.origin.x}`);
                }

                cityUpdateable_yd.materialShader.uniforms.uFade.value = 1 - cityAnimationInfo_Td.cameraOut.tweenOptions.origin.x;

                if(cameraControlEnabled)
                    return;

                let position = cityAnimationInfo_Td.cameraOut.spline.pointsArray.getPointAt(cityAnimationInfo_Td.cameraOut.tweenOptions.origin.x);

                theWebGl.camera.position.copy(position);

                for (var i = 0; i < starGroup_bd.children.length; i++)
                    starGroup_bd.children[i].visible && (starGroup_bd.children[i].material.opacity -= 0.1)
            }
        ));
}

function loadFont() {
    var loader = new FontLoader();

    loader.load( 'resource/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( response ) {

        font = response;

        createText();

    } );
}

function createText() {
    textGeo = new TextGeometry( text, {
        font: font,
        size: size,
        height: height,
        curveSegments: curveSegments,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: bevelEnabled
    } );

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    var centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

    textGeo = new BufferGeometry().fromGeometry( textGeo );

    var materials = [
        new MeshPhongMaterial( { color: 0xff0000, flatShading: false, wireframe : false } ), // front
        new MeshPhongMaterial( { color: 0x0000ff } ) // side
    ];

    var textMesh1 = new Mesh( textGeo, materials );

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = textYUpPosition;
    textMesh1.position.z = 0;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    theWebGl.scene.add( textMesh1 );
}