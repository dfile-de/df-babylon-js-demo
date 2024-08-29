var scene;
var camera;
var m;
var ani;
var animations = [];

function initScene() {

	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0.5, 0.5, 0.5, 0.8);
	scene.imageProcessingConfiguration.contrast = 1.2 //1.6;
	scene.imageProcessingConfiguration.exposure = 1.5 //0.6;
	scene.imageProcessingConfiguration.toneMappingEnabled = true;

	//hdr #######################################################################################
	var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("img/environment.dds", scene);
	hdrTexture.gammaSpace = false;
	scene.createDefaultSkybox(hdrTexture, true, 100, 1);
	var hdrSkyBox = scene.getMeshByName('hdrSkyBox');

	//skybox #####################################################################################

	//camera ###################################################################################
	camera = new BABYLON.ArcRotateCamera("Cam_config", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
	//camera.setPosition(new BABYLON.Vector3(3,1,5));
	scene.activeCamera.panningSensibility = 0;

	var c_alpha = 0;
	var c_beta = 2;
	var c_radius = 5;
	var c_fov = 0.5;

	camera.alpha = c_alpha;
	camera.beta = c_beta;
	camera.radius = c_radius;
	camera.fov = c_fov;

	//camera.upperBetaLimit=1.8;Math.PI*(90)/180;
	camera.upperRadiusLimit = 25;
	camera.lowerRadiusLimit = 3;
	camera.wheelPrecision = 20;
	camera.allowUpsideDown = true;

	//storeState for reset
	camera.storeState();

	scene.activeCamera = camera;
	//stop panning
	scene.activeCamera.panningSensibility = 0;
	scene.activeCamera.attachControl(canvas);

	//console.log(camera);

	// light This creates a HemisphericLight, aiming 0,1,0 - to the sky (non-mesh)##############
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	// Default intensity is 1.
	light.intensity = 5;

	// load gltf################################################################################
	var loader = new BABYLON.AssetsManager(scene);

	var meshTask = loader.addMeshTask("opjdrone", "", "gltf/ho/", "ho_drone.gltf");
	// var meshTask = loader.addMeshTask("drone", "", "gltf/test1/", "test1.gltf");

	meshTask.onSuccess = function(drone) {
		//m =meshes in gltf-file
		m = drone.loadedMeshes;
		//stop animation all models in gltf-file
		for (i = 0; i < m.length; i++) {
			scene.stopAnimation(m[i]);
		}

	};
	//animate button
	animationrun = '';
	$("#button-animation").click(function() {


		if (animationrun == 'false') {
			restartAnimations(animations);
			animationrun = 'true';
			//console.log('######restartAnimations');
			$(this).addClass('active');
		} else if (animationrun == 'true') {
			pauseAnimations(animations);
			animationrun = 'false';
			$(this).removeClass('active');
		} else {
			animations = startAnimations(m);
			animationrun = 'true';
			//console.log('startAnimations'); 
			$(this).addClass('active');
		}

		//console.log(animationrun);
	});

	//reset cam button
	$("#button-reset-cam").click(function() {
		resetAnimations(animations);
		pauseAnimations(animations);
		camera.restoreState();

		animationrun = 'false';
		$("#button-animation").removeClass('active');
	});

	meshTask.onError = function(task, message, exception) {
		console.log(message, exception);
	};

	loader.load();

	//BeforeRender#################################    
	scene.registerBeforeRender(function() {
		//rotate camera
		camera.alpha += 0.005;
		if (camera.alpha > 2 * Math.PI) {
			camera.alpha = 0;
		}


	});
	//RenderLoop###################################
	engine.runRenderLoop(function() {
		scene.render();
		//console.log(camera.position);
	});

} //end initScene###############################
//#############################################

// Resize######################################
window.addEventListener("resize", function() {
	engine.resize();
});

//gltf - Mesh - Animation######################
//stop
function stopAnimations(loadedmeshes) {
	for (i = 0; i < loadedmeshes.length; i++) {
		scene.stopAnimation(loadedmeshes[i]);
	}
	return true;
}

//start
function startAnimations(loadedmeshes) {
	for (i = 0; i < loadedmeshes.length; i++) {
		//a=scene.beginAnimation(loadedmeshes[i]);
		a = scene.beginAnimation(loadedmeshes[i], 1, 100, true);
		animations.push(a);
	}
	return animations;
}
//pause
function pauseAnimations(animations) {
	for (i = 0; i < animations.length; i++) {
		animations[i].pause();
	}
	return true;
}
//restart
function restartAnimations(animations) {
	for (i = 0; i < animations.length; i++) {
		animations[i].restart();
	}
	return true;
}
//reset
function resetAnimations(animations) {
	for (i = 0; i < animations.length; i++) {
		animations[i].reset();
	}
	return true;
}