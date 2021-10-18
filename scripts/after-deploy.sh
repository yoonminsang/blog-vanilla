#!/bin/bash
REPOSITORY=/home/ubuntu/blog-vanilla

cd $REPOSITORY
sudo cp -r dist/* /var/www/html/
sudo service nginx restart

cd $REPOSITORY
cd server
yarn install --frozen-lockfile
pm2 kill
yarn prod
