import {InstancedBufferGeometry, Vector2, Vector3, Mesh, InstancedBufferAttribute} from '../lib/three.js-r123/build/three.module.js';

window.Updateable = (function () {
    function Updateable(webgl, onShaderCompile) {
      this.scene = webgl.scene,
          this.shaders = webgl.shaders,
          this.receiveShadow = webgl.receiveShadow,
          this.castShadow = webgl.castShadow,
          this.instanceCount = webgl.instanceCount,
          this.originalG = webgl.originalG,
          this.attributes = webgl.attributes,
          this.materials = webgl.materials,
          this.morphing = webgl.morphing,
          this.fade = webgl.fade,
          this.onShaderCompile = onShaderCompile,
          this.init()
    }

    Updateable.prototype.init = function () {
      var self = this;

      this.instanceG = new InstancedBufferGeometry,
          this.instanceG.maxInstancedCount = this.instanceCount,
          this.instanceG.index = this.originalG.index,
          this.instanceG.attributes = this.originalG.attributes;

      for (var t = {
        startPositions: [],
        offsets: [],
        colors: [],
        scales: [],
        types: [],
        lifetimes: [],
        velocities: [],
        opacities: [],
        delays: []
      }, n = 0; n < this.instanceCount; n++)
        null != this.attributes.startPositions && t.startPositions.push(this.attributes.startPositions[n].x, this.attributes.startPositions[n].y, this.attributes.startPositions[n].z),
        null != this.attributes.offsets && t.offsets.push(this.attributes.offsets[n].x, this.attributes.offsets[n].y, this.attributes.offsets[n].z),
        null != this.attributes.colors && t.colors.push(this.attributes.colors[n].r, this.attributes.colors[n].g, this.attributes.colors[n].b),
        null != this.attributes.scales && t.scales.push(this.attributes.scales[n]),
        null != this.attributes.types && t.types.push(this.attributes.types[n]),
        null != this.attributes.lifetimes && t.lifetimes.push(this.attributes.lifetimes[n]),
        null != this.attributes.velocities && t.velocities.push(this.attributes.velocities[n]),
        null != this.attributes.opacities && t.opacities.push(this.attributes.opacities[n]),
        null != this.attributes.delays && t.delays.push(this.attributes.delays[n]);
      null != this.morphing ? (this.originalG.morphAttributes = this.morphing.geometries,
          this.instanceG.addAttribute("instanceStartPosition", this.originalG.morphAttributes[this.morphing.index.start]),
          this.instanceG.addAttribute("instanceOffset", this.originalG.morphAttributes[this.morphing.index.end])) : (this.instanceG.addAttribute("instanceStartPosition", new InstancedBufferAttribute(new Float32Array(t.startPositions),3)),
          this.instanceG.addAttribute("instanceOffset", new InstancedBufferAttribute(new Float32Array(t.offsets),3))),
      null != this.attributes.colors && this.instanceG.addAttribute("instanceColor", new InstancedBufferAttribute(new Float32Array(t.colors),3)),
      null != this.attributes.scales && this.instanceG.addAttribute("instanceScale", new InstancedBufferAttribute(new Float32Array(t.scales),1)),
      null != this.attributes.types && this.instanceG.addAttribute("instanceType", new InstancedBufferAttribute(new Float32Array(t.types),1)),
      null != this.attributes.lifetimes && this.instanceG.addAttribute("instanceLifetime", new InstancedBufferAttribute(new Float32Array(t.lifetimes),1)),
      null != this.attributes.velocities && this.instanceG.addAttribute("instanceVelocity", new InstancedBufferAttribute(new Float32Array(t.velocities),1)),
      null != this.attributes.opacities && this.instanceG.addAttribute("instanceOpacity", new InstancedBufferAttribute(new Float32Array(t.opacities),1)),
      null != this.attributes.delays && this.instanceG.addAttribute("instanceDelay", new InstancedBufferAttribute(new Float32Array(t.delays),1)),
          this.materials.base.material.onBeforeCompile = function(shader) {
            shader.vertexShader = self.shaderParse(self.shaders.customVertexShader),
                shader.fragmentShader = self.shaderParse(self.shaders.customFragmentShader),
                shader.uniforms.uTime = {
                  value: 0
                },
                shader.uniforms.uTimeElapsed = {
                  value: 0
                },
                shader.uniforms.uMouse = {
                  value: 0
                },
                shader.uniforms.uColorType = {
                  value: 0
                },
                shader.uniforms.uMousePos = {
                  value: new Vector2(0,0)
                },
                shader.uniforms.uRaycastPos = {
                  value: new Vector3(0,0,0)
                },
                shader.uniforms.uMorphing = {
                  value: 0
                },
            null != self.fade && (shader.uniforms.uFade = {
              value: self.fade
            }),
                self.materialShader = shader,
            null != self.onShaderCompile && self.onShaderCompile()
          }
          ,
      null != this.materials.depth && (this.materials.depth.material.onBeforeCompile = function(shader) {
        shader.vertexShader = self.shaderParse(self.shaders.customDepthVertexShader),
            shader.uniforms.uTime = {
              value: 0
            },
            shader.uniforms.uTimeElapsed = {
              value: 0
            },
            shader.uniforms.uMouse = {
              value: 0
            },
            shader.uniforms.uColorType = {
              value: 0
            },
            shader.uniforms.uMousePos = {
              value: new Vector2(0,0)
            },
            shader.uniforms.uRaycastPos = {
              value: new Vector3(0,0,0)
            },
            shader.uniforms.uMorphing = {
              value: 0
            },
        null != self.fade && (shader.uniforms.uFade = {
          value: self.fade
        }),
            self.depthMaterialShader = shader
      }
          ,
          this.materials.depth.material.depthPacking = 3201),
          this.mesh = new Mesh(this.instanceG,this.materials.base.material),
      null != this.materials.depth && (this.mesh.customDepthMaterial = this.materials.depth.material),
          this.mesh.castShadow = undefined !== this.castShadow && this.castShadow,
          this.mesh.receiveShadow = undefined !== this.receiveShadow && this.receiveShadow,
          this.mesh.frustumCulled = false,
          this.scene.add(this.mesh)

    };

    Updateable.prototype.update = function (e) {
      this.time = e / 1e3,
      this.materialShader && (this.materialShader.uniforms.uTime.value = this.time),
      this.depthMaterialShader && (this.depthMaterialShader.uniforms.uTime.value = this.time)
    };

    Updateable.prototype.mouseMove = function (e ,t) {
      this.materialShader && (this.materialShader.uniforms.uMousePos.value = e),
      this.depthMaterialShader && (this.depthMaterialShader.uniforms.uMousePos.value = e)
    };

    Updateable.prototype.updateMorphing = function (e, t) {
      this.originalG.attributes.instanceStartPosition = this.originalG.morphAttributes[e],
          this.originalG.attributes.instanceOffset = this.originalG.morphAttributes[t]
    };

    Updateable.prototype.shaderParse = function (e) {
        return e = (e = e.replace(/\/\/\s?custom_chunk\(\s?(\w+)\s?\);/g, this.replaceCustomChunk.bind(this))).replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, this.replaceThreeChunkFn.bind(this))
    };

    Updateable.prototype.replaceThreeChunkFn = function (e,t) {
        return mn[t] + "\n"
    };

    Updateable.prototype.replaceCustomChunk = function (e, t) {
        return this.shaders[t] + "\n"
    };

    return Updateable;
})();