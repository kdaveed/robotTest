#!/usr/bin/env node

var fs = require('fs')
var _ = require('underscore')
var log = require('loglevel');
//log.setLevel("debug")

const testLib = require('./testLib').testLib;

if (process.argv.length <= 2) {
    console.log("Usage: ***.js directory");
    process.exit(-1);
}

var folder = process.argv[2]

var paths = testLib.getFolderVars(folder)
var dates = testLib.getDates(paths.dates)

console.log("dates")
console.log(JSON.stringify(dates))
testLib.deleteFolderRecursive(paths.result)
testLib.createDir(paths.result)

var run  = function(){

  var filePath
  fs.readdirSync(paths.root).forEach(function(folderName) {

    var dir = paths.root + "/" + folderName
    log.debug(folderName)
    if(fs.lstatSync(dir).isDirectory()){
        fs.readdirSync(dir).forEach(function(item){

          console.log("Dir : " + dir + " / " + item)
          var dateFolder = getDateFolder(dir + "/" + item)
          log.debug("dateFolder : " + dateFolder)
          testLib.createDir(paths.result + "/" + dateFolder)
          targetDir = paths.result + "/" + dateFolder + "/" + folderName
          testLib.copy(dir, targetDir, item)
      })
    }
  })
}

var getDateFolder = function(filePath){

  log.debug("getDateFolder : " + filePath)
  //Iterate on input dates
  var folder;
  var content = fs.readFileSync(filePath, "utf8")
  log.debug("content : " + content)
  var results = []
  dates.forEach(function(date){
    //results.push(testLib.getAllIndexes(content, date).length > 0)
    console.log(date)
    results.push(content.indexOf(date) >= 0)
  })

  console.log(content.indexOf("20171218"))
  console.log(results)

  var resultObject = _.countBy(results)
  switch(resultObject.true){
    case undefined :
      return "notFound"
    case 1 :
      log.debug("Found -------------------.................------------")
      return dates[_.indexOf(results, true)]
    default :
      return "multiple"
  }
}

run()
