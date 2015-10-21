var fs = require('fs');
fs.writeFile("package.json", "Hey there!", function(err) {
	if (err) {
		return console.log(err);
	}
	console.log("The file was saved!");
});