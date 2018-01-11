#!/usr/bin/env node

const test = require('../testLib').testLib;

var eTc = {
  "Alef Kids_E-BANK": "alef_kids",
  "BÉT_E-BANK": "bet",
  "Brit Média_E-BANK": "brit_media",
  "Brüsszel Intézet_E-BANK": "bi",
  "CEDEK Alapítvány_E-BANK": "CEDEK_Alapítvány",
  "CEDEK Egyház_E-BANK": "CEDEK",
  "Chabad_E-BANK": "chabad",
  "EMIH Budapest_E-BANK": "emih_budapest",
  "EMIH Budavári_E-BANK": "EMIH_Budavari",
  "EMIH Debrecen (Terézváros)_E-BANK": "EMIH_DEBRECEN",
  "EMIH Dél-Magyarország_E-BANK": "EMIH_DEL_MO",
  "EMIH Észak-Magyarország (Tokaj)_E-BANK": "EMIH_ÉSZAK_MO",
  "EMIH Keszthely_E-BANK": "emih_keszthely",
  "EMIH Óbuda_E-BANK": "emih_obuda",
  "EMIH Újlipótváros_E-BANK": "EMIH_ujlipot",
  "EMIH _E-BANK": "emih",
  "Hanna_E-BANK": "Hanna",
  "Hága Intézet_E-BANK": "Haga_intezet",
  "Heszed_E-BANK": "Heszed",
  "KOLEL_E-BANK": "KOLEL_szeretetszolgalat",
  "Kóser_E-BANK": "koser",
  "Kőszeg_E-BANK": "Koszeg",
  "MAZSIT_E-BANK": "mazsit",
  "Magyar Holokauszt Túlélőkért A._E-BANK": "Holokauszt_Tulelokert_Alapitvany",
  "Maimonidesz Kft._E-BANK": "Maimonidesz_kft",
  "Maimonidesz Oktatási Központ_E-BANK": "Maimonidesz_okt_kozp",
  "Maimonidesz Zsidó Gimnázium_E-BANK": "maimonidesz_gimnazium",
  "Mádi Chewra Kadisha_E-BANK": "madi_chewra_kadisha",
  "OÁSZ_E-BANK": "oasz",
  "OLOESZ_E-BANK": "OLOESZ",
  "Of Tari_E-BANK": "oftari",
  "Ortodox Rabbinátus_E-BANK": "BP_ORTODOX_RABBINATUS",
  "Quality Poultry (QP)_E-BANK": "qualityp",
  "Rabbiház Kft._E-BANK": "rabbihaz_kft",
  "Shomer_E-BANK": "Shomer",
  "Strassbourg_E-BANK": "Strasbourg",
  "Talmud_E-BANK": "BP_TALMUD_EGYLET",
  "Tett és Védelem (TEV)_E-BANK": "tev",
  "ZSTSZ_E-BANK": "zstsz"
}

var cTi = {
   "oasz": "1091420",
   "bet": "1123150",
   "tev": "1162792",
   "bi": "1196688",
   "Hanna": "1200819",
   "CARMEL": "1220972",
   "alef_kids": "1240421",
   "CEDEK_Alapítvány": "1273343",
   "CEDEK": "1274630",
   "Strasbourg": "1280447",
   "Haga_intezet": "1280465",
   "maimonidesz": "1281007",
   "EMIH_ÉSZAK_MO": "1281075",
   "EMIH_DEBRECEN": "1281207",
   "EMIH_Budavari": "1281243",
   "Koszeg": "1281261",
   "maimonidesz_kft": "1285847",
   "OLOESZ": "00025085",
   "BP_ORTODOX_RABBINATUS": "1293442",
   "BP_TALMUD_EGYLET": "1296581",
   "emih_obuda": "00026106",
   "maimonidesz_gimnazium": "1306386",
   "chabad": "00013458",
   "emih": "00003459",
   "qualityp": "00017369",
   "emih_keszthely": "00017571",
   "emih_budapest": "00019745",
   "zstsz": "00020490",
   "koser": "00021753",
   "Heszed": "00023629",
   "Holokauszt_Tulelokert_Alapitvany": "00024094",
   "oftari": "00024636",
   "Shomer": "00025108",
   "KOLEL_szeretetszolgalat": "00026936",
   "EMIH_ujlipot": "00026937",
   "mazsit": "00028327",
   "brit_media": "00028328",
   "EMIH_DEL_MO": "00029476",
   "Maimonidesz_kft": "00039931",
   "Maimonidesz_okt_kozp": "00039933",
   "rabbihaz_kft": "00041271",
   "madi_chewra_kadisha": "00041567"
}

var eTi = {};

for(e in eTc){
  eTi[e] = cTi[eTc[e]]
}

test.writeJSON("./mappings/emitToId.json", eTi)
