#!/bin/bash

docker build --target app -t pokemon-service .
docker build --target job -t pokemon-requests .