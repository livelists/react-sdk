#!/usr/bin/env bash

npm run link-local-libs

rm -rf "/Users/nikitakrainev/Desktop/LiveLists/mychat/web-client/node_modules/livelists-js-core/dist"
rm -rf "/Users/nikitakrainev/Desktop/LiveLists/mychat/web-client/node_modules/livelists-react-sdk/dist"
cp -R "/Users/nikitakrainev/Desktop/LiveLists/Client/client-js-core/dist" "/Users/nikitakrainev/Desktop/LiveLists/mychat/web-client/node_modules/livelists-js-core/dist"
cp -R "./dist" "/Users/nikitakrainev/Desktop/LiveLists/mychat/web-client/node_modules/livelists-react-sdk/dist"
