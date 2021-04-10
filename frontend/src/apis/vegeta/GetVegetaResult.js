import API from '../api'

const GetVegetaResult = async() => {
    const res = await API.get(`vegeta/result/json`);
    return res;
}

export default GetVegetaResult