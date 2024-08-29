function initScene() {
	var scene = new BABYLON.Scene(engine);

  var cam = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0,0,0), scene);
	// This targets the camera to scene origin
    cam.setTarget(BABYLON.Vector3.Zero());
	//cam.useAutoRotationBehavior = true;
	cam.lowerRadiusLimit = 3;
	cam.upperRadiusLimit = 30;

	cam.lowerAlphaLimit=toRadians(0);
	cam.upperAlphaLimit=toRadians(360);
	
	
	cam.alpha = 2;
	cam.beta = 1;
	cam.radius = 15;
	
	// This attaches the camera to the canvas
    cam.attachControl(canvas, true);

	//mouse weel
	cam.wheelPrecision = 80;
	
	//cam.x=-3.0823956914594492;
	//cam.y=-5;
	//cam.z=-1.4926620042692669;
	//cam.position= new BABYLON.Vector3(2,-10,0);
	
	//cam.target= new BABYLON.Vector3(2,1,0);
	//autorotation
	//cam.autoRotationBehavior.idleRotationSpeed = 0.6;
	
	
var pipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [cam]);
pipeline.samples = 4;
pipeline.fxaaEnabled = true;


//pipeline.bloomEnabled = true;
//
//pipeline.bloomThreshold = 0.5;
//pipeline.bloomWeight = 0.3;
//pipeline.bloomKernel = 64;
//pipeline.bloomScale = 0.5;

	
	// light This creates a HemisphericLight, aiming 0,1,0 - to the sky (non-mesh)##############
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1.
    light.intensity = 1.3;
	
	//animation
	var speed = 100;
    var frameCount = 200;
	newTarget=BABYLON.Vector3.Zero();
	
	//scene.lights[0].dispose();
	var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(0, -10, 0), scene);

	light.position = new BABYLON.Vector3(50, 80, 20);
	light.shadowMinZ = 30;
	light.shadowMaxZ = 110;
	light.intensity = 0.2;

	// Load the model
	BABYLON.SceneLoader.Append("blender/export/", "messestand_01.gltf", scene, function(meshes) {

	//cam.target=meshes[0];
		
	log=scene.meshes;
	//mesh position
	scene.meshes[0].position.y=-1;
	
	//animate
	var r=10;
	animateCameraToRadius(cam, speed, frameCount, r);
	
	
	
	//get cam view
	$("#button-cam").click(function (){
	console.log ('var a='+cam.alpha+';var b='+cam.beta+';var r='+cam.radius+';');
	
	});
	
	
	

	
	$("#a1").click(function (){
		
	//cam.setTarget(BABYLON.Vector3.Zero());
	// camera movers

	var a=2.685957314743372;var b=1.5385467160903659;var r=3.5976172686590795;
	animateCameraTargetToTarget(cam, speed, frameCount, newTarget);
	animateCameraToAlpha(cam, speed, frameCount, a);
	animateCameraToBeta(cam, speed, frameCount, b);
	animateCameraToRadius(cam, speed, frameCount, r);

	});
	
	
	$("#a2").click(function (){
	var a=1.0954793144311705;var b=1.6191391432330458;var r=3.5976172686590795;
	animateCameraTargetToTarget(cam, speed, frameCount, newTarget);
	animateCameraToAlpha(cam, speed, frameCount, a);
	animateCameraToBeta(cam, speed, frameCount, b);
	animateCameraToRadius(cam, speed, frameCount, r);

	});
	$("#a3").click(function (){
	var a=1.5515918234643755;var b=0.6373349768065293;var r=7.8223852525835404;
	animateCameraTargetToTarget(cam, speed, frameCount, newTarget)
	animateCameraToAlpha(cam, speed, frameCount, a);
	animateCameraToBeta(cam, speed, frameCount, b);
	animateCameraToRadius(cam, speed, frameCount, r);

	});
	
	
	$("#a4").click(function (){
	var a=4.286819324369153;var b=1.51519189411449;var r=6.983624195658599;
	animateCameraTargetToTarget(cam, speed, frameCount, newTarget)
	animateCameraToAlpha(cam, speed, frameCount, a);
	animateCameraToBeta(cam, speed, frameCount, b);
	animateCameraToRadius(cam, speed, frameCount, r);

	});
		$("#a5").click(function (){
	var a=2.3820372848133964;var b=1.5311955784821327;var r=3.4099762853634235;
	animateCameraTargetToTarget(cam, speed, frameCount, newTarget)
	animateCameraToAlpha(cam, speed, frameCount, a);
	animateCameraToBeta(cam, speed, frameCount, b);
	animateCameraToRadius(cam, speed, frameCount, r);

	});
	
	

//		var generator = new BABYLON.ShadowGenerator(1024, light);
//		generator.useContactHardeningShadow = true;
//        generator.bias = 0.01;
//        generator.normalBias= 0.05;
//		generator.contactHardeningLightSizeUVRatio = 0.08;
//
//		for (var i = 0; i < scene.meshes.length; i++) {
//			generator.addShadowCaster(scene.meshes[i]);
//			scene.meshes[i].receiveShadows = true;
//			if (scene.meshes[i].material && scene.meshes[i].material.bumpTexture) {
//				scene.meshes[i].material.bumpTexture.level = 2;
//			}
//		}

		//var helper = scene.createDefaultEnvironment({
		//	skyboxSize: 5000,
		//	groundShadowLevel: 0.5,
		//});
		//
		////helper.setMainColor(BABYLON.Color3.Gray());
		//helper.setMainColor(new BABYLON.Color3(1, 1, 1));
		//scene.environmentTexture.lodGenerationScale = 0.6;
    
    
    
    //load reflection texture for pbr material 
	 var hdrTexture =BABYLON.CubeTexture.CreateFromPrefilteredData("img/dds/graySpecularHDR.dds", scene);
	
	 hdrTexture.gammaSpace = false;
	 scene.environmentTexture=hdrTexture;
	  
	// Hintergrund weiß  
	scene.clearColor = new  BABYLON.Color3(0.8, 0.8,0.8);
	scene.ambientColor = new BABYLON.Color3(0, 0, 0);
    
    
	});
  
	// #######################################################
	// #######################################################
	scene.registerBeforeRender(function() {

	});

	engine.runRenderLoop(function() {
		scene.render();
	});


	return scene;
}

	// ###################################################################################################################
	// ###################################################################################################################
	
	function animateCameraTargetToTarget(cam, speed, frameCount, newTarget) {
        var ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('t1', cam, 'target', speed, frameCount, cam.target, newTarget, 0, ease);
    }
     function animateCameraToPosition(cam, speed, frameCount, newPos) {
        var ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('p1', cam, 'position', speed, frameCount, cam.position, newPos, 0, ease);
    }
	  function animateCameraToAlpha(cam, speed, frameCount, newAlpha) {
        var ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('a1', cam, 'alpha', speed, frameCount, cam.alpha, newAlpha, 0, ease);
    }
		function animateCameraToBeta(cam, speed, frameCount, newBeta) {
        var ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('a1', cam, 'beta', speed, frameCount, cam.beta, newBeta, 0, ease);
    }

		function animateCameraToRadius(cam, speed, frameCount, newRadius) {
        var ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('a1', cam, 'radius', speed, frameCount, cam.radius, newRadius, 0, ease);
    }



// Converts from degrees to radians.
toRadians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
toDegrees = function(radians) {
  return radians * 180 / Math.PI;
};


	
	// ###################################################################################################################
	// ###################################################################################################################