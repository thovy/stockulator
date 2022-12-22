#!/usr/bin/env bash
echo "> deploy"

REPOSITORY=/usr/deploy/stockulator
cd $REPOSITORY

npm start
