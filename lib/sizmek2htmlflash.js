exports.grunt = function(msg) {
	var child_process = require('child_process');
	child_process.exec('grunt --gruntfile ../lib/node_modules/sizmek2htmlflash/Gruntfile.js', function(error, stdout, stderr) {
		console.log(stdout);
	});
};