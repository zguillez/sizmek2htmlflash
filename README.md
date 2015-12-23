# Sizmek2htmlflash

[![npm version](https://badge.fury.io/js/sizmek2htmlflash.svg)](https://badge.fury.io/js/sizmek2htmlflash)
[![Code Climate](http://img.shields.io/codeclimate/github/zguillez/sizmek2htmlflash.svg)](https://codeclimate.com/github/zguillez/sizmek2htmlflash)
[![Build Status](http://img.shields.io/travis/zguillez/sizmek2htmlflash.svg)](https://travis-ci.org/zguillez/sizmek2htmlflash)
[![Coverage Status](http://img.shields.io/coveralls/zguillez/sizmek2htmlflash.svg)](https://coveralls.io/r/zguillez/sizmek2htmlflash)
[![Dependency Status](https://gemnasium.com/zguillez/sizmek2htmlflash.svg)](https://gemnasium.com/zguillez/sizmek2htmlflash)
![](https://reposs.herokuapp.com/?path=zguillez/sizmek2htmlflash)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
[![Analytics](https://ga-beacon.appspot.com/UA-1125217-30/zguillez/sizmek2htmlflash?pixel)]

Npm module that execute Grunt task to implement Sizmek clicktag code into HTML banner made with Flash CC 2015

# Getting Started

### Install component globally

	npm i -g sizmek2htmlflash
	
## Execute command

	sizmek2htmlflash -v

## Requeriments

### [NodeJS](https://nodejs.org/)

For update npm

	sudo npm install npm -g
	
**Documentation:**

* [https://nodejs.org/](https://nodejs.org/)

# Usage

Develop banners on separate forlders:

	baners/
		300x250/
		250x250/
		728x90/
		etc..

Install module on banners root folder:

	baners/
		300x250/
		250x250/
		728x90/
		etc..
		Gruntfile.js //created by module
		node_modules/
		package.json

Publish the flash banner on html5 format. The export files must be like this:

	banners/
		300x250/
			300x250.fla
			300x250.html
			300x250.js
			300x250.jpg
			images/
				300x250_atlas_.json
				300x250_atlas_.png

Run the grunt task **run**, with the param of the **folder** and **file** name of the banner:

	sizmek2htmlflash run:300x250
	
If the folder and file name are different, must pass two parameters:

	sizmek2htmlflash run:300x250folder:300x250fla
	
This task will crreate a **banner_300x250** folder with the banners files. And create a **banner_300x250.zip** file for upload to Sizmek platform:

	banners/
		300x250/
			300x250.fla
			300x250.html
			300x250.js
			300x250.jpg
			images/
				300x250_atlas_.json
				300x250_atlas_.png
			banner_300x250/
				300x250.html
				300x250.js
				300x250.png
				300x250.png
				lib/
					EBLoader.js
					easeljs.js
					movieclip.js
					preloadjs.js
					tweenjs.js
			banner_300x250.zip

# CreateJS liberies

Adobe Flash CC use CreateJS javascript lib for animations. This script assumes that versions of the libreries are 0.8.1 and 0.6.1

	<script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script>
	<script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script>
	<script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script>
	<script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script>
	
If different versions are used you will edit the file Gruntfile.js for update it:

	var easeljs = '0.8.1';
	var tweenjs = '0.6.1';
	var movieclip = '0.8.1';
	var preloadjs = '0.6.1';
	
# Tasks processed

* Download Sizmek and CreateJS libraries:
	
URLS

	http://ds.serving-sys.com/BurstingScript/EBLoader.js
	http://code.createjs.com/easeljs-0.8.1.min.js
	http://code.createjs.com/tweenjs-0.6.1.min.js
	http://code.createjs.com/movieclip-0.8.1.min.js
	http://code.createjs.com/preloadjs-0.6.1.min.js

PATH

	lib/
		EBLoader.js
		easeljs.js
		movieclip.js
		preloadjs.js
		tweenjs.js
					
* And script tag for libs:

`<script src="lib/EBLoader.js"></script>`

* And css inline:

`<style>html, body {margin:0,padding:0}</style>`

* Remove the JSON file to load and put it inline:

Before:

	loader.loadFile({src:"images/300x250_atlas_.json", type:"spritesheet", id:"300x250_atlas_"}, true);

After:

	ss["300x250_atlas_"] = new createjs.SpriteSheet({"images": ["300x250.png"], "frames": [[182,177,80,204],[0,354,50,50],[182,0,180,175],[0,0,180,175],[0,177,180,175]]});

* Add Sizmek javascript actions:

Code:

	function checkInit() {
		if (!EB.isInitialized()) {
			EB.addEventListener(EBG.EventName.EB_INITIALIZED, wait);
		} else {
			onInit();
		}
	}
	function onInit() {
		init();
	}
	function wait() {
		checkInit();
	}
	function handleBannerClick(){
		EB.clickthrough();
	}
	
* Change the **onload** action:

`<body onload="checkInit()" style="background-color:#D4D4D4">`

* Add the **onclick** function for Sizmek clicktag:

`onclick="handleBannerClick()"`

* Move the image files to root folder.

* Optimize the image files.

## File from Flash:

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>300x250</title>
	
	<script src="http://code.createjs.com/easeljs-0.8.1.min.js"></script>
	<script src="http://code.createjs.com/tweenjs-0.6.1.min.js"></script>
	<script src="http://code.createjs.com/movieclip-0.8.1.min.js"></script>
	<script src="http://code.createjs.com/preloadjs-0.6.1.min.js"></script>
	<script src="300x250.js"></script>
	
	<script>
	var canvas, stage, exportRoot;
	
	function init() {
		canvas = document.getElementById("canvas");
		images = images||{};
		ss = ss||{};
	
		var loader = new createjs.LoadQueue(false);
		loader.addEventListener("fileload", handleFileLoad);
		loader.addEventListener("complete", handleComplete);
	loader.loadFile({src:"images/300x250_atlas_.json", type:"spritesheet", id:"300x250_atlas_"}, true);
		loader.loadManifest(lib.properties.manifest);
	}
	
	function handleFileLoad(evt) {
		if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
	}
	
	function handleComplete(evt) {
		var queue = evt.target;
		ss["300x250_atlas_"] = queue.getResult("300x250_atlas_");
		exportRoot = new lib._300x250();
	
		stage = new createjs.Stage(canvas);
		stage.addChild(exportRoot);
		stage.update();
	
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
	}
	</script>
	</head>
	
	<body onload="init();" style="background-color:#D4D4D4">
		<canvas id="canvas" width="550" height="400" style="background-color:#FFFFFF"></canvas>
	</body>
	</html>

## File created:

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>300x250</title>
	
	<style>html,body{margin:0;padding:0}</style>
	
	<script src="lib/EBLoader.js"></script>
	<script src="lib/easeljs.js"></script>
	<script src="lib/tweenjs.js"></script>
	<script src="lib/movieclip.js"></script>
	<script src="lib/preloadjs.js"></script>
	<script src="300x250.js"></script>
	
	<style>html, body {margin:0,padding:0}</style>
	
	<script>
	var canvas, stage, exportRoot;
	
	function init() {
		canvas = document.getElementById("canvas");
		images = images||{};
		ss = ss||{};
		ss["300x250_atlas_"] = new createjs.SpriteSheet({"images": ["300x250.png"], "frames": [[182,177,80,204],[0,354,50,50],[182,0,180,175],[0,0,180,175],[0,177,180,175]]});
		exportRoot = new lib._300x250();
	
		stage = new createjs.Stage(canvas);
		stage.addChild(exportRoot);
		stage.update();
	
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
	}
	function checkInit() {
		if (!EB.isInitialized()) {
			EB.addEventListener(EBG.EventName.EB_INITIALIZED, wait);
		} else {
			onInit();
		}
	}
	function onInit() {
		init();
	}
	function wait() {
		checkInit();
	}
	function handleBannerClick(){
		EB.clickthrough();
	}
	</script>
	</head>
	
	<body onload="checkInit()" style="background-color:#D4D4D4">
		<canvas id="canvas" width="550" height="400" style="background-color:#FFFFFF" onclick="handleBannerClick()"></canvas>
	</body>
	</html>

# Banner with video

Banner polite HTML5 with a video frame

## Useage

Add a video and poster file on root folder

	banners/
    300x600/
        ...
        video.jpg
        video.mp4

Execute command with "video" optión

	sizmek2htmlflash run 300x600 --video='0,330'
	
This will place the video on top 0px and left 330px absolut position.

## File created:

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>300x600</title>
	
	<script>EBModulesToLoad = ["Video", "EBCMD"];</script>
	<script src="lib/EBLoader.js"></script>
	<script src="lib/easeljs.js"></script>
	<script src="lib/tweenjs.js"></script>
	<script src="lib/movieclip.js"></script>
	<script src="lib/preloadjs.js"></script>
	<script src="300x600.js"></script>
	
	<style>
		html,body{position: relative;margin:0;padding:0;}
		#banner {position: relative; display:inline-block;}
		.video-container {position: absolute; top: 330px; left:0px;}
	</style>
	
	<script>
	var canvas, stage, exportRoot;
	
	function init() {
		canvas = document.getElementById("canvas");
		images = images||{};
		ss = ss||{};
		ss["300x600_atlas_"] = new createjs.SpriteSheet({"images": ["300x600.png"], "frames": [[0,0,300,600],[0,640,134,35],[141,602,102,36],[136,640,118,36],[0,677,40,36],[245,602,96,36],[0,602,139,36]]});
		exportRoot = new lib._300x600();
	
		stage = new createjs.Stage(canvas);
		stage.addChild(exportRoot);
		stage.update();
	
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
	}
	function checkInit() {
		if (!EB.isInitialized()) {
			EB.addEventListener(EBG.EventName.EB_INITIALIZED, wait);
		} else {
			onInit();
		}
	}
	function onInit() {
		initVideo();
		init();
	}
	function wait() {
		checkInit();
	}
	function handleBannerClick(){
		EB.clickthrough();
	}
	
	var adDiv;
	var videoContainer;
	var video;
	var sdkVideoPlayer;
	var sdkVideoPlayButton;
	var isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);
	
	function initVideo() {
		adDiv = document.getElementById("ad");
		videoContainer = document.getElementById("video-container");
		video = document.getElementById("video");
		sdkVideoPlayer = document.getElementById("sdk-video-player");
		sdkVideoPlayButton = document.getElementById("sdk-video-play-button");
		var sdkData = EB.getSDKData();
		var useSDKVideoPlayer = false;
		var sdkPlayerVideoFormat = "mp4";
		if (sdkData !== null) {
			if (sdkData.SDKType === "MRAID" && sdkData.version > 1) {
				document.body.classList.add("sdk");
				EB.setExpandProperties({
					useCustomClose: true
				});
				var sourceTags = video.getElementsByTagName("source");
				var videoSource = "";
				for (var i = 0; i < sourceTags.length; i++) {
					if (sourceTags[i].getAttribute("type")) {
						if (sourceTags[i].getAttribute("type").toLowerCase() === "video/" + sdkPlayerVideoFormat) {
							videoSource = sourceTags[i].getAttribute("src");
						}
					}
				}
				videoContainer.removeChild(video);
				video = null;
				sdkVideoPlayButton.addEventListener("click", function() {
					if (videoSource !== "") {
						EB.playVideoOnNativePlayer(videoSource);
					}
				});
				useSDKVideoPlayer = true;
			}
		}
		if (!useSDKVideoPlayer) {
			videoContainer.removeChild(sdkVideoPlayer);
			var videoTrackingModule = new EBG.VideoModule(video);
		}
		videoContainer.style.visibility = "visible";
		if (isIOS) {
			centerWebkitVideoControls();
		}
	}
	
	function centerWebkitVideoControls() {
		document.body.classList.add("ios-center-video-controls");
	}
	</script>
	</head>
	
	<body onload="checkInit()" style="background-color:#D4D4D4">
		<div id="banner">
			<canvas id="canvas" width="300" height="600" style="background-color:#FFFFFF" onclick="handleBannerClick()"></canvas>
			<div id="video-container" class="video-container centered">
				<video id="video" controls loop autoplay muted poster="video.jpg">
					<source src="video.mp4" type="video/mp4">
				</video>
				<div id="sdk-video-player" class="sdk-video-player">
					<div id="sdk-video-play-button" class="sdk-video-player-button centered"></div>
				</div>
			</div>
		</div>
	</body>
	</html>

# Changelog

### v1.4.0 (November 30, 2015) 

* Add banner with video (Polite HTML)

### v1.3.0 (November 18, 2015) 

* Make global shell command

### v1.2.0 (November 6, 2015) 

* Sizmek lib EBLoader on relative path
* CreateJS libs on relative paths

### v1.1.6 (October 22, 2015) 

* Folder implementation
* PNG optimize
* Create zip file
* Fixed isuses

### v1.1.0 (October 21, 2015) 
* Initial implementation
