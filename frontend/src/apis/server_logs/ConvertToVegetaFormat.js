import API from '../api'

const ConvertToVegetaFormat = async() => {
    let data = {
        log_file: 'nginx-requests-log.csv'
    }
    
    const res = await API.post(`logs/transformer`, data);
    return res;
}

export default ConvertToVegetaFormat