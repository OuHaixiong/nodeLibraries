
/**
 * 工具类【Tools】
 */
/* function Utils() {
}
Utils.isExistKey = function (obj, key) {
    return obj.hasOwnProperty(key);
};
// module.exports.Utils = Utils; // 这个写法是错误的
module.exports = Utils; */

/*var Utils = {
	isExistKey : function (obj, key) {
        return obj.hasOwnProperty(key);
	}
};
module.exports = Utils;*/

var fs = require('fs');
var path = require('path');

module.exports = {
	isExistsKey : function (obj, key) {
        return obj.hasOwnProperty(key);
	},

    /**
     * 递归删除文件夹或文件(同步删除)
     * @{string} absolutePath 文件或文件夹的绝对路径
     */
	deleteDirectoryFile : function (absolutePath) {
        if (!fs.existsSync(absolutePath)) {
        	return;
        }
        if (fs.statSync(absolutePath).isDirectory()) { // directory
            var files = [];
            var _this = this;
            files = fs.readdirSync(absolutePath);
            files.forEach(function (file, index) {
                var currentPath = path.resolve(absolutePath, file);
                _this.deleteDirectoryFile(currentPath);
            });
            fs.rmdirSync(absolutePath);
        } else { // file
            fs.unlinkSync(absolutePath);
        }
	},
};