let ballGeometry;
let ballMesh;
let ballMaterial;
let ballTexture;

let yawCurrent = 0;
let rollCurrent = 0;
let pitchCurrent = 0;

const ballRadius = 5;

ballGeometry = new THREE.SphereBufferGeometry( ballRadius, 60, 40 ).toNonIndexed();
ballGeometry.scale( -1, 1, 1 );

ballGeometry.computeFaceNormals(); // needed for helper

// Remap UVs

let normals = ballGeometry.attributes.normal.array;
let uvs = ballGeometry.attributes.uv.array;

for ( let i = 0, l = normals.length / 3; i < l; i ++ ) {
    let x = normals[ i * 3 + 0 ];
    let y = normals[ i * 3 + 1 ];
    let z = normals[ i * 3 + 2 ];

    // radius center
    let correction = ( x == 0 && z == 0 ) ? 1 : ( Math.acos( y ) / Math.sqrt( x * x + z * z ) ) * ( 2 / ((BALL_selectedcamera.jsonsettings.vfov * Math.PI) / 180) );

    uvs[ i * 2 + 0 ] = x * ( (BALLcanvas.height/2) / BALLcanvas.width ) * correction + ( (BALLcanvas.width/2) / BALLcanvas.width );
    uvs[ i * 2 + 1 ] = z * ( (BALLcanvas.height/2) / BALLcanvas.height ) * correction + ( (BALLcanvas.height/2) / BALLcanvas.height );
}

if (BALL_selectedcamera.cameraattitude == 0) //down
{
    //ballGeometry.rotateZ(  Math.PI - Cesium.Math.toRadians(BALL_selectedcamera.jsonsettings.t)); // tilt
    //ballGeometry.rotateX( Cesium.Math.toRadians(BALL_selectedcamera.jsonsettings.r)); // roll

    ballGeometry.rotateZ(  Math.PI - Cesium.Math.toRadians(0)); // tilt
    ballGeometry.rotateX( Cesium.Math.toRadians(0)); // roll

    tzmax = BALL_selectedcamera.jsonsettings.tzmax;
    tzmin = BALL_selectedcamera.jsonsettings.tzmin;
    tmax = BALL_selectedcamera.jsonsettings.tmax;
}
else
{
    //ballGeometry.rotateZ( Cesium.Math.toRadians(BALL_selectedcamera.jsonsettings.t)); // tilt
    //ballGeometry.rotateX( - Cesium.Math.toRadians(BALL_selectedcamera.jsonsettings.r)); // roll

    ballGeometry.rotateZ( Cesium.Math.toRadians(0)); // tilt
    ballGeometry.rotateX( - Cesium.Math.toRadians(0)); // roll

    tzmax = -BALL_selectedcamera.jsonsettings.tzmin;
    tzmin = -BALL_selectedcamera.jsonsettings.tzmax;
    tmax = -BALL_selectedcamera.jsonsettings.tmax;
}

//ballGeometry.rotateY(  (Math.PI/2) - Cesium.Math.toRadians(BALL_selectedcamera.jsonsettings.p)); //pan
ballGeometry.rotateY(  (Math.PI/2) - Cesium.Math.toRadians(0)); //pan

yawCurrent =0;
rollCurrent =0;
pitchCurrent =0;

ballGeometry.translate( 0, BALLcenter, 0 );
ballGeometry.verticesNeedUpdate = true;

BALLcamera.fov = BALLMaxFOV;

BALLlat = BALL_selectedcamera.jsonsettings.tzmin;

ballTexture = new THREE.Texture(BALLcanvas);

ballTexture.needsUpdate = true;
ballMaterial = new THREE.MeshBasicMaterial( { map: ballTexture } );
ballMesh = new THREE.Mesh( ballGeometry, ballMaterial );

BALLscene.add( ballMesh );
