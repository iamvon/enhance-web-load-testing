#!/bin/bash
index=$1 
duration=$2
rate=$3

vegeta=$HOME/Documents/Nam_4/Khoa_luan/vegeta_12.8.4_linux_amd64/vegeta 
vegeta_data=$HOME/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/graylog-to-vegeta/vegeta
target_file=$vegeta_data/targets/targets.$index.txt 
results_file=$vegeta_data/results/result.$index.bin

$vegeta attack -name=$index -duration="${duration}s" -rate=$rate --targets=$target_file | tee $results_file | $vegeta report --type=text