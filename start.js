var fs = require('fs');
fs.createReadStream('Gruntfile.js').pipe(fs.createWriteStream('../../Gruntfile.js'));
fs.createReadStream('package.json').pipe(fs.createWriteStream('../../package.json'));