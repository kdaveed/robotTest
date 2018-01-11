#!/usr/bin/env node

var fs = require("fs")
const testLib = require('../testLib').testLib;

if (process.argv.length <= 3) {
    console.log("Usage: renameDir.js dir nameMap");
    process.exit(-1);
}

var dir = process.argv[2]
var nameMap = process.argv[3]

//TODO ERROR MSG for unknown input JSON file
var map = JSON.parse(fs.readFileSync(nameMap,  'utf8'))

var renameSubFolders = function(dir){

  fs.readdirSync(dir).forEach(function(subFolder){
    var subFolderPath = dir + "/" + subFolder
    if(fs.lstatSync(subFolderPath).isDirectory()){
      if(map[subFolder] !== undefined){
        console.log(dir + "/" + subFolder, dir + "/" + map[subFolder])
        fs.renameSync(subFolderPath, dir + "/" + map[subFolder])
        renameSubFolders(dir + "/" + map[subFolder])
      } else {
        renameSubFolders(subFolderPath)
      }
    }
  })
}

renameSubFolders(dir)
