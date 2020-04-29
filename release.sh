#!/bin/bash

echo "##### Installing dependencies"
npm install
echo "##### Building release"
npm run build
echo "##### Removing old files from release folder"
rm -r /var/www/checklist.space/html/*
echo "##### Copying new build to release folder"
cp -r ./dist/space-checklist/* /var/www/checklist.space/html