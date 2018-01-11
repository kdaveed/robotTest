#!/usr/bin/env node

var fs = require("fs")
var copyDir = require("copy-dir")
const testLib = require('../testLib').testLib;

if (process.argv.length <= 2) {
    console.log("Usage: merge.js destdir sDir1 sDir2 .. sDirN");
    process.exit(-1);
}

var destdir = process.argv[2]
var sourceDir

console.log(process.argv)
for(var i = 2; i < process.argv.length; i++){

  sourceDir = process.argv[i]
  console.log(sourceDir, destdir)
  copyDir.sync(sourceDir, destdir)
  // fs.readdirSync.forEach(function(subFolder){
  //   if(fs.existsSync(destdir + "/" + subFolder)){
  //     //Copy the content
  //
  //   })
  // })
}

// var copyDir
// fs.readdirSync(dir).forEach(function(subFolder){
//   var subPath = sdir
// })
