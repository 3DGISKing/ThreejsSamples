import * as THREE from './js/three/build/three.module.js';
import { EffectComposer } from './js/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './js/three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './js/three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from './js/three/examples/jsm/postprocessing/ShaderPass.js';
import { OrbitControls } from './js/three/examples/jsm/controls/OrbitControls.js';
import Stats from './js/three/examples/jsm/libs/stats.module.js';

var vignetteShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        offset: {
            value: 1
        },
        darkness: {
            value: 1
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "\tvUv = uv;", "\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform float offset;", "uniform float darkness;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "\tvec4 texel = texture2D( tDiffuse, vUv );", "\tvec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );", "\tgl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );", "}"].join("\n")
};

window.WebGL = (function () {
    const Vector3 = THREE.Vector3;
    const Vector2 = THREE.Vector2;

    function WebGL(options) {
        this.container = options.container,
            this.sceneOptions = options.sceneOptions,
            this.cameraOptions = options.cameraOptions,
            this.bloom = options.bloom,
            this.vignette = options.vignette,
            this.ambientLight = options.ambientLight,
            this.hasTween = options.hasTween,
            this.isDebug = options.isDebug,
            this.updatables = [],
            this.pickingId,
            this.params = {
                exposure: this.bloom.exposure,
                bloomStrength: this.bloom.bloomStrength,
                bloomThreshold: this.bloom.bloomThreshold,
                bloomRadius: this.bloom.bloomRadius,
                vignetteDarkness: this.vignette.vignetteDarkness,
                vignetteOffset: this.vignette.vignetteOffset,
                bgmVolume: 1
            },
            this.tweenParamsOptions = {
                origin: new Vector3(0,0,0),
                target: new Vector3(1,0,0),
                time: 1300,
                curve: TWEEN.Easing.Linear.None
            },
            this.tweenParams = new TWEEN.Tween(this.tweenParamsOptions.origin).to(this.tweenParamsOptions.target, this.tweenParamsOptions.time).easing(this.tweenParamsOptions.curve);

        this.useEffectComposer = options.useEffectComposer;
        this.init();
        this.render();
    }

    WebGL.prototype.init = function () {
        if (this.isDebug && (console.log("scene initialization..."),
            this.datGUI()),
        null == this.container && (this.container = document.createElement("div"),
            document.body.appendChild(this.container)),
            this.renderer = new THREE.WebGLRenderer({
                antialias: true
            }),
            this.renderer.setPixelRatio(window.devicePixelRatio),
            this.renderer.setSize(window.innerWidth, window.innerHeight),
            this.renderer.shadowMap.enabled = true,
            this.container.appendChild(this.renderer.domElement),
            this.scene = new THREE.Scene,
        null != this.sceneOptions.backgroundColor && (this.scene.background = new THREE.Color(this.sceneOptions.backgroundColor)),
            this.scene.fog = new THREE.FogExp2(0,0),
            this.pickingScene = new THREE.Scene,
            this.camera = new THREE.PerspectiveCamera(this.cameraOptions.fov,window.innerWidth / window.innerHeight,this.cameraOptions.near,this.cameraOptions.far),
            this.camera.position.set(this.cameraOptions.x, this.cameraOptions.y, this.cameraOptions.z),
        window.innerWidth < 1200 && (this.camera.zoom = this.camera.aspect),
        null != this.ambientLight) {
            var e = new THREE.AmbientLight(this.ambientLight.color,this.ambientLight.intensity);
            this.scene.add(e),
                this.ambientLight = e
        }

        this.pickingRenderTarget = new THREE.WebGLRenderTarget(1, 1);
        this.pickingRenderTarget.texture.generateMipmaps = false;
        this.pickingRenderTarget.texture.minFilter = 1003;

        let renderPass = new RenderPass(this.scene, this.camera);

        if(this.useEffectComposer) {
            this.composer = new EffectComposer(this.renderer);
            this.composer.addPass(renderPass);
        }

        this.bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight),1.5,0.4,0.85);

        this.bloomPass.threshold = this.params.bloomThreshold;
        this.bloomPass.strength = this.params.bloomStrength;
        this.bloomPass.radius = this.params.bloomRadius;

        if(this.useEffectComposer)
            this.composer.addPass(this.bloomPass);

        this.vignetteShader = new ShaderPass(vignetteShader);

        this.vignetteShader.uniforms.darkness.value = this.params.vignetteDarkness;
        this.vignetteShader.uniforms.offset.value = this.params.vignetteOffset;

        if(this.useEffectComposer)
            this.composer.addPass(this.vignetteShader);

        this.mouse = new Vector2;
        this.client = new Vector2;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.target.set(0, 0, 0);

        window.addEventListener("resize", this.onWindowResize.bind(this), false);
        window.addEventListener("mousemove", this.onMouseMove.bind(this), false);

        this.isDebug && (this.stats = new Stats(),
            this.container.appendChild(this.stats.dom));

        if(this.isDebug) {
            let axesHelper = new THREE.AxesHelper( 100 );
            this.scene.add( axesHelper );

            let gridHelper = new THREE.GridHelper( 100, 100 );
            this.scene.add( gridHelper );
        }
    };

    WebGL.prototype.pick = function () {
        this.camera.setViewOffset(this.renderer.domElement.width, this.renderer.domElement.height, this.client.x * window.devicePixelRatio | 0, this.client.y * window.devicePixelRatio | 0, 1, 1),
            this.renderer.setRenderTarget(this.pickingRenderTarget),
            this.renderer.render(this.pickingScene, this.camera),
            this.camera.clearViewOffset();
        var e = new Uint8Array(4);
        this.renderer.readRenderTargetPixels(this.pickingRenderTarget, 0, 0, 1, 1, e),
            this.pickingId = e[0] << 16 | e[1] << 8 | e[2],
            this.renderer.setRenderTarget(null)
    };

    WebGL.prototype.addUpdateable = function(e) {
        this.updatables.push(e)
    };

    WebGL.prototype.render = function (timeStamp) {
        requestAnimationFrame(this.render.bind(this));
        this.pick();

        if(this.useEffectComposer)
            this.composer.render();
        else
            this.renderer.render(this.scene, this.camera );

        var t = true
            , n = false
            , r = undefined;

        try {
            for (var i, o = this.updatables[Symbol.iterator](); !(t = (i = o.next()).done); t = true) {
                i.value.update(timeStamp)
            }
        } catch (e) {
            n = true,
                r = e
        } finally {
            try {
                t || null == o.return || o.return()
            } finally {
                if (n)
                    throw r
            }
        }

        this.hasTween && TWEEN.update(timeStamp);
        this.isDebug && this.stats.update();
        this.controls.enabled && this.controls.update();
    };

    WebGL.prototype.datGUI = function () {
        var self = this
            , gui = new dat.GUI({
            autoPlace: false
        });

        document.getElementById("webgl-gui-container").appendChild(gui.domElement);

        var n = gui.addFolder("Bloom Pass");
        n.add(this.params, "exposure", .1, 2).onChange((function(t) {
                self.renderer.toneMappingExposure = Math.pow(t, 4)
            }
        )),
            n.add(this.params, "bloomThreshold", 0, 1).onChange((function(t) {
                    self.bloomPass.threshold = Number(t)
                }
            )),
            n.add(this.params, "bloomStrength", 0, 3).onChange((function(t) {
                    self.bloomPass.strength = Number(t)
                }
            )),
            n.add(this.params, "bloomRadius", 0, 1).step(.01).onChange((function(t) {
                    self.bloomPass.radius = Number(t)
                }
            ));
        var r = gui.addFolder("Vignette Shader");
        r.add(this.params, "vignetteDarkness", 0, 3).onChange((function(t) {
                self.vignetteShader.uniforms.darkness.value = Number(t)
            }
        )),
            r.add(this.params, "vignetteOffset", 0, 3).onChange((function(t) {
                    self.vignetteShader.uniforms.offset.value = Number(t)
                }
            ))
    };

    WebGL.prototype.onWindowResize = function () {
        var w = window.innerWidth , h = window.innerHeight;
        this.camera.aspect = w / h;

        if(w < 1200)
         this.camera.zoom = this.camera.aspect;

        this.camera.updateProjectionMatrix();

        if(this.composer)
            this.composer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    WebGL.prototype.onMouseMove = function (e) {
        this.mouse.x = e.clientX / window.innerWidth * 2 - 1,
            this.mouse.y = -e.clientY / window.innerHeight * 2 + 1,
            this.client.x = e.clientX,
            this.client.y = e.clientY
    };

    WebGL.prototype.updateSettings = function (animationStartSetting) {
        var scenePosition, fov, ambientIntensity, bloomPassThreshold, bloomPassStrength, bloomPassRadius, vignetteDarkness, vignetteOffset, self = this;

        null != animationStartSetting.scene && (null != animationStartSetting.scene.position ? scenePosition = animationStartSetting.scene.position : this.scene.position.x != new Vector3(0,0,0) && (scenePosition = new Vector3(0,0,0)),
        null != animationStartSetting.scene.fog && (null != animationStartSetting.scene.fog.color && (this.scene.fog.color = animationStartSetting.scene.fog.color),
        null != animationStartSetting.scene.fog.color && (this.scene.fog.density = animationStartSetting.scene.fog.density))),
        null != animationStartSetting.camera && (null != animationStartSetting.camera.fov && (fov = 0 == this.camera.fov ? 1e-4 : this.camera.fov),
        null != animationStartSetting.camera.originalPosition && this.camera.position.copy(animationStartSetting.camera.originalPosition),
        null != animationStartSetting.camera.lookatPosition && this.camera.lookAt(animationStartSetting.camera.lookatPosition),
            this.camera.updateProjectionMatrix()),
        null != animationStartSetting.lights && null != animationStartSetting.lights.ambient && (null != animationStartSetting.lights.ambient.color && (this.ambientLight.color = animationStartSetting.lights.ambient.color),
        null != animationStartSetting.lights.ambient.intensity && (ambientIntensity = 0 == animationStartSetting.lights.ambient.intensity ? 1e-4 : animationStartSetting.lights.ambient.intensity)),
        null != animationStartSetting.controls && (null != animationStartSetting.controls.enabled && (this.controls.enabled = animationStartSetting.controls.enabled),
        null != animationStartSetting.controls.target && (this.controls.target = animationStartSetting.controls.target),
        null != animationStartSetting.controls.minDistance && (this.controls.minDistance = animationStartSetting.controls.minDistance),
        null != animationStartSetting.controls.maxDistance && (this.controls.maxDistance = animationStartSetting.controls.maxDistance),
        null != animationStartSetting.controls.minPolarAngle && (this.controls.minPolarAngle = animationStartSetting.controls.minPolarAngle),
        null != animationStartSetting.controls.maxPolarAngle && (this.controls.maxPolarAngle = animationStartSetting.controls.maxPolarAngle)),
        null != animationStartSetting.postprocessing && (null != animationStartSetting.postprocessing.bloomPass && (null != animationStartSetting.postprocessing.bloomPass.threshold && (bloomPassThreshold = 0 == this.bloomPass.threshold ? 1e-4 : this.bloomPass.threshold),
        null != animationStartSetting.postprocessing.bloomPass.strength && (bloomPassStrength = 0 == this.bloomPass.strength ? 1e-4 : this.bloomPass.strength),
        null != animationStartSetting.postprocessing.bloomPass.radius && (bloomPassRadius = 0 == this.bloomPass.radius ? 1e-4 : this.bloomPass.radius)),
        null != animationStartSetting.postprocessing.vignetteShader && (null != animationStartSetting.postprocessing.vignetteShader.darkness && (vignetteDarkness = 0 == this.vignetteShader.uniforms.darkness.value ? 1e-4 : this.vignetteShader.uniforms.darkness.value),
        null != animationStartSetting.postprocessing.vignetteShader.offset && (vignetteOffset = 0 == this.vignetteShader.uniforms.offset.value ? 1e-4 : this.vignetteShader.uniforms.offset.value))),
            this.tweenParams.onUpdate((function() {
                    if (scenePosition) {
                        var u = new Vector3(0,0,0);

                        animationStartSetting.scene.position && (u = animationStartSetting.scene.position),
                            self.scene.position.set(scenePosition.x + (u.x - scenePosition.x) * self.tweenParamsOptions.origin.x, scenePosition.y + (u.y - scenePosition.y) * self.tweenParamsOptions.origin.x, scenePosition.z + (u.z - scenePosition.z) * self.tweenParamsOptions.origin.x)
                    }

                    fov && (self.camera.fov = fov + (animationStartSetting.camera.fov - fov) * self.tweenParamsOptions.origin.x,
                        self.camera.updateProjectionMatrix()),
                    ambientIntensity && (self.ambientLight.intensity = ambientIntensity + (animationStartSetting.lights.ambient.intensity - ambientIntensity) * self.tweenParamsOptions.origin.x),
                    bloomPassThreshold && (self.bloomPass.threshold = bloomPassThreshold + (animationStartSetting.postprocessing.bloomPass.threshold - bloomPassThreshold) * self.tweenParamsOptions.origin.x),
                    bloomPassStrength && (self.bloomPass.strength = bloomPassStrength + (animationStartSetting.postprocessing.bloomPass.strength - bloomPassStrength) * self.tweenParamsOptions.origin.x),
                    bloomPassRadius && (self.bloomPass.radius = bloomPassRadius + (animationStartSetting.postprocessing.bloomPass.radius - bloomPassRadius) * self.tweenParamsOptions.origin.x),
                    vignetteDarkness && (self.vignetteShader.uniforms.darkness.value = vignetteDarkness + (animationStartSetting.postprocessing.vignetteShader.darkness - vignetteDarkness) * self.tweenParamsOptions.origin.x),
                    vignetteOffset && (self.vignetteShader.uniforms.offset.value = vignetteOffset + (animationStartSetting.postprocessing.vignetteShader.offset - vignetteOffset) * self.tweenParamsOptions.origin.x)
                }
            )),
            this.tweenParams.start();
    };

    return WebGL;
})();

