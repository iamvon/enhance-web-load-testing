import threading
import schedule
import time
from datetime import datetime
from subprocess import PIPE, Popen, check_output

vegeta_script = '/home/tuanpm/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/backend/graylog_to_vegeta/vegeta/scripts/' + 'load-test.sh'

def get_shell_script_output_using_communicate(target_file_name, duration, rate, result_type, time_step):
    session = Popen([vegeta_script, target_file_name, duration, rate, result_type, time_step], stdout=PIPE, stderr=PIPE)
    stdout, stderr = session.communicate()
    if stderr:
        raise Exception("Error "+str(stderr))
    return stdout.decode('utf-8')

def vegeta_attack(req_idx):
    return get_shell_script_output_using_communicate(str(req_idx), str(30), str(1), 'json', str(100))

def run_vegeta_attack_threaded(job_func, req_idx):
    job_thread = threading.Thread(target=job_func, args=(req_idx,))
    job_thread.start()

def job(plan_detail):
    # print(plan_detail)
    now = datetime.now()
    print(now.strftime("%m/%d/%Y, %H:%M:%S"))
    for data in plan_detail:
        print(data['index']) 
        run_vegeta_attack_threaded(vegeta_attack, data['index'])
    print('--------------------------')
    return schedule.CancelJob

def run_plan(plan):
    timestamp_list, time_step_list = get_time_list(plan)
    print(time_step_list) 

    time_step_idx = 0
    if(len(time_step_list) > 0):
        time_step = time_step_list[time_step_idx]
    else:
        return 'EMPTY PLAN'
    
    # Run first job
    job(plan[timestamp_list[time_step_idx]])

    while True:
        if(time_step_idx >= len(time_step_list)):
            # Run final job
            job(plan[timestamp_list[time_step_idx]])
            # now = datetime.now()
            # print(now.strftime("%m/%d/%Y, %H:%M:%S"))            
            break
        time_step = time_step_list[time_step_idx]

        schedule.every().seconds.do(job, plan[timestamp_list[time_step_idx+1]])
        schedule.run_pending()
        # now = datetime.now()
        # print(now.strftime("%m/%d/%Y, %H:%M:%S"))
        time.sleep(time_step)
        time_step_idx = time_step_idx+1
    
    return 'DONE'

def get_time_list(plan):
    time_step_list = [] 
    timestamp_list = list(plan)
    
    for timestamp in timestamp_list:
        next_timestamp_idx = timestamp_list.index(timestamp) + 1
        if(next_timestamp_idx >= len(timestamp_list)):
            break
        time_step = datetime.strptime(timestamp_list[next_timestamp_idx], "%m/%d/%Y, %H:%M:%S") - datetime.strptime(timestamp, "%m/%d/%Y, %H:%M:%S")
        time_step_list.append(time_step.seconds)
    return timestamp_list, time_step_list 
