#define LAMBERT
// instanced
uniform float uTime;
uniform float uTimeElapsed;
uniform float uMorphing;
uniform float uFade;

attribute vec3 instanceStartPosition;
attribute vec3 instanceOffset;
attribute vec3 instanceColor;
attribute float instanceScale;
attribute float instanceType;
attribute float instanceLifetime;
attribute float instanceVelocity;
attribute float instanceOpacity;
attribute float instanceDelay;

varying float vTime;
varying float vOpacity;
varying float vFade;

varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
  varying vec3 vLightBack;
  varying vec3 vIndirectBack;
#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// custom_chunk(noises);

void main() {
  #include <uv_vertex>
  #include <uv2_vertex>
  #include <color_vertex>
  // vertex colors instanced
  #ifdef USE_COLOR
    vColor.xyz = instanceColor.xyz;
  #endif
  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <begin_vertex>

  vTime = uTime;
  vOpacity = instanceOpacity;
  vFade = uFade;

  float timeElapsed = uTime;
  if(uTimeElapsed != 0.0){
    timeElapsed = uTime - uTimeElapsed;
  }


  //position instanced
  transformed *= instanceScale;

  // custom_chunk(cityBaseDisplacement);

  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>

  // custom_chunk(cityFinalBehaviour);

  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <worldpos_vertex>
  #include <envmap_vertex>
  #include <lights_lambert_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>


}
