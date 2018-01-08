#!/usr/bin/env node

var fs = require('fs')
var _ = require('underscore')

const testLib = require('./testLib').testLib;

var dates = ["20171218", "20171219", "20171220"]

if (process.argv.length <= 2) {
    console.log("Usage: ***.js directory");
    process.exit(-1);
}

var folder = process.argv[2]

var paths = testLib.getFolderVars(folder)
var dates = testLib.getDates(paths.dates)

testLib.deleteFolderRecursive(paths.result)

var run  = function(){

  fs.readdirSync(paths.root).forEach(function(folderName) {

    var file = paths.root + "/" + folderName
    console.log(folderName)
    if(fs.lstatSync(file).isDirectory()){
        fs.readdirSync(file).forEach(function(iitem){
          console.log("\t" + iitem)
      })
    }
  })
}

run()

var check = function(folderName, fileName){

  var filePath = folderName + "/" + fileName
  testLib.copy(getFolder(filePath), folderName, fileName)
}

var getFolder = function(filePath){

  //Iterate on input dates
  var results = []
  testLib.dates.forEach(function(date){
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
