var fs = require('fs');
fs.writeFile("package.json", "{}", function(err) {
	if (err) {
		return console.log(err);
	}
	console.log("package.json file was saved!");
});