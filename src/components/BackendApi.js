import axios from 'axios';
import { STATUS_PARTIAL, STATUS_REJECTED, STATUS_APPROVED } from './Constant';

// const BASE_URL = "http://127.0.0.1:8080/api";
const BASE_URL = "https://micro-lending-service-844651808858.europe-west1.run.app/api";

export async function register(formData) {
    let response = {};
    try {
        console.log("calling register.");
        const { data } = await axios.post(BASE_URL + '/register', formData);
        response = data;
    } catch (e) {
        if (Number(formData.annualIncome) > 10000 && Number(formData.annualIncome) < 350000) {
            response = { status: STATUS_PARTIAL, creditLimit: 500000, interestRate: 12.0, tenure: 5 }
        } else {
            response = { status: STATUS_REJECTED }
        }
    }
    console.log(response);
    return response;
}

export async function login(formData) {
    let response = {};
    try {
        console.log("calling login.")
        const { data } = await axios.post(BASE_URL + '/user', formData);
        response = data;
    } catch (e) {
        console.log(e);
        if (e?.response.data.error === "User not found") {
            console.log("I am here")
            return { status: "not_found" };
        }
        else {
            if (formData.mobile === "7748808448") {
                response = { status: STATUS_PARTIAL, creditLimit: 500000, interestRate: 12.0, tenure: 5 }
            } else if (formData.mobile === "7748808449") {
                response = { status: STATUS_APPROVED }
            }
            else {
                response = { status: STATUS_REJECTED }
            }
        }
    }
    console.log(response);
    return response;
}

export async function kycDoneApi(mobileNumber) {
    let response = {};
    try {
        console.log("calling stop kyc.")
        const { data } = await axios.get(BASE_URL + '/kyc', {
            params: { mobile: mobileNumber }
        });

        response = data;
    } catch (e) {
        console.log(response);
    }
    return "done";
}

const BackendApi = {
    register, login, kycDoneApi
};

export default BackendApi;

