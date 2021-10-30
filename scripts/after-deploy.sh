#!/bin/bash
REPOSITORY=/home/ubuntu/blog-vanilla

cd server
yarn install --frozen-lockfile
pm2 reload api