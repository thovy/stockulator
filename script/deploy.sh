#!/usr/bin/env bash
echo "> deploy"

sudo cp -rf /home/ubuntu/stockulator/dist/* /var/www/html
