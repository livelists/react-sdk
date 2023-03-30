#!/usr/bin/env bash

npm run link-local-libs

rm -rf "/home/nikrainev/Desktop/mychat/web-client/node_modules/livelists-js-core/dist"
rm -rf "/home/nikrainev/Desktop/mychat/web-client/node_modules/livelists-react-sdk/dist"
cp -R "/home/nikrainev/Desktop/livelists/client-js-core/dist" "/home/nikrainev/Desktop/mychat/web-client/node_modules/livelists-js-core/dist"
cp -R "./dist" "/home/nikrainev/Desktop/mychat/web-client/node_modules/livelists-react-sdk/dist"
