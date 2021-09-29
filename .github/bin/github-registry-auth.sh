#!/usr/bin/env bash
set -e
cat >.npmrc <<EOL
registry=https://registry.yarnpkg.com/
always-auth=true
//npm.pkg.github.com/:_authToken=$GIT_REGISTRY_TOKEN
@deepcrawl:registry=https://npm.pkg.github.com
EOL
