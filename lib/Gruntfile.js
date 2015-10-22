'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		mkdir: {
			all: {
				options: {
					create: ['???/banner_???']
				},
			},
		},
		copy: {
			files: {
				cwd: '???/',
				src: ['???.html', '???.js'],
				dest: '???/banner_???/',
				expand: true
			},
			image: {
				cwd: '???/images/',
				src: '*.png',
				dest: '???/banner_???/',
				expand: true
			}
		},
		rename: {
			png: {
				src: '???/???_atlas_.png',
				dest: '???/???_atlas_.png',
				options: {}
			}
		},
		replace: {
			html: {
				src: '???/banner_???/???.html',
				overwrite: true,
				replacements: [{
					from: 'queue.getResult("???_atlas_")',
					to: 'new createjs.SpriteSheet(???)'
				}, {
					from: '</title>\n',
					to: '</title>\n\n<style>html,body{margin:0;padding:0}</style>\n\n<script src="http://ds.serving-sys.com/BurstingScript/EBLoader.js"></script>'
				}, {
					from: 'onload="init();"',
					to: 'onload="checkInit()"'
				}, {
					from: '></canvas>',
					to: ' onclick="handleBannerClick()"></canvas>'
				}, {
					from: '<script>',
					to: '<style>html, body {margin:0,padding:0}</style>\n\n<script>'
				}, {
					from: 'ss = ss||{};\n\n',
					to: 'ss = ss||{};\n'
				}, {
					from: '\tvar queue = evt.target;\n',
					to: ''
				}, {
					from: '\tvar loader = new createjs.LoadQueue(false);\n',
					to: ''
				}, {
					from: '\tloader.addEventListener("fileload", handleFileLoad);\n',
					to: ''
				}, {
					from: '\tloader.addEventListener("complete", handleComplete);\n',
					to: ''
				}, {
					from: 'loader.loadFile({src:"images/160x600_atlas_.json", type:"spritesheet", id:"160x600_atlas_"}, true);\n',
					to: ''
				}, {
					from: '}\n\n',
					to: ''
				}, {
					from: '\tloader.loadManifest(lib.properties.manifest);\n',
					to: ''
				}, {
					from: 'function handleFileLoad(evt) {\n',
					to: ''
				}, {
					from: '\tif (evt.item.type == "image") { images[evt.item.id] = evt.result; }\n',
					to: ''
				}, {
					from: '}\n\n',
					to: ''
				}, {
					from: 'function handleComplete(evt) {\n',
					to: ''
				}, {
					from: 'queue.getResult("160x600_atlas_")',
					to: ''
				}]
			},
			json: {
				src: '???/banner_???/???.html',
				overwrite: true,
				replacements: [{
					from: 'images/',
					to: ''
				}]
			},
			pixel: {
				src: '???/banner_???/???.html',
				overwrite: true,
				replacements: [{
					from: '}\n</script>\n</head>',
					to: '}\nfunction checkInit() {\n\tif (!EB.isInitialized()) {\n\t\tEB.addEventListener(EBG.EventName.EB_INITIALIZED, wait);\n\t} else {\n\t\tonInit();\n\t}\n}\nfunction onInit() {\n\tinit();\n}\nfunction wait() {\n\tcheckInit();\n}\nfunction handleBannerClick(){\n\tEB.clickthrough();\n}\n</script>\n</head>'
				}]
			}
		}
	});
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.registerTask('default', []);
	grunt.task.registerTask('init', function(folder, filename) {
		var json = grunt.file.read(folder + '/' + 'images/' + filename + '_atlas_.json');
		json = json.replace('images/', '');
		json = json.replace('_atlas_', '');
		grunt.config.set('mkdir.all.options.create.0', folder + '/banner_' + filename);
		grunt.config.set('copy.files.cwd', folder + '/');
		grunt.config.set('copy.image.cwd', folder + '/images/');
		grunt.config.set('copy.files.src.0', filename + '.html');
		grunt.config.set('copy.files.src.1', filename + '.js');
		grunt.config.set('copy.files.dest', folder + '/' + 'banner_' + filename + '/');
		grunt.config.set('copy.image.dest', folder + '/' + 'banner_' + filename + '/');
		grunt.config.set('rename.png.src', folder + '/banner_' + filename + '/' + filename + '_atlas_.png');
		grunt.config.set('rename.png.dest', folder + '/banner_' + filename + '/' + filename + '.png');
		grunt.config.set('replace.html.src', folder + '/banner_' + filename + '/' + filename + '.html');
		grunt.config.set('replace.pixel.src', folder + '/banner_' + filename + '/' + filename + '.html');
		grunt.config.set('replace.html.replacements.0.from', 'queue.getResult("' + filename + '_atlas_")');
		grunt.config.set('replace.html.replacements.0.to', 'new createjs.SpriteSheet(' + json + ')');
		grunt.config.set('replace.json.replacements.0.from', '"images": ["images/' + filename + '_atlas_.png"]');
		grunt.config.set('replace.json.replacements.0.to', '"images": ["images/' + filename + '.png"]');
		grunt.task.run('mkdir');
		grunt.task.run('copy');
		grunt.task.run('rename');
		grunt.task.run('replace');
	});
};