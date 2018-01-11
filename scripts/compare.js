#!/usr/bin/env node


var _ = require('underscore')

// if (process.argv.length <= 2) {
//     console.log("Usage: compare.js emihJSON csJSON output");
//     process.exit(-1);
// }
var cs = ["a", "b"]
var emih = ["b", "c"]

var compareLists = function(cs, emih){
  return {
    both : _.intersection(cs, emih),
    missingFromEMIH : _.difference(cs, emih),
    missingFromCS : _.difference(emih, cs),
  }
}

var diff = compareLists(cs, emih)
console.log(diff)
