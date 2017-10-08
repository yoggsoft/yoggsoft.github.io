#!/bin/bash
yes | docker-compose rm
docker-compose pull
docker-compose build
docker-compose run --rm node npm install --no-progress
docker-compose up --force-recreate web
