# Sizmek2htmlflash

Npm module that execute Grunt task to implement Sizmek clicktag code into HTML banner made with Flash CC 2015

# Getting Started

### Install component

	npm install sizmek2htmlflash
	
## Install dependences manually

	npm install

If you have error on install try to update dependences manually:

```bash
sudo npm install
```

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

	grunt run:300x250
	
If the folder and file name are different, must pass two parameters:

	grunt run:300x250folder:300x250fla
	
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

# Changelog

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