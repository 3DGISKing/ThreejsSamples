http://kr.ncsoft.com/en/index.do

https://github.com/3DGISKing/ThreeJsCityAnimation

# variable explanation

isDebug : if this is true, axis, and gird plane will be shown
useEffectComposer : if this is false, no postprocessing will be applied.
cameraControlEnabled : if this is true, animation will be not done, you will be able to control scene by mouse
cityAnimationDuration, totalAnimationDuration : you can control total animation time

# How to make custom animation 

go to function initCityAnimation

make points variable with your custom data.
Maybe you can export curve to obj file in blender and read it.

# how to change text color
go to function createText and find this code. 
then you can change color of 3d text.

var materials = [
    new MeshPhongMaterial( { color: 0xff0000, flatShading: false, wireframe : false } ), // front
    new MeshPhongMaterial( { color: 0x0000ff } ) // side
];

If any help is needed, please let me know. skype 3DGISKing 



 
 
