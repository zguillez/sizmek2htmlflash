'use strict';
var easeljs = '0.8.1';
var tweenjs = '0.6.1';
var movieclip = '0.8.1';
var preloadjs = '0.6.1';
module.exports = function(grunt) {
	var mozjpeg = require('imagemin-mozjpeg');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		mkdir: {
			banner: {
				options: {
					create: ['???/banner_???']
				},
			},
			lib: {
				options: {
					create: ['???/banner_???/lib']
				},
			}
		},
		copy: {
			files: {
				cwd: '???/',
				src: ['???.html', '???.js', '???.jpg', '???.gif'],
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
				dest: '???/???.png',
				options: {}
			}
		},
		curl: {
			sizmek: {
				src: 'http://ds.serving-sys.com/BurstingScript/EBLoader.js',
				dest: '???/banner_???/lib/EBLoader.js'
			},
			easeljs: {
				src: 'http://code.createjs.com/easeljs-' + easeljs + '.min.js',
				dest: '???/banner_???/lib/easeljs.js'
			},
			tweenjs: {
				src: 'http://code.createjs.com/tweenjs-' + tweenjs + '.min.js',
				dest: '???/banner_???/lib/tweenjs.js'
			},
			movieclip: {
				src: 'http://code.createjs.com/movieclip-' + movieclip + '.min.js',
				dest: '???/banner_???/lib/movieclip.js'
			},
			preloadjs: {
				src: 'http://code.createjs.com/preloadjs-' + preloadjs + '.min.js',
				dest: '???/banner_???/lib/preloadjs.js'
			}
		},
		replace: {
			html: {
				src: '???/banner_???/???.html',
				overwrite: true,
				replacements: [{}, {}, {
					from: '</title>\n',
					to: '</title>\n\n<style>html,body{margin:0;padding:0}</style>\n\n<script src="lib/EBLoader.js"></script>'
				}, {
					from: 'http://code.createjs.com/easeljs-' + easeljs + '.min.js',
					to: 'lib/easeljs.js'
				}, {
					from: 'http://code.createjs.com/tweenjs-' + tweenjs + '.min.js',
					to: 'lib/tweenjs.js'
				}, {
					from: 'http://code.createjs.com/movieclip-' + movieclip + '.min.js',
					to: 'lib/movieclip.js'
				}, {
					from: 'http://code.createjs.com/preloadjs-' + preloadjs + '.min.js',
					to: 'lib/preloadjs.js'
				}, {
					from: 'queue.getResult("???_atlas_")',
					to: 'new createjs.SpriteSheet(???)'
				}, {
					from: 'loader.loadFile({src:"images/???_atlas_.json", type:"spritesheet", id:"???_atlas_"}, true);\n',
					to: ''
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
		},
		imagemin: {
			compress: {
				options: {
					optimizationLevel: 3,
					use: [mozjpeg()]
				},
				files: [{
					expand: true,
					cwd: '???/banner_???/',
					src: '.jpg',
					dest: '???/banner_???/'
				}]
			}
		},
		pngmin: {
			compress: {
				options: {
					ext: '.png',
					force: true
				},
				files: [{
					expand: true,
					cwd: '???/banner_???/',
					src: '.png',
					dest: '???/banner_???/'
				}]
			}
		},
		zip: {
			folder: {
				cwd: '???/banner_???/',
				src: ['???/banner_???/**'],
				dest: '???/banner_???.zip'
			}
		}
	});
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-pngmin');
	grunt.loadNpmTasks('grunt-zip');
	grunt.registerTask('default', []);
	grunt.task.registerTask('run', function(folder, filename) {
		if (!filename) {
			filename = folder;
		}
		folder = process.env['PWD'] + '/' + folder;
		var json = grunt.file.read(folder + '/' + 'images/' + filename + '_atlas_.json');
		json = json.replace('images/', '');
		json = json.replace('_atlas_', '');
		grunt.config.set('mkdir.banner.options.create.0', folder + '/banner_' + filename);
		grunt.config.set('mkdir.lib.options.create.0', folder + '/banner_' + filename + '/lib');
		grunt.config.set('copy.files.cwd', folder + '/');
		grunt.config.set('copy.image.cwd', folder + '/images/');
		grunt.config.set('copy.files.src.0', filename + '.html');
		grunt.config.set('copy.files.src.1', filename + '.js');
		grunt.config.set('copy.files.src.2', filename + '.jpg');
		grunt.config.set('copy.files.src.3', filename + '.gif');
		grunt.config.set('copy.files.dest', folder + '/' + 'banner_' + filename + '/');
		grunt.config.set('copy.image.dest', folder + '/' + 'banner_' + filename + '/');
		grunt.config.set('curl.sizmek.dest', folder + '/' + 'banner_' + filename + '/lib/EBLoader.js');
		grunt.config.set('curl.easeljs.dest', folder + '/' + 'banner_' + filename + '/lib/easeljs.js');
		grunt.config.set('curl.tweenjs.dest', folder + '/' + 'banner_' + filename + '/lib/tweenjs.js');
		grunt.config.set('curl.movieclip.dest', folder + '/' + 'banner_' + filename + '/lib/movieclip.js');
		grunt.config.set('curl.preloadjs.dest', folder + '/' + 'banner_' + filename + '/lib/preloadjs.js');
		grunt.config.set('rename.png.src', folder + '/banner_' + filename + '/' + filename + '_atlas_.png');
		grunt.config.set('rename.png.dest', folder + '/banner_' + filename + '/' + filename + '.png');
		grunt.config.set('replace.html.src', folder + '/banner_' + filename + '/' + filename + '.html');
		grunt.config.set('replace.pixel.src', folder + '/banner_' + filename + '/' + filename + '.html');
		grunt.config.set('replace.html.replacements.0.from', 'queue.getResult("' + filename + '_atlas_")');
		grunt.config.set('replace.html.replacements.0.to', 'new createjs.SpriteSheet(' + json + ')');
		grunt.config.set('replace.html.replacements.1.from', 'loader.loadFile({src:"images/' + filename +
			'_atlas_.json", type:"spritesheet", id:"' + filename + '_atlas_"}, true);\n');
		grunt.config.set('replace.json.replacements.0.from', '"images": ["images/' + filename + '_atlas_.png"]');
		grunt.config.set('replace.json.replacements.0.to', '"images": ["images/' + filename + '.png"]');
		grunt.config.set('imagemin.compress.files.0.cwd', folder + '/banner_' + filename + '/');
		grunt.config.set('imagemin.compress.files.0.dest', folder + '/banner_' + filename + '/');
		grunt.config.set('pngmin.compress.files.0.cwd', folder + '/banner_' + filename + '/');
		grunt.config.set('pngmin.compress.files.0.dest', folder + '/banner_' + filename + '/');
		grunt.config.set('zip.folder.cwd', folder + '/banner_' + filename + '/');
		grunt.config.set('zip.folder.src.0', folder + '/banner_' + filename + '/**');
		grunt.config.set('zip.folder.dest', folder + '/banner_' + filename + '.zip');
		grunt.task.run('mkdir');
		grunt.task.run('copy');
		grunt.task.run('curl');
		grunt.task.run('rename');
		grunt.task.run('replace');
		console.log(folder + '/banner_' + filename + '/');
		console.log(folder + '/banner_' + filename + '/');
		console.log(folder + '/banner_' + filename + '/');
		console.log(folder + '/banner_' + filename + '/');
		console.log(folder + '/banner_' + filename + '/');
		grunt.task.run('imagemin');
		grunt.task.run('pngmin');
		grunt.task.run('zip');
	});
};