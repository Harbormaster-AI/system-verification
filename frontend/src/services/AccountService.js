import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080/Account";

class AccountService {

    getAccounts(){
        return axios.get(ACCOUNT_API_BASE_URL + '/' );
    }

    createAccount(account){
        return axios.post(ACCOUNT_API_BASE_URL  + '/create', account);
    }

    getAccountById(accountId){
        return axios.get(ACCOUNT_API_BASE_URL + '/load?accountId=' + accountId);
    }

    updateAccount(account){
        return axios.put(ACCOUNT_API_BASE_URL + '/update', account);
    }

    deleteAccount(accountId){
        return axios.delete(ACCOUNT_API_BASE_URL + '/delete?accountId=' + accountId);
    }
}

export default new AccountService()