#!/usr/bin/env node

var fs = require("fs")
var copyDir = require("copy-dir")

if (process.argv.length <= 2) {
    console.log("Usage: folderDescriptor.js dir output");
    process.exit(-1);
}

var dir = process.argv[2]
var output = process.argv[3]

var getDescriptor = function(folderPath){
  var object = {}
  //object.path = folderPath
  object.folders = {}
  object.files = {}
  fs.readdirSync(folderPath).forEach(function(subFolder){

    var subPath = `${folderPath}/${subFolder}`
    var fileStat = fs.lstatSync(subPath)
    if(fileStat.isDirectory()){
      object.folders[subFolder] = getDescriptor(subPath)
    } else {
      object.files[subFolder] = {
        size : fileStat.size
      }
    }
  })
  if(Object.keys(object.files).length === 0) delete object.files
  if(Object.keys(object.folders).length === 0) delete object.folders

  return object
}

var desc = getDescriptor(dir)
fs.writeFileSync(output, JSON.stringify(desc, null, 2))
