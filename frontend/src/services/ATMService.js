import axios from 'axios';

const ATM_API_BASE_URL = "http://localhost:8080/ATM";

class ATMService {

    getATMs(){
        return axios.get(ATM_API_BASE_URL + '/' );
    }

    createATM(aTM){
        return axios.post(ATM_API_BASE_URL  + '/create', aTM);
    }

    getATMById(aTMId){
        return axios.get(ATM_API_BASE_URL + '/load?aTMId=' + aTMId);
    }

    updateATM(aTM){
        return axios.put(ATM_API_BASE_URL + '/update', aTM);
    }

    deleteATM(aTMId){
        return axios.delete(ATM_API_BASE_URL + '/delete?aTMId=' + aTMId);
    }
}

export default new ATMService()