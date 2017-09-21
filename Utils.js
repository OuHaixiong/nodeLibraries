
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

    /**
     * 判断对象或数组是否存在某个key
     *
     */
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

    /**
     * 递归删除文件夹或文件（同步删除），并排除不需要删除的文件
     * @{string} absolutePath 文件或目录的绝对路径
     * @{array} excludeFile 不删除的文件（数组，每项页是绝对路径，目前只支持根目录下的文件排除）
     */
    deleteFileExcludeFile : function (absolutePath, excludeFile) {
        if (!fs.existsSync(absolutePath)) {
            return;
        }
        var _this = this;
        
        if (fs.statSync(absolutePath).isDirectory()) { // 文件夹
            var files = fs.readdirSync(absolutePath);
            files.forEach(function (file, index) {
                var currentPath = path.join(absolutePath, './', file);
                if (fs.statSync(currentPath).isDirectory()) { // directory
                    _this.deleteFileExcludeFile(currentPath);
                } else { // file
                    if (typeof(excludeFile) == 'undefined') {
                        fs.unlinkSync(currentPath);
                    } else {
                        var length = excludeFile.length;
                        var isDelete = true; // true ： 可以删除
                        for (var i=0; i<length; i++) {
                            if (excludeFile[i] == currentPath) {
                                isDelete = false; // false ： 不可以删除
                                break;
                            }
                        }
                        if (isDelete) {
                            fs.unlinkSync(currentPath);
                        }
                    }
                }
            });
            if (typeof(excludeFile) == 'undefined') {
                fs.rmdirSync(absolutePath);
            }
        } else { // 文件
            if (typeof(excludeFile) == 'undefined') {
                fs.unlinkSync(absolutePath);
            } else {
                var length = excludeFile.length;
                var isDelete = true; // true ： 可以删除
                for (var i=0; i<length; i++) {
                    if (excludeFile[i] == absolutePath) {
                        isDelete = false; // false ： 不可以删除
                        break;
                    }
                }
                if (isDelete) {
                    fs.unlinkSync(absolutePath);
                }
            }
        }
    }

};