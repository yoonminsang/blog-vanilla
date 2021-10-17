#!/bin/bash
REPOSITORY=/home/ubuntu/blog-vanilla
cd $REPOSITORY

cd client
sudo cp -r dist/* /var/www/html/
sudo service nginx restart

