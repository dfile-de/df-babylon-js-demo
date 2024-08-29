var scene,camera;
function initScene (){

    scene = new BABYLON.Scene(engine);
    
    
    scene.clearColor = new BABYLON.Color4(0.5, 0.5, 0.5, 0.8);
    scene.imageProcessingConfiguration.contrast = 1.2//1.6;
    scene.imageProcessingConfiguration.exposure = 0.6//0.6;
    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    
    //hdr #######################################################################################
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("img/environment.dds", scene);
    hdrTexture.gammaSpace = false;
    
    scene.createDefaultSkybox(hdrTexture, true, 10000,1);
    var hdrSkyBox = scene.getMeshByName('hdrSkyBox');
    
    //skybox #####################################################################################

       //var envTexture = new BABYLON.CubeTexture("img/warehouse.hdr", scene);
    //scene.createDefaultSkybox(envTexture,true,100);
   


    //camera ###################################################################################
    camera = new BABYLON.ArcRotateCamera("Cam_config", 0, 0, 0, new BABYLON.Vector3(0,0,0), scene);
    //camera.setPosition(new BABYLON.Vector3(3,1,5));
    camera.setPosition(new BABYLON.Vector3(-2,-2,5));
    camera.fov=0.5;
    //camera.upperBetaLimit=1.8;Math.PI*(90)/180;
    camera.upperRadiusLimit=25;
    camera.lowerRadiusLimit=3;
    camera.wheelPrecision = 20;
    camera.allowUpsideDown = true;
    scene.activeCamera=camera;
    scene.activeCamera.attachControl(canvas);


     // light This creates a HemisphericLight, aiming 0,1,0 - to the sky (non-mesh)##############
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1.
    light.intensity = 5;
    
    
    // load gltf################################################################################
    loader= BABYLON.SceneLoader;
   
/*
     loader.OnPluginActivatedObservable.add(function (plugin) {
        plugin.animationStartMode = BABYLON.GLTFLoaderAnimationStartMode.NONE;
    }, undefined, undefined, undefined, true);
 */  
loader.Append("gltf/ho/", "ho_drone.gltf", scene, function (scene) {
        

        

    m=scene.meshes;

                     
    for (i = 0; i < m.length; i++) {
    //  //console.log(i);
       scene.stopAnimation(m[i]);
    }
    
      
    });    
    
    var fstart=0;
    var fend=100;
    var floop=true;
    var animate=false;
    //var anim='';

    document.getElementById("button-animation").addEventListener("click",function () {
         if(animate==false){
          for (i = 0; i < m.length; i++) {
           scene.beginAnimation(m[i],fstart, fend, floop);
          // ani.goToFrame(50);
          console.log(m[i]);
           
         }
         m['10']._visibility=0;
          //console.log(ani);
         animate=true;

        }
        else{
         for (i = 0; i < m.length; i++) {
         scene.stopAnimation(m[i]);
     
         }
         animate=false;
        }
        
        
         // currentFrame=scene.getAnimations()[0].currentFrame;
        
    }); 
    

    
    

    
    
    scene.registerBeforeRender(function() {
        
    });

    engine.runRenderLoop(function() {
        scene.render();
        //console.log(camera.position);
    });
}

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
    
