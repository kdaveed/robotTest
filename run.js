#!/usr/bin/env node


const test = require('./testLib').testLib;

var date = process.argv[2]

console.log(date)

test.setDate(date)

test.copyEmihFiles()
test.renameEMIHFolders()
test.getCSFiles()
test.mergeCSDirs()
test.getFolderDescriptors()
test.performTests()
