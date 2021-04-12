import API from '../api'

const GetServerLogs = async() => {
    let postData = {
        log_file: 'nginx-requests-log-vegeta.csv'
    }
    
    const data = await API.post(`logs`, postData)
    return data;
}

export default GetServerLogs