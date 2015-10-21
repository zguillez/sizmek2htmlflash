var args = process.argv.slice(2);
var app = require('./lib/sizmek2htmlflash');
app.printMsg(args[0]);
node grunt;