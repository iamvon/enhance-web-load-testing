import subprocess
from subprocess import Popen, PIPE
from subprocess import check_output
import pathlib
from flask import Flask

app = Flask(__name__)

vegeta_script = '/home/tuanpm/Documents/Nam_4/Khoa_luan/enhance-web-load-testing/graylog-to-vegeta/vegeta/scripts/' + 'load-test.sh'

def get_shell_script_output_using_communicate(target_file_name, duration, rate):
    session = Popen([vegeta_script, target_file_name, duration, rate], stdout=PIPE, stderr=PIPE)
    stdout, stderr = session.communicate()
    if stderr:
        raise Exception("Error "+str(stderr))
    return stdout.decode('utf-8')

@app.route('/',methods=['GET',])
def home():
    res = ''
    for i in range(15):
        res = res + '<pre>'+get_shell_script_output_using_communicate(str(i), str(1),str(5))+'</pre>'
    return res

app.run(debug=True)
