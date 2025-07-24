import axios from 'axios';

const BASE_URL = "http://127.0.0.1:5000/api";

export async function register (formData) {
    let response = {};
    try{
        console.log("calling register.")
        const {data} = await axios.post(BASE_URL + '/register', formData);
        response = data;
    } catch (e) {
        if (Number(formData.annualIncome) > 10000 && Number(formData.annualIncome) < 350000) {
            response =  {status: true, creditLimit: 500000, interestRate: 12.0, tenure: 5}
          } else {
            response = {status: false}
          }
    }
    console.log(response);
    return response;
}

const BackendApi = {
    register
  };
  
export default BackendApi;

