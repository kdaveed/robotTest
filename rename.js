#!/usr/bin/env node

var fs = require('fs')

var grntFolder = "/Library/CloudStorm/cs-rpa-templates/emih-bank-granit-statement1/TEXT/"
var kdbFolder = "/Library/CloudStorm/cs-rpa-templates/emih-bank-kdb-statement1/TEXT/"

var map = {
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

for(key in map){
  if(fs.existsSync("./csResult/" + key)){
    fs.renameSync("./csResult/" + key, "./csResult/" + map[key])
  }
}

//fs.renameSync("./testFilesRenamed", "./testFiles")
