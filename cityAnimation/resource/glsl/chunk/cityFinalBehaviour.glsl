
// scale and time
float scale;
vec3 trTime = vec3(transformed.x + timeElapsed, transformed.y + timeElapsed, transformed.z + timeElapsed) ;

//buildings group behaviour
if(instanceType == 0.0){
  scale =  (sin(trTime.x * 2.55) + sin(trTime.y * 1.8) + sin(trTime.z * 3.9)  + 3.0) * instanceScale * 4.0;
}
//floor group behaviour
else if(instanceType == 10.0){
  scale =  (sin(trTime.x * 2.55) + sin(trTime.y * 1.8) + sin(trTime.z * 3.9) + 3.0) / 20.0;
}

//final position
mvPosition.xyz += position * scale;
gl_Position = projectionMatrix * mvPosition;
