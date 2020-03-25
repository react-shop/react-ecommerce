#!/bin/sh
export NODE_BINARY=node
export EXTRA_PACKAGER_ARGS="--entry-file packages/app/index.js"
../../../node_modules/react-native/scripts/react-native-xcode.sh

