uniform vec3 diffuse;
uniform float opacity;

varying float vOpacity;
varying float vFade;

#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>

void main() {

  vec4 diffuseColor = vec4(diffuse, opacity * vOpacity * vFade);

  #include <map_fragment>

  gl_FragColor = diffuseColor;

}
