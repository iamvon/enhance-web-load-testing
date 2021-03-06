import os
import json
import pathlib
import subprocess
from subprocess import PIPE, Popen, check_output
from flask import Flask, abort, request, redirect, url_for, jsonify, request
from werkzeug.utils import secure_filename
from flask_cors import CORS
from graylog_to_vegeta.transformer import server_logs_to_vegeta_format, csv_to_json, search_by_timestamp, search_logs_by_time_range, search_plan_by_time_range
from load_testing_plan.plan_processing import run_plan
from datetime import datetime
import threading
# from influxdb.influxdb_orm import write_data_frame_to_influxdb, init_connection

app = Flask(__name__)
CORS(app)

vegeta_script = '/home/tuanpm/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/backend/graylog_to_vegeta/vegeta/scripts/' + 'load-test.sh'
vegeta_result_json_path = '/home/tuanpm/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/backend/graylog_to_vegeta/vegeta/results/json/' 

UPLOAD_SERVER_LOGS_FOLDER = '/home/tuanpm/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/backend/graylog_to_vegeta/'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv'}

# client_influxdb, write_client_influxdb = init_connection()

def get_shell_script_output_using_communicate(target_file_name, duration, rate, result_type, time_step):
    session = Popen([vegeta_script, target_file_name, duration, rate, result_type, time_step], stdout=PIPE, stderr=PIPE)
    stdout, stderr = session.communicate()
    if stderr:
        raise Exception("Error "+str(stderr))
    return stdout.decode('utf-8')

@app.route('/vegeta/result/json', methods=['GET', 'POST'])
def get_vegeta_result_json():
    res = []
    data = request.json
    if(data['result_folder'] == None):
        print(len(res))
        return jsonify(res)
    result_file_list = []   
    result_file_path = ''    
    request_idx_data = data['request_idx']
    vegeta_result_json = vegeta_result_json_path + data['result_folder']
    for request_idx in request_idx_data:
        result_file_path = vegeta_result_json +  '/result.' + str(request_idx) + '.json' 
        result_file_list.append(result_file_path)
    for result_file in result_file_list:
        try:
            with open(result_file) as json_data:
                for line in json_data:
                    res.append(json.loads(line))
        except EnvironmentError: # parent of IOError, OSError *and* WindowsError where available
            continue
    print(len(res))
    return jsonify(res)

@app.route('/vegeta/attack', methods=['POST'])
def vegeta_attack():
    data = request.json
    print(str(data['index']), str(data['duration']), str(data['rate']), str(data['result_type']), str(data['time_step']))
    res = get_shell_script_output_using_communicate(str(data['index']), str(data['duration']), str(data['rate']), str(data['result_type']), str(data['time_step']))
    return res

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/logs/upload', methods=['GET', 'POST'])
def upload_server_logs():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            new_filename = 'nginx-requests-log.csv'
            file.save(os.path.join(UPLOAD_SERVER_LOGS_FOLDER, new_filename))
            return 'File uploaded successfully!'
    abort(404)

@app.route('/logs/transformer', methods=['GET', 'POST'])
def transfer_server_logs_to_vegeta_format():
    data = request.json
    server_log_file = os.path.join(UPLOAD_SERVER_LOGS_FOLDER, data['log_file'])
    vegeta_format_file = os.path.join(UPLOAD_SERVER_LOGS_FOLDER, 'nginx-requests-log-vegeta.csv')
    res = server_logs_to_vegeta_format(server_log_file, vegeta_format_file)
    return res

@app.route('/logs', methods=['GET', 'POST'])
def get_server_logs():
    data = request.json
    log_file = os.path.join(UPLOAD_SERVER_LOGS_FOLDER, data['log_file'])
    return csv_to_json(log_file)

@app.route('/logs/timestamp', methods=['GET', 'POST'])
def get_by_timestamp():
    data = request.json
    csv_file = os.path.join(UPLOAD_SERVER_LOGS_FOLDER, 'nginx-requests-log-vegeta.csv')
    return search_by_timestamp(csv_file, data['timestamp'])

@app.route('/logs/time_range', methods=['GET', 'POST'])
def get_by_time_range():
    data = request.json
    csv_file = os.path.join(UPLOAD_SERVER_LOGS_FOLDER, 'nginx-requests-log-vegeta.csv')
    return search_logs_by_time_range(csv_file, data['start'], data['end'])

@app.route('/plan/time_range', methods=['GET', 'POST'])
def get_plan_by_time_range():
    data = request.json
    csv_file = os.path.join(UPLOAD_SERVER_LOGS_FOLDER, 'nginx-requests-log-vegeta.csv')
    return search_plan_by_time_range(csv_file, data['start'], data['end'])

def run_plan_threaded(plan_func, req_idx, result_folder):
    plan_thread = threading.Thread(target=plan_func, args=(req_idx, result_folder,))
    plan_thread.start()

@app.route('/plan/run', methods=['GET', 'POST'])
def run_load_testing_plan():
    data = request.json
    now = datetime.now()
    result_folder = now.strftime("%m-%d-%Y_%H:%M:%S")   
    run_plan_threaded(run_plan, data, result_folder)
    return result_folder
    

# @app.route('/influxdb/server_logs/import', methods=['GET',])
# def import_server_logs_to_influxdb():
#     csv_file = os.path.join(UPLOAD_SERVER_LOGS_FOLDER, 'nginx-requests-log-vegeta.csv')
#     write_data_frame_to_influxdb(client_influxdb, write_client_influxdb, csv_file, 'nginx-requests-log-vegeta')
#     return 'import done'

# @app.route('/influxdb/server_logs', methods=['GET',])
# def get_server_logs_influxdb():
#     csv_file = os.path.join(UPLOAD_SERVER_LOGS_FOLDER, 'nginx-requests-log-vegeta.csv')
#     return ''

if __name__ == "__main__":         
    app.run(debug=True)
