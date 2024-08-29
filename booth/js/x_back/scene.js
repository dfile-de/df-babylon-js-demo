var scene,camera;
function initScene (){

    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.5, 0.5, 0.5, 0.8);

    scene.imageProcessingConfiguration.contrast = 1.2//1.6;
    scene.imageProcessingConfiguration.exposure = 0.6//0.6;
    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    


    camera = new BABYLON.ArcRotateCamera("Cam_config", 0, 0, 0, new BABYLON.Vector3(0,0,0), scene);
    camera.setPosition(new BABYLON.Vector3(3,1,5));
    camera.fov=0.5;
    //camera.upperBetaLimit=1.8;Math.PI*(90)/180;
    camera.upperRadiusLimit=25;
    camera.lowerRadiusLimit=3;
    camera.wheelPrecision = 20;
    camera.allowUpsideDown = true;
    scene.activeCamera=camera;
    scene.activeCamera.attachControl(canvas);

   

    
     // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 5;
    
    
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("img/environment.dds", scene);
    hdrTexture.gammaSpace = false;

    var loader = BABYLON.SceneLoader.Append("gltf/ho/", "ho_drone.gltf", scene, function () {
        
        

        
        
        
        scene.createDefaultSkybox(hdrTexture, true, 1000,0.3);
        var hdrSkyBox = scene.getMeshByName('hdrSkyBox');
    });

    scene.registerBeforeRender(function() {
        
    });

    engine.runRenderLoop(function() {
        scene.render();
    });
}

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
    
