#!/bin/bash
REPOSITORY=/home/ubuntu/blog-vanilla

cd $REPOSITORY
sudo cp -r dist/* /var/www/html/
sudo service nginx restart

cd $REPOSITORY
cd server