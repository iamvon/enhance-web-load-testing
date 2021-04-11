import API from '../api'

const ConvertToVegetaFormat = async() => {
    let postData = {
        log_file: 'nginx-requests-log.csv'
    }
    
    const data = await API.post(`logs/transformer`, postData);
    return data;
}

export default ConvertToVegetaFormat