#!/usr/bin/env node


const test = require('./testLib').testLib;

var date = process.argv[2]

console.log(date)

test.setDate(date)
test.copyFiles()
// test.renameEMIHFolders()
// test.getFolderDescriptors()
// test.performTests()
