import pandas
import numpy as np
import re
import json
import pathlib

df = pandas.read_csv('nginx-requests-log.csv', parse_dates=['timestamp'])

def extract_url_path_request_log(request, host):
    end_url_path_pattern = 'HTTP/'  
    start_url_path_pattern = '/'
    host = 'http://' + host
    end_url_path_pos = re.search(end_url_path_pattern, request).start()
    vegeta_format = request[0:end_url_path_pos]
    start_url_path_pos = re.search(start_url_path_pattern, vegeta_format).start()
    vegeta_format = vegeta_format[:start_url_path_pos] + host + vegeta_format[start_url_path_pos:]
    # print(vegeta_format)
    return vegeta_format

def add_extra_data_by_filter_request(vegeta_format, index, request_method, content_type, http_authorization, request_body):
    if (request_method == 'POST' or request_method == 'PUT'):
        if(str(content_type) != 'nan'):
            vegeta_format = vegeta_format + '\n'+ 'Content-Type: ' + str(content_type) 
        if(str(http_authorization) != 'nan'):
            vegeta_format = vegeta_format + '\n' + 'Authorization: ' + str(http_authorization) 
        if(str(request_body) != 'nan'):
            request_body_file_path = str(pathlib.Path().absolute()) +'/request_body/' + str(index) + '.json' 
            with open(request_body_file_path, 'w+', encoding='utf-8') as f:
                f.write(request_body)       
            vegeta_format = vegeta_format + '\n' + '@' + request_body_file_path + '\n'
    elif (request_method == 'DELETE'):
        if(str(content_type) != 'nan'):
            vegeta_format = vegeta_format + '\n'+ 'Content-Type: ' + str(content_type) 
        if(str(http_authorization) != 'nan'):
            vegeta_format = vegeta_format + '\n' + 'Authorization: ' + str(http_authorization) 
    
    return vegeta_format

for index, row in df.iterrows():
    vegeta_format = extract_url_path_request_log(df['request'][index], df['host'][index])
    vegeta_format = add_extra_data_by_filter_request(vegeta_format, index, df['request_method'][index], df['content_type'][index], df['http_authorization'][index], df['request_body'][index]) 
    df.loc[index, 'vegeta_format'] = vegeta_format

df.to_csv('nginx-requests-log-vegeta.csv')

# Read vegeta_format in dataframe to targets file
for index, row in df.iterrows():
    targets_file_path = str(pathlib.Path().absolute()) +'/vegeta/targets/' + 'targets.' + str(index) + '.txt'
    with open(targets_file_path, 'w+', encoding='utf-8') as f:
        f.write(df['vegeta_format'][index])