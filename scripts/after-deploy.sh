#!/bin/bash
REPOSITORY=/home/ubuntu/blog-vanilla

cd $REPOSITORY
sudo cp -r client/dist/* /var/www/html/
sudo service nginx restart

cd server
yarn install --frozen-lockfile
pm2 kill
yarn prod
