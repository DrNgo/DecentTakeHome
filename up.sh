#!/usr/bin/env bash

docker-compose up -d --build
sleep 10
npm i && npm start