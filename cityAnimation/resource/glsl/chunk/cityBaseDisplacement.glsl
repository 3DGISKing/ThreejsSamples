//floor group behaviour
if(instanceType == 10.0){
  transformed.y += snoise(vec3(instanceOffset.x,0,instanceOffset.z) * (timeElapsed + 400.0) * 0.01) * 0.7;
}

//new tranformed position
vec3 morphed = vec3( 0.0 , 0.0 , 0.0 );
morphed += (instanceOffset - instanceStartPosition) * uMorphing ;
morphed += transformed + instanceStartPosition;
transformed = morphed;
