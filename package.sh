#!/bin/sh

#https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Publishing_your_WebExtension
SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
ARCHIVENAME=block-utm

echo "Cleaning up target directory..."
rm -Rf $SCRIPTPATH/target

echo "Copying files into the target archive..."
rsync -r --exclude-from=$SCRIPTPATH/exclude.txt $SCRIPTPATH/. $SCRIPTPATH/target

echo "Compressing images..."
for file in $SCRIPTPATH/target/icons/*.png; do pngcrush "$file" "${file%.png}-crushed.png" && mv -v "${file%.png}-crushed.png" "$file"; done

echo "Ziping the finale archive..."
cd $SCRIPTPATH/target && zip -r -FS $ARCHIVENAME.zip . && cd $SCRIPTPATH

echo "Verifing the finale archive..."
unzip -l $SCRIPTPATH/target/$ARCHIVENAME.zip
