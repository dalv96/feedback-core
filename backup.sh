#!/bin/sh
DIR=`date +%d%m%Y`
DEST=backups/$DIR
mkdir -p $DEST
mongodump -h localhost -d feedback -o $DEST
