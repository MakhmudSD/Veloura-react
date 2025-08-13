#!/bin/bash

# # PRODUCTION
git reset --hard
git checkout master
git pull origin master

npm i yarn -g
yarn add global serve
yarn run build
pm2 start "yarn run start:prod" --name=VELOURA-PERFUME

# # DEVELOPMENT
# git reset --hard
# git checkout develop
# git pull origin develop

# npm i
# pm2 start "npm run start:dev" --name=VELOURA-PERFUME

