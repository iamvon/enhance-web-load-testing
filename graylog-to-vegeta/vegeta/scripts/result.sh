#!/bin/bash
vegeta=$HOME/Documents/Nam_4/Khoa_luan/vegeta_12.8.4_linux_amd64/vegeta \
vegeta_data=$HOME/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/graylog-to-vegeta/vegeta
results_folder=$vegeta_data/results/
plot_folder=$vegeta_data/plots/

cd $results_folder
# $vegeta plot result.*.bin > $plot_folder/result.html 
