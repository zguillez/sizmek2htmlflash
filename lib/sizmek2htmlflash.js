exports.grunt = function(msg) {
	var child_process = require('child_process');
	child_process.exec('grunt', function(error, stdout, stderr) {
		console.log(stdout);
	});
};