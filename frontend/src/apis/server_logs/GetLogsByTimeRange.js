import API from '../api'

const GetLogsByTimeRange = async(start, end) => {
    let postData = {
        start: start,
        end: end
    }
    
    const data = await API.post(`logs/time_range`, postData);
    return data;
}

export default GetLogsByTimeRange