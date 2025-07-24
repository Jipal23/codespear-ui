import axios from 'axios';

const BASE_URL = "http://localhost:8080";

export async function register (data) {
    let response = {};
    try{
        console.log("calling register.")
        response = await axios.post(BASE_URL + '/register', data, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
    } catch (e) {
        if (Number(data.annualIncome) > 10000 && Number(data.annualIncome) < 350000) {
            response =  {approved: true, creditLimit: 500000, interestRate: 12.0, tenure: 5}
          } else {
            response = {approved: false}
          }
    }
    return response;
}

const BackendApi = {
    register
  };
  
export default BackendApi;

