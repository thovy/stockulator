#!/usr/bin/env bash
echo "> deploy"

sudo cp -rf /home/ec2-user/* /var/www/html
