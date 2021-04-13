import API from '../api'

const GetPlanByTimeRange = async(postData) => {
    const data = await API.post(`plan/time_range`, postData);
    return data;
}

export default GetPlanByTimeRange