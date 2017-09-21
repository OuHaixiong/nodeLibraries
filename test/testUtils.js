
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

var deletePath = path.join(__dirname, 'wokao');
var excludeFile = [
    path.join(deletePath, 'a.js'),
    path.join(deletePath, 'b.php')
];
//Utils.deleteFileExcludeFile(deletePath, excludeFile);
Utils.deleteFileExcludeFile(deletePath);
