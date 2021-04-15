import API from '../api'

const RunPlanByTimeRange = async (postData) => {
    const data = await API.post(`plan/run`, postData);
    console.log(data)
    return data;
}

export default RunPlanByTimeRange