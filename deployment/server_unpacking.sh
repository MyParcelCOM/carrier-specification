#!/usr/bin/env bash
set -eo pipefail

cd ~/staging-docs.myparcel.com

echo "Unpacking files"
tar -xzvf carrier-spec-export.tar.gz --directory public/carrier-specification/
cp -r public/carrier-specification/dist/* public/carrier-specification/
rm -rf public/carrier-specification/dist

echo "Removing uploaded bundle"
rm ./carrier-spec-export.tar.gz
