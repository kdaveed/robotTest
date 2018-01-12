#!/usr/bin/env node

var fs = require('fs')

if (process.argv.length <= 2) {
    console.log("Usage: ***.js date");
    process.exit(-1);
}

var date = process.argv[2]

var folderMap = {
     "0872750" : "chabad",
     "0872900" : "emih",
     "1091420" : "oasz",
     "1123150" : "bet",
     "1162792" : "tev",
     "1196688" : "bi",
     "1200819" : "Hanna",
     "1220972" : "CARMEL",
     "1240421" : "alef_kids",
     "1273343" : "CEDEK_Alapítvány",
     "1274630" : "CEDEK",
     "1280447" : "Strasbourg",
     "1280465" : "Haga_intezet",
     "1281007" : "maimonidesz",
     "1281075" : "EMIH_ÉSZAK_MO",
     "1281207" : "EMIH_DEBRECEN",
     "1281243" : "EMIH_Budavari",
     "1281261" : "Koszeg",
     "1285847" : "maimonidesz_kft",
     "1293365" : "OLOESZ",
     "1293442" : "BP_ORTODOX_RABBINATUS",
     "1296581" : "BP_TALMUD_EGYLET",
     "1297523" : "emih_obuda",
     "1306386" : "maimonidesz_gimnazium",
     "00003459" : "emih",
     "00013458" : "chabad",
     "00017369" : "qualityp",
     "00017571" : "emih_keszthely",
     "00019745" : "emih_budapest",
     "00020490" : "zstsz",
     "00021753" : "koser",
     "00023629" : "Heszed",
     "00024094" : "Holokauszt_Tulelokert_Alapitvany",
     "00024636" : "oftari",
     "00025085" : "OLOESZ",
     "00025108" : "Shomer",
     "00026106" : "emih_obuda",
     "00026936" : "KOLEL_szeretetszolgalat",
     "00026937" : "EMIH_ujlipot",
     "00028327" : "mazsit",
     "00028328" : "brit_media",
     "00029476" : "EMIH_DEL_MO",
     "00039931" : "Maimonidesz_kft",
     "00039933" : "Maimonidesz_okt_kozp",
     "00041271" : "rabbihaz_kft",
     "00041567" : "madi_chewra_kadisha"
}

var path1 = "./csResult/"
var path2 = "./emih_data_dec/result"

var key1 = "cs"
var key2 = "emih"

var run = function(){
  var file = prepare()
  data = getDataFromFiles(file)
  return processMap(data)
}

var prepare = function(){

  var x = {}
  x[key1] = {}
  x[key2] = {}
  return x;
}

var getDataFromFiles = function(file){

  //Read the files in
  for(key in folderMap){
    var fullPath1 = path1 + folderMap[key]
    var fullPath2 = path2 + folderMap[key]
    setFile(fullPath1, key1)
    setFile(fullPath2, key2)
  }
  return files
}

var processMap = function(fileData){

  var result = {
    match : [],
    missing : {
      cs : [],
      emih : [],
    },
    duplicates : {
      cs : [],
      emih : [],
    }
  }

  checkDuplicates(fileData.emih)
  checkDuplicates(fileData.cs)
  return compare(fileData, "cs", "emih")
}

//Reading the file contents into the JS object
var setFile = function(path, type){
  if(fs.existsSync(path)){
    //Read in files
    fs.readdirSync(csPath).forEach((function(file, index){
      file[type][file] = fs.readFileSync(path + "/" + file)
    }))
  }
}

var compare = function(files){

  var compare = {
    match : [],
    missing : {
      cs : [],
      emih : [],
    },
  }

  //Compare
  for(fileName1 in files[key1]){
    content1 = files[key1][fileName1]
    for(fileName2 in files[key2]){
      content2 = files[key2][fileName2]
      if(content1 == content2){
        var match = {}
        match[key1] = fileName1
        match[key2] = fileName2
        compare.match.push(match)
        delete files[key1][fileName1]
        delete files[key2][fileName2]
      }
    }
  }

  //Set missing files
  for(fileName1 in files[key1]){
    compare.missing[key1].push(fileName1)
  }
  for(fileName2 in files[key2]){
    compare.missing[key2].push(fileName2)
  }

  return compare;
}

var checkDuplicates = function(fileMap){

  var fileNames = []
  var contents = []
  var duplicates = []
  for(fileName in fileMap){
    contents.push(fileMap[fileName])
    fileNames.push(fileName)
  }

  contents.forEach(function(content, index){
    contents.forEach(function(innerContent, innerIndex){
      if(index < innerIndex){
        if(content == innerContent){
          duplicates.push(index)
        }
      }
    })
  })

  //Removing duplicates
  duplicates.forEach(function(duplicate){
    delete fileMap[fileNames[duplicate]]
  })
}

//Test
var fileMap = {
  a : "aaa",
  b : "bbbb",
  c : "aaa",
}

var compareTest = {

  cs : {
    a_cs : "aaa",
    b_cs : "bbbb",
  },
  emih : {
    a_e : "aaa",
    b_e : "bbbb",
    c_e : "klsddkl",
  }
}

var test = {

  duplicate : function(){
    console.log("Duplicate elimination test")
    console.log(fileMap)
    checkDuplicates(fileMap)
    console.log(fileMap)
  },

  compare : function(){
    console.log("Comparisom test")
    console.log(compareTest)
    console.log(compare(compareTest))
  }
}

// test.duplicate()
// test.compare()

run()
