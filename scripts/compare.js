#!/usr/bin/env node


var _ = require('underscore')

var log = require('loglevel');
log.setLevel("debug")

const testLib = require('../testLib').testLib;


// if (process.argv.length <= 2) {
//     console.log("Usage: compare.js emihJSON csJSON output");
//     process.exit(-1);
// }

// var cs = JSON.parse(fs.readFileSync(csJSON, 'utf8'))
// var emih = JSON.parse(fs.readFileSync(emihJSON, 'utf8'))

var cs = ["a", "b"]
var emih = ["b", "c"]

var compare = function(cs, emih){

  var diffObject = compareLists(Object.keys(cs.folders), Object.keys(emih.folders))
  var csFolders = cs.folders
  var emihFolders = emih.folders
  diffObject.matches = {}
  log.debug("compare:both: ", diffObject.both)
  diffObject.both.forEach(function(key){
    csObject =  csFolders[key].files
    emihObject = emihFolders[key].files
    diffObject.matches[key] = compareListsArray(csObject, emihObject)
  })
  return diffObject
}

var compareListsArray = function(csObject, emihObject){
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
  return object
}

var compareLists = function(cs, emih){
  return {
    both : _.intersection(cs, emih),
    missingFolderFromEMIH : _.difference(cs, emih),
    missingFolderFromCS : _.difference(emih, cs),
  }
}

var cs = {
  1 : ["x"],
  2 : ["a", "b"],
  3 : ["k"],
}

var emih = {
  1 : ["x"],
  2 : ["c"],
  4 : ["l"],
}

var csTest = {
  folders  : {
    1 :  {
      files : cs,
    },
    2 : {},
  }
}

var emihTest = {
  folders  : {
    1 :  {
      files : emih,
    },
    3 : {},
  }
}

var result = run(csTest, emihTest)
console.log(result)
testLib.writeJSON("x.json", result)
