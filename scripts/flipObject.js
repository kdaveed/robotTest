#!/usr/bin/env node

var fs = require("fs")
const testLib = require('../testLib').testLib;


if (process.argv.length <= 3) {
    console.log("Usage: fileObject.js inputJSON outputJSON");
    process.exit(-1);
}

var inputJSON = process.argv[2]
var outputJSON = process.argv[3]

var object = JSON.parse(fs.readFileSync(inputJSON,  'utf8'))
var flipped = {}

for(key in object){
  flipped[object[key]] = key
}

fs.writeFileSync(outputJSON, JSON.stringify(flipped, null, 3))
console.log(flipped)
