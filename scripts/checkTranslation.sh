#!/bin/sh

yarn translations:update

git diff --exit-code --quiet -- src/shared/i18n/locales/

if [ $? -eq 0 ]; then
    exit 0
else
    echo "Unextracted translations detected. Please run 'yarn translations:extract' to extract them."
    exit 1
fi
