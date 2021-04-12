from datetime import datetime

from influxdb_client import InfluxDBClient, Point, WritePrecision, WriteOptions
import pandas as pd

token = "H_mj_6qnv7tHJvgwdCh7UjOTzgLvHNxTwr3kYtVstBoludoE7LKMWfmlmYGOJttCih8MNvU6lfHBp76QLBu5qA=="
org = "enhance-web-load-testing"
bucket = "server-logs"

def init_connection():
    client = InfluxDBClient(url="http://localhost:8086", token=token, org = org)
    write_client = client.write_api(write_options=WriteOptions(batch_size=500,
                                                             flush_interval=10_000,
                                                             jitter_interval=2_000,
                                                             retry_interval=5_000,
                                                             max_retries=5,
                                                             max_retry_delay=30_000,
                                                             exponential_base=2))
    return [client, write_client] 

def write_data_frame_to_influxdb(client, write_client, csv_file, data_name):
    df = pd.read_csv(csv_file)
    # print(df)
    test = write_client.write(bucket, org, record=df, data_frame_measurement_name=data_name, data_frame_tag_columns=['vegeta_format'])
    # print(test)
    write_client.close()
    client.close()

# def get_data_influxdb():
    