import API from '../api'

const GetVegetaResult = async() => {
    const data = await API.get(`vegeta/result/json`);
    return data;
}

export default GetVegetaResult