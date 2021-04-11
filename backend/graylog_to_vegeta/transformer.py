import pandas
import numpy as np
import re
import json

GRAYLOG_TO_VEGETA_FOLDER = '/home/tuanpm/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/backend/graylog_to_vegeta'

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
            request_body_file_path = GRAYLOG_TO_VEGETA_FOLDER +'/request_body/' + str(index) + '.json' 
            with open(request_body_file_path, 'w+', encoding='utf-8') as f:
                f.write(request_body)       
            vegeta_format = vegeta_format + '\n' + '@' + request_body_file_path + '\n'
    elif (request_method == 'DELETE'):
        if(str(content_type) != 'nan'):
            vegeta_format = vegeta_format + '\n'+ 'Content-Type: ' + str(content_type) 
        if(str(http_authorization) != 'nan'):
            vegeta_format = vegeta_format + '\n' + 'Authorization: ' + str(http_authorization) 
    
    return vegeta_format

def server_logs_to_vegeta_format(server_logs_file, vegeta_format_file):
    df = pandas.read_csv(server_logs_file)
    df['timestamp'] = pandas.to_datetime(df['timestamp']).dt.strftime("%m/%d/%Y, %H:%M:%S")
    for index, row in df.iterrows():
        vegeta_format = extract_url_path_request_log(df['request'][index], df['host'][index])
        vegeta_format = add_extra_data_by_filter_request(vegeta_format, index, df['request_method'][index], df['content_type'][index], df['http_authorization'][index], df['request_body'][index]) 
        df.loc[index, 'vegeta_format'] = vegeta_format
    # Transfer server logs to vegeta format and save to new csv file
    df.to_csv(vegeta_format_file, index_label='index')
    # Read vegeta_format in dataframe to targets file
    for index, row in df.iterrows():
        targets_file_path = GRAYLOG_TO_VEGETA_FOLDER +'/vegeta/targets/' + 'targets.' + str(index) + '.txt'
        with open(targets_file_path, 'w+', encoding='utf-8') as f:
            f.write(df['vegeta_format'][index])
    return 'DONE'

def csv_to_json(csv_file):
    df = pandas.read_csv(csv_file)
    return df.to_json()

def search_by_timestamp(csv_file, timestamp):
    df = pandas.read_csv(csv_file)
    df = df[df['timestamp'] == timestamp]
    return df.to_json()

def search_by_time_range(csv_file, start, end):
    res = []
    df = pandas.read_csv(csv_file)
    start_df_idx = df[df['timestamp'] == start].iloc[0]['index']
    end_df_idx = df[df['timestamp'] == end].iloc[-1]['index'] + 1    
    df_time_range = df.iloc[start_df_idx:end_df_idx]
    return df_time_range.to_json()