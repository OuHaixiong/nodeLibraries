
var Utils = require('../Utils.js');

var path = require('path');

var obj = {
	'name' : 'ouyanhaixiong',
	'age' : 34
};
console.log(Utils.isExistsKey(obj, 'wokao'));
console.log(Utils.isExistsKey(obj, 'name'));


var currentPath = path.join(__dirname, '123');
Utils.deleteDirectoryFile(currentPath);
