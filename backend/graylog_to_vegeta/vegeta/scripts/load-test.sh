#!/bin/bash
index=$1 
duration=$2
rate=$3
result_type=$4
time_step=$5

vegeta=$HOME/Documents/Nam_4/Khoa_luan/vegeta_12.8.4_linux_amd64/vegeta 
vegeta_data=$HOME/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/backend/graylog_to_vegeta/vegeta
target_file=$vegeta_data/targets/targets.$index.txt 
results_file_bin=$vegeta_data/results/bin/result.$index.bin
results_file_json=$vegeta_data/results/json/result.$index.json

if [[ $result_type == "bin" ]]   
then 
    $vegeta attack -name=$index -duration="${duration}s" -rate=$rate --targets=$target_file | tee $results_file_bin | $vegeta report --type=text
elif [[ $result_type == "json" ]]
then 
    $vegeta attack -name=$index -duration="${duration}s" -rate=$rate --targets=$target_file | $vegeta report -every="${time_step}ms" -type=json -output=$results_file_json
fi