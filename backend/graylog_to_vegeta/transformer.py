import pandas
import numpy as np
import re
import json
import datetime

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
    return vegeta_format.strip()

def extract_endpoint_request_log(request):
    end_url_path_pattern = 'HTTP/'  
    start_url_path_pattern = '/'
    end_url_path_pos = re.search(end_url_path_pattern, request).start()
    endpoint_request_format = request[0:end_url_path_pos]
    start_url_path_pos = re.search(start_url_path_pattern, endpoint_request_format).start()
    endpoint_request_format = endpoint_request_format[start_url_path_pos:]
    return endpoint_request_format.strip()

def add_extra_data_by_filter_request(vegeta_format, index, request_method, content_type, http_authorization, request_body):
    request_body_file_path = ''
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
    return vegeta_format, request_body_file_path

def server_logs_to_vegeta_format(server_logs_file, vegeta_format_file):
    df = pandas.read_csv(server_logs_file)
    df['timestamp'] = pandas.to_datetime(df['timestamp']).dt.strftime("%m/%d/%Y, %H:%M:%S")
    for index, row in df.iterrows():
        vegeta_format = extract_url_path_request_log(df['request'][index], df['host'][index])
        vegeta_format, request_body_file_path = add_extra_data_by_filter_request(vegeta_format, index, df['request_method'][index], df['content_type'][index], df['http_authorization'][index], df['request_body'][index]) 
        df.loc[index, 'vegeta_format'] = vegeta_format
        df.loc[index, 'request_body_file'] = request_body_file_path
        endpoint_request_format = extract_endpoint_request_log(df['request'][index])
        df.loc[index, 'endpoint'] = endpoint_request_format
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
    return df.to_json(orient='records')

def search_by_timestamp(csv_file, timestamp):
    df = pandas.read_csv(csv_file)
    df = df[df['timestamp'] == timestamp]
    return df.to_json()

def search_logs_by_time_range(csv_file, start, end):
    search_logs_df = filter_by_time_range(csv_file, start, end)
    return search_logs_df.to_json(orient='records')   

def search_plan_by_time_range(csv_file, start, end):
    if(start == None or end == None):
        return {}
    search_plan_df = filter_by_time_range(csv_file, start, end)
    res = search_plan_df.sort_values(by='timestamp')
    res = search_plan_df[['timestamp', 'request_method', 'endpoint', 'request_body', 'content_type', 'http_authorization', 'http_user_agent', 'index']]
    res = res.groupby('timestamp').apply(lambda x: x.to_dict(orient='records')).to_json()
    return res   

def filter_by_time_range(csv_file, start, end):
    res = []
    df = pandas.read_csv(csv_file)
    df = df.sort_values(by='timestamp')
    mask = (df['timestamp'] >= start) & (df['timestamp'] <= end)
    df_time_range = df.loc[mask]
    df_time_range = df_time_range.sort_values(by='index')    
    return df_time_range   