uniform float uTime;
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

#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <color_pars_vertex>


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

  //position instanced
  transformed = instanceStartPosition;

  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>

  // scale and time
  float scale = instanceScale * 30.0;
  float timeScale = uTime * 1.2;
  vec3 trTime = vec3(transformed.x + timeScale, transformed.y + timeScale, transformed.z + timeScale) ;
  scale =  ( sin(trTime.x ) + sin(trTime.y ) + sin(trTime.z )  + 3.8) * instanceScale * 3.8;


  //final position
  mvPosition.xyz += position * scale ;
  gl_Position = projectionMatrix * mvPosition;

}
