#!/bin/bash
REPOSITORY=/home/ubuntu/blog-vanilla

cd server
yarn install
pm2 reload api