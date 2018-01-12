var fs = require('fs')
var log = require('loglevel');
var copyDir = require("copy-dir")
var _ = require('underscore')

log.setLevel("debug")

var root = "/Library/CloudStorm/RPA_Test/"
var grnt = "/Library/CloudStorm/cs-rpa-templates/emih-bank-granit-statement1/collection/"
var kdb = "/Library/CloudStorm/cs-rpa-templates/emih-bank-kdb-statement1/collection/"

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

  getJSON : function(path){
    return JSON.parse(fs.readFileSync(path, "utf8"))
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

  compare : function(cs, emih){

    var diffObject = this.compareLists(Object.keys(cs.folders), Object.keys(emih.folders))
    var csFolders = cs.folders
    var emihFolders = emih.folders
    diffObject.matches = {}
    log.debug("compare:both: ", diffObject.both)
    diffObject.both.forEach((function(key){
      csObject =  csFolders[key].files
      emihObject = emihFolders[key].files
      diffObject.matches[key] = this.compareListsArray(csObject, emihObject)
    }).bind(this))
    return diffObject
  },

  compareListsArray : function(csObject, emihObject){
    var cs = Object.keys(csObject)
    var emih = Object.keys(emihObject)
    log.debug("csKeys :", cs, "emihKeys", emih)
    var object = {
      both : _.intersection(cs, emih),
      missingFromEMIH : _.difference(cs, emih),
      missingFromCS : _.difference(emih, cs),
      sizeNotMatches : [],
    }
    log.debug("compare:both: ", object.both)
    object.both.forEach(function(size){
      if(csObject[size].length !== emihObject[size].length){
        object.sizeNotMatches.push(size)
      }
    })
    for(key in object){
      if(object[key].length == 0) delete object[key]
    }
    if(Object.keys(object).length == 1 && Object.keys(object)[0] == "both")
      object = "OK"
    return object
  },

  compareLists : function(cs, emih){
    var object = {
      both : _.intersection(cs, emih),
      missingFolderFromEMIH : _.difference(cs, emih),
      missingFolderFromCS : _.difference(emih, cs),
    }
    for(key in object){
      if(object[key].length == 0) delete object[key]
    }
    return object
  },

  renameSubFolders : function(map, dir){

    fs.readdirSync(dir).forEach((function(subFolder){
      var subFolderPath = dir + "/" + subFolder
      if(fs.lstatSync(subFolderPath).isDirectory()){
        if(map[subFolder] !== undefined){
          fs.renameSync(subFolderPath, dir + "/" + map[subFolder])
          this.renameSubFolders(map, dir + "/" + map[subFolder])
        } else {
          this.renameSubFolders(map, subFolderPath)
        }
      }
    }).bind(this))
  },

  getDescriptor : function(folderPath){
    var object = {}
    //object.path = folderPath
    object.folders = {}
    object.files = {}
    fs.readdirSync(folderPath).forEach((function(subFolder){

      var subPath = `${folderPath}/${subFolder}`
      var fileStat = fs.lstatSync(subPath)
      if(fileStat.isDirectory()){
        object.folders[subFolder] = this.getDescriptor(subPath)
      } else {
        if(object.files[fileStat.size] === undefined){
          object.files[fileStat.size] = []
          object.files[fileStat.size].push(subFolder)
        } else {
          //Check if not existing
          var different = true
          object.files[fileStat.size].forEach(function(fileName){
            var content = fs.readFileSync(`${folderPath}/${fileName}`, 'utf8')
            var currentContent = fs.readFileSync(`${folderPath}/${subFolder}`, 'utf8')
            if(content == currentContent){
              different = false
            }
          })
          if(different) object.files[fileStat.size].push(subFolder)
        }
      }
    }).bind(this))
    if(Object.keys(object.files).length === 0) delete object.files
    if(Object.keys(object.folders).length === 0) delete object.folders

    return object
  },

  mergeCSDirs : function(){

    var duplicates = [
        {
          //chabad
          from : "0872750",
          to : "00013458"
        },{
          //emih
          from : "0872900",
          to : "00003459"
        }, {
          //oloesz
          from : "1293365",
          to : "00025085"
        }, {
          //emih_obuda
          from : "1297523",
          to : "00026106"
        }, {
          //Maimonidesz_okt_kozp
          from : "1281007",
          to : "00039933",
        }
    ]

    duplicates.forEach((function(duplicate){
      var sourceDir = this.path.test_input_cs_text +
        this.date + "/" + duplicate.from
      var destDir = this.path.test_input_cs_text +
        this.date + "/" + duplicate.to
      log.debug("sourceDir : ", sourceDir, "\ndestdir : ", destDir)
      if(fs.existsSync(sourceDir)){
        log.debug("exists")
        this.createDir(destDir)
        copyDir.sync(sourceDir, destDir)
        this.deleteFolderRecursive(sourceDir)
      }

    }).bind(this))
  },

  //Process steps
  copyEmihFiles : function(){

    log.debug("copyEmihFiles")
    var sourceDir = this.path.emih_data_text + this.date
    var destDir = this.path.test_input_emih_text + this.date
    this.createDir(destDir)
    this.deleteFolderRecursive(destDir)
    log.debug("sourceDir : ", sourceDir, "\ndestdir : ", destDir)
    copyDir.sync(sourceDir, destDir)
  },

  renameEMIHFolders : function(){

    log.debug("renameEMIHFolders")
    var nameMap = "./mappings/emihToID.json"
    var map = JSON.parse(fs.readFileSync(nameMap,  'utf8'))
    this.renameSubFolders(map, this.path.test_input_emih_text + this.date)
  },

  getCSFiles : function(){

    log.debug("getCSFiles")
    var destDir = this.path.test_input_cs_text + this.date
    this.deleteFolderRecursive(destDir)
    copyDir.sync(grnt + this.date, destDir)
    copyDir.sync(kdb + this.date, destDir)
  },

  getFolderDescriptors : function(){

    log.debug("getFolderDescriptors")
    var outputPath =  this.path.result_text + this.date
    this.createDir(outputPath)

    //CS
    var cs = this.getDescriptor(this.path.test_input_cs_text + this.date)
    fs.writeFileSync(outputPath + "/cs.json", JSON.stringify(cs, null, 2))

    //EMIH
    var emih = this.getDescriptor(this.path.test_input_emih_text + this.date)
    fs.writeFileSync(outputPath + "/emih.json", JSON.stringify(emih, null, 2))

  },

  performTests : function(){

    log.debug("performTests")
    var outputPath =  this.path.result_text + this.date
    var res = this.compare(this.getJSON(outputPath + "/cs.json"), this.getJSON(outputPath + "/emih.json"))
    this.writeJSON(outputPath + "/result.json", res)
    console.log(JSON.stringify(res, null, 2))
  },
}

exports.testLib = testLib

//Tests
var string = "abc________abc_________abc"
var key = "abc"


//var indexes = testLib.getAllIndexes_2(string, key)
