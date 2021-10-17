#!/bin/bash
REPOSITORY=/home/ubuntu/blog-vanilla
cd $REPOSITORY

cd server
yarn install
yarn build