#!/bin/bash
yes | docker-compose rm
docker-compose pull
docker-compose build
docker-compose run --rm build npm install --no-progress
docker-compose up --force-recreate web
