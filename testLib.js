var fs = require('fs')
var log = require('loglevel');
//log.setLevel("debug")

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
    log.debug("getDates : " + datePath)
    return JSON.parse(fs.readFileSync(datePath, 'utf8'))
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

  copy : function(sourceFolder, targetFolder, fileName){

    log.debug("createDir : " + targetFolder)
    this.createDir(targetFolder);
    var sourceFile = sourceFolder + "/" + fileName
    var targetFile = targetFolder + "/" + fileName
    //Copy file
    fs.createReadStream(sourceFile).pipe(fs.createWriteStream(targetFile));
  },

  createDir : function(path){

    if(!fs.existsSync(path)){
      fs.mkdirSync(path)
    }
  },

  getAllIndexes : function(arr, val) {
      var indexes = [], i;
      for(i = 0; i < arr.length; i++)
          if (arr[i] === val)
              indexes.push(i);
      return indexes;
  },

  getAllIndexes_2 : function(arr, val){

      var indexes = [], index, i;
      while(true){
        index = arr.indexOf(val)
        if(index == -1){
          break
        } else {
          indexes.push(index)
          arr = arr.substring(index)
        }
      }
      //Continoue
  }

}

exports.testLib = testLib


//Tests
var string = "abc________abc_________abc"
var key = "abc"

//var indexes = testLib.getAllIndexes_2(string, key)
