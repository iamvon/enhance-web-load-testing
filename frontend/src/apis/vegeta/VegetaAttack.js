import API from '../api'

const VegetaAttack = async() => {
    let data = {
        index: 3, 
        duration: 30,
        rate: 1,
        result_type: 'json',
        time_step: 100
    }

    const res = await API.post(`vegeta/attack`, data);
    // console.log(res.data)
}

export default VegetaAttack