 #!/bin/bash
VERSION=$(node -e "console.log(require('./package.json').version);")
echo Current version = $VERSION

sed -i '' "s/sdkVersion = \".*\"/sdkVersion = \"$VERSION\"/g" ./ios/Services/CommsAPIModule.swift
sed -i '' "s/COMMS_SDK_VERSION=\".*\"/COMMS_SDK_VERSION=\"$VERSION\"/g" ./android/gradle.properties

