# How to use
    let geometry = new THREE.SphereGeometry( sceneBoundingRadius / 10, 32, 32 );
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    let sphere = new THREE.Mesh( geometry, material );
  
    const timelineWidget = new Timeliner();
    
    timelineWidget.setTargetThreeJsObject(sphere);
  
    timelineWidget.addThreeJsObjectKeyingLayer(ThreeJsObjectKeyingSet.PositionX);
  
    timelineWidget.addThreejsObjectKeyFrame(ThreeJsObjectKeyingSet.PositionX, {
        "time": 0,
        "value": -sceneBoundingRadius,
        "_color": "#893c0f",
        "tween": "quadEaseIn"
    });
  
    timelineWidget.addThreejsObjectKeyFrame(ThreeJsObjectKeyingSet.PositionX, {
        "time": 3,
        "value": 0,
        "_color": "#b074a0",
        "tween": "quadEaseIn"
    });
    
    // for last frame no need tween and color
    timelineWidget.addThreejsObjectKeyFrame(ThreeJsObjectKeyingSet.PositionX, {
        "time": 6,
        "value": sceneBoundingRadius,
    });
  
  
    
 
 
 