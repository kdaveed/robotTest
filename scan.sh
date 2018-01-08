#!/bin/bash
FILES=./emih/**/*
for file in $FILES
do
 if grep -q $1 $file; then
  echo ${file%/*}  | cut -d'/' -f 3
  FN=$(${file%/*}  | cut -d'/' -f 3)
  echo "${FN}"
 fi
done
