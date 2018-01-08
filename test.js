#!/usr/bin/env node

var fs = require('fs')
var _ = require('underscore')

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

var run  = function(){

  var filePath
  fs.readdirSync(paths.root).forEach(function(folderName) {

    var dir = paths.root + "/" + folderName
    console.log(folderName)
    if(fs.lstatSync(dir).isDirectory()){
        fs.readdirSync(dir).forEach(function(item){

          targetDir = paths.result + "/" + getFolder(dir + "/" + item)
          testLib.copy(dir, targetDir, fileName)
      })
    }
  })
}

var getFolder = function(filePath){

  //Iterate on input dates
  dates.forEach(function(date){

    var results = []
    //Read files
    fs.readFile(filePath, "utf8", function(err, data) {
      results.push(getAllIndexes(data,"a").length > 0)
    });

    //Get the number of found dates
    var resultObject = _.countBy(results)
    switch(resultObject.true){
      case 0 :
        return "notFound"
      case 1 :
        return dates[_.indexOf(results, true)]
      default :
        return "multiple"
    }
  })
}

run()
