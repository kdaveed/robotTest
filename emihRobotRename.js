#!/usr/bin/env node

var fs = require('fs')
var copyDir = require('copy-dir')

var folder = "EMIH_RESULT_JAN_1/result/20180102/"

var emihMap = {
  'Alef Kids_E-BANK': 'alef_kids',
  'BÉT_E-BANK': 'bet',
  'Brit Média_E-BANK': 'brit_media',
  'Brüsszel Intézet_E-BANK': "bi",
  'CEDEK Alapítvány_E-BANK': "CEDEK_Alapítvány",
  'CEDEK Egyház_E-BANK': "CEDEK",
  'Chabad_E-BANK': "chabad",
  'EMIH Budapest_E-BANK': "emih_budapest",
  'EMIH Budavári_E-BANK': "EMIH_Budavari",
  'EMIH Debrecen (Terézváros)_E-BANK': "EMIH_DEBRECEN",
  'EMIH Dél-Magyarország_E-BANK': "EMIH_DEL_MO",
  'EMIH Észak-Magyarország (Tokaj)_E-BANK': "EMIH_ÉSZAK_MO",
  'EMIH Keszthely_E-BANK': "emih_keszthely",
  'EMIH Óbuda_E-BANK': "emih_obuda",
  'EMIH Újlipótváros_E-BANK': "EMIH_ujlipot",
  'EMIH _E-BANK': "emih",
  'Hanna_E-BANK': "Hanna",
  'Hága Intézet_E-BANK': "Haga_intezet",
  'Heszed_E-BANK': "Heszed",
  'KOLEL_E-BANK': "KOLEL_szeretetszolgalat",
  'Kóser_E-BANK': "koser",
  'Kőszeg_E-BANK': "Koszeg",
  'MAZSIT_E-BANK': "mazsit",
  'Magyar Holokauszt Túlélőkért A._E-BANK': "Holokauszt_Tulelokert_Alapitvany",
  'Maimonidesz Kft._E-BANK': "Maimonidesz_kft",
  'Maimonidesz Oktatási Központ_E-BANK': "Maimonidesz_okt_kozp",
  'Maimonidesz Zsidó Gimnázium_E-BANK': "maimonidesz_gimnazium",
  'Mádi Chewra Kadisha_E-BANK': "madi_chewra_kadisha",
  'OÁSZ_E-BANK': "oasz",
  'OLOESZ_E-BANK': "OLOESZ",
  'Of Tari_E-BANK': "oftari",
  'Ortodox Rabbinátus_E-BANK': "BP_ORTODOX_RABBINATUS",
  'Quality Poultry (QP)_E-BANK': "qualityp",
  'Rabbiház Kft._E-BANK': "rabbihaz_kft",
  'Shomer_E-BANK': "Shomer",
  'Strassbourg_E-BANK': "Strasbourg",
  'Talmud_E-BANK': "BP_TALMUD_EGYLET",
  'Tett és Védelem (TEV)_E-BANK': "tev",
  'ZSTSZ_E-BANK': "zstsz"
}

for(key in emihMap){
  if(fs.existsSync(folder + key)){
    fs.renameSync(folder + key, folder + emihMap[key])
  }
}

//fs.renameSync("./testFilesRenamed", "./testFiles")
