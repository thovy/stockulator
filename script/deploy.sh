#!/usr/bin/env bash
echo "> deploy"

REPOSITORY=/usr/deploy/stockulator
cd $REPOSITORY

npm build
npm start
