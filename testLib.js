var fs = require('fs')


var testLib = {

  getFolderVars : function(folder){
    folder = "./" + folder
    return {
      dates :  folder + "/dates.json",
      root : folder + "/root",
      result : folder + "/result"
    }
  },

  getDates : function(datePath){
    JSON.parse(fs.readFileSync(datePath, 'utf8'))
  },

  deleteFolderRecursive : function(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((function(file, index){
        var curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          this.deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      }).bind(this));
      fs.rmdirSync(path);
    }
  },

  copy : function(date, folderName, fileName){

    //Create file dir
    var sourceFolder = this.rootFolder + folderName
    var targetFolder = this.resultFolder + "/" + date + "/" + folderName

    this.createDir(targetFolder);

    var sourceFile = sourceFolder + "/" + fileName
    var targetFile = targetFolder + "/" + fileName

    //Copy file
    fs.createReadStream(sourceFile).pipe(fs.createWriteStream(targetFile));
  },

  createDir : function(path){

    if(!fs.existsSync(path)){
      fs.mkdir(path, function(err, data){
        if(err){
          console.log(err)
        }
      })
    }
  },

  getAllIndexes : function(arr, val) {
      var indexes = [], i;
      for(i = 0; i < arr.length; i++)
          if (arr[i] === val)
              indexes.push(i);
      return indexes;
  }
}

exports.testLib = testLib
