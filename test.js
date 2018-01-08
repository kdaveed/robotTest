#!/usr/bin/env node

var fs = require('fs')

var dates = ["20171218", "20171219", "20171220"]


if (process.argv.length <= 2) {
    console.log("Usage: ***.js directory");
    process.exit(-1);
}

var folder = process.argv[2]
var datesPath = folder + "/dates.json";
var rootFolder = folder + "root";

console.log(datesPath)
console.log(rootFolder)

fs.readFile('dates.json', 'utf8', function(err, data){
    if(err){
      console.log(err)
      process.exit(-1);
    } else {
      console.log(JSON.parse(data))
    }
})

//Delete result folder
var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

//deleteFolderRecursive(folder + "/result")
var copy = function(folderName, fileName){

  //Create file dir
  var sourceFolder = folder + "/root/" + folderName
  var targetFolder = folder + "/result/" + folderName

  createDir(targetFolder);

  var sourceFile = sourceFolder + "/" + fileName
  var targetFile = targetFolder + "/" + fileName

  //Copy file
  fs.createReadStream(sourceFile).pipe(fs.createWriteStream(targetFile));
}

var createDir = function(path){

  if(!fs.existsSync(path)){
    fs.mkdir(path, function(err, data){
      if(err){
        console.log(err)
      }
    })
  }
}

copy("a", "a_a.txt")


/*
fs.readdir(path, function(err, items) {

    console.log(items);
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }

});
*/

var chech = function(filePath){

  switch(contains(filePath)){

    case "yes" :

      break;
    case "no" :

      break;
    case "undecideable" :

      break;
  }
}

var contains = function(filePath){

  //Iterate on input dates
  var result = []
  dates.forEach(function(date){
    //Read files
    fs.readFile(filePath, "utf8", function(err, data) {
      result.push(getAllIndexes(data,"a").length > 0)
    });
  })
}

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

contains("1.txt")
