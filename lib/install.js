var fs = require('fs');
fs.createReadStream('lib/Gruntfile.js').pipe(fs.createWriteStream('../../Gruntfile.js'));
fs.createReadStream('package.json').pipe(fs.createWriteStream('../../package.json'));