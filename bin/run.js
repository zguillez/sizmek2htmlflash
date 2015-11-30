#! /usr/local/bin/node

var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var param = process.argv[2];
if (param === 'version' || param === '-v') {
	var dir = path.resolve(__dirname, '../');
	var file = fs.readFileSync(dir + "/package.json");
	console.log(JSON.parse(file).version);
} else if (param === 'run') {
	var dir = path.resolve(__dirname, '../');
	var folder = process.argv[3];
	var options = '';
	process.argv.forEach(function(val, index, array) {
		if (index > 3) {
			options += " " + val;
		}
	});
	if (folder) {
		shell.exec('grunt run:' + folder + ' --gruntfile ' + dir + '/Gruntfile.js' + " " + options);
	} else {
		console.log('ERR: No folder');
	}
} else {
	var msg = "\nUsage: sizmek2htmlflash <command>\n\nwhere <command> is one of:\n\tversion, run\n";
	console.log(msg);
}