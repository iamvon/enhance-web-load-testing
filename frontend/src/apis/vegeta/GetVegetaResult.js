import API from '../api'

const GetVegetaResult = async(postData) => {
    // console.log(postData)
    const data = await API.post(`vegeta/result/json`, postData);
    return data;
}

export default GetVegetaResult