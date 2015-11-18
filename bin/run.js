#! /usr/bin/env node

var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var dir = path.resolve(__dirname, '../');
var folder = process.argv[2];
shell.exec('grunt run:' + folder + ' --gruntfile ' + dir + '/Gruntfile.js');