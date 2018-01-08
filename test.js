#!/usr/bin/env node

var fs = require('fs')
var _ = require('underscore')
var log = require('loglevel');
log.setLevel("debug")

const testLib = require('./testLib').testLib;

if (process.argv.length <= 2) {
    console.log("Usage: ***.js directory");
    process.exit(-1);
}

var folder = process.argv[2]

var paths = testLib.getFolderVars(folder)
var dates = testLib.getDates(paths.dates)

console.log("Dates")
console.log(dates)

testLib.deleteFolderRecursive(paths.result)
testLib.createDir(paths.result)

var run  = function(){

  var filePath
  fs.readdirSync(paths.root).forEach(function(folderName) {

    var dir = paths.root + "/" + folderName
    console.log(folderName)
    if(fs.lstatSync(dir).isDirectory()){
        fs.readdirSync(dir).forEach(function(item){

          var dateFolder = getDateFolder(dir + "/" + item)
          log.debug("dateFolder : " + dateFolder)
          targetDir = paths.result + "/" + dateFolder //+ "/" + folderName
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
    results.push(testLib.getAllIndexes(content, date).length > 0)
    //Get the number of found dates
    //log.debug("resultArray : " + JSON.stringify(results))
    //log.debug("resultObject : " + JSON.stringify(resultObject))
  })

  var resultObject = _.countBy(results)
  switch(resultObject.true){
    case 0 :
      return "notFound"
    case 1 :
      return dates[_.indexOf(results, true)]
    default :
      return "multiple"
  }
}

run()
