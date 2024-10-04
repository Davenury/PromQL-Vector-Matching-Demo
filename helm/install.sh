#!/bin/bash

helm dependency build
helm install grafana . -f grafana-values.yaml -f prometheus-values.yaml 