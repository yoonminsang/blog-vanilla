#!/bin/bash
REPOSITORY=/home/ubuntu/blog-vanilla
cd $REPOSITORY

cd client
sudo cp -r dist/* /var/www/html/
sudo service nginx restart

cd $REPOSITORY
cd server
yarn install --frozen-lockfile
yarn build
sudo pm2 reload api
