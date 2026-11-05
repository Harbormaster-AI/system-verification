import axios from 'axios';

const BANK_API_BASE_URL = "http://localhost:8080/Bank";

class BankService {

    getBanks(){
        return axios.get(BANK_API_BASE_URL + '/' );
    }

    createBank(bank){
        return axios.post(BANK_API_BASE_URL  + '/create', bank);
    }

    getBankById(bankId){
        return axios.get(BANK_API_BASE_URL + '/load?bankId=' + bankId);
    }

    updateBank(bank){
        return axios.put(BANK_API_BASE_URL + '/update', bank);
    }

    deleteBank(bankId){
        return axios.delete(BANK_API_BASE_URL + '/delete?bankId=' + bankId);
    }
}

export default new BankService()