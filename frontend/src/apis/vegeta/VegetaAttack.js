import API from '../api'

const VegetaAttack = async() => {
    let dataPost = {
        index: 3, 
        duration: 30,
        rate: 1,
        result_type: 'json',
        time_step: 100
    }

    const data = await API.post(`vegeta/attack`, dataPost);
    console.log(data)
    return data
}

export default VegetaAttack