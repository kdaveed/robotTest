var fs = require('fs')
var log = require('loglevel');
var copyDir = require("copy-dir")

log.setLevel("debug")

var root = "/Library/CloudStorm/RPA_Test/"

var testLib = {

  mappings : {
    emihToID : root + "mappings",
  },

  path : {
    emih_data_text : root + "EMIH_DATA/TEXT/",
    emih_date_pdf : root + "EMIH_DATA/PDF/",
    test_input_emih_text : root + "TEST_INPUT/EMIH/TEXT/",
    test_input_cs_text : root + "TEST_INPUT/CS/TEXT/",
    result_text : root + "TEST_RESULT/TEXT/",
    result_pdf : root + "TEST_RESULT/PDF/",
  },

  setDate : function(date){
    this.date = date
  },

  writeJSON : function(path, json){
    fs.writeFileSync(path, JSON.stringify(json, null, 2))
  },

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
  },

  //Process steps
  copyFiles : function(){
    var sourceDir = this.path.emih_data_text + this.date
    var destDir = this.path.result_text + this.date
    log.debug("sourceDir : ", sourceDir, "\ndestdir : ", destDir)
    copyDir.sync(sourceDir, destDir)
  },

  renameEMIHFolders : function(){

    var nameMap = ".mappings/emihToID.json"
    var map = JSON.parse(fs.readFileSync(nameMap,  'utf8'))
    fs.readdirSync(dir).forEach((function(subFolder){
      var subFolderPath = dir + "/" + subFolder
      if(fs.lstatSync(subFolderPath).isDirectory()){
        if(map[subFolder] !== undefined){
          console.log(dir + "/" + subFolder, dir + "/" + map[subFolder])
          fs.renameSync(subFolderPath, dir + "/" + map[subFolder])
          this.renameSubFolders(dir + "/" + map[subFolder])
        } else {
          this.renameSubFolders(subFolderPath)
        }
      }
    }).bind(this))
  },

  getFolderDescriptors : function(){

  },

  performTests : function(){

  },
}

exports.testLib = testLib

//Tests
var string = "abc________abc_________abc"
var key = "abc"


//var indexes = testLib.getAllIndexes_2(string, key)
