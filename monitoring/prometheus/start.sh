#!/bin/bash
# sudo docker run --name prometheus -d -p 127.0.0.1:9090:9090 -v /home/tuanpm/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus

prometheus=$HOME/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/monitoring/prometheus/prometheus-2.26.0.linux-amd64/prometheus

$prometheus --config.file=./prometheus.yml

