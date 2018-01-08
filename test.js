#!/usr/bin/env node

var fs = require('fs')

var dates = ["20171218", "20171219", "20171220"]

if (process.argv.length <= 3) {
    console.log("Usage: ***.js inputJSON rootFolder");
    process.exit(-1);
}

var datesPath = process.argv[2];
var rootFolder = process.argv[3];

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
