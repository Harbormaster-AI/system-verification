import axios from 'axios';

const EXTERNALACCOUNT_API_BASE_URL = "http://localhost:8080/ExternalAccount";

class ExternalAccountService {

    getExternalAccounts(){
        return axios.get(EXTERNALACCOUNT_API_BASE_URL + '/' );
    }

    createExternalAccount(externalAccount){
        return axios.post(EXTERNALACCOUNT_API_BASE_URL  + '/create', externalAccount);
    }

    getExternalAccountById(externalAccountId){
        return axios.get(EXTERNALACCOUNT_API_BASE_URL + '/load?externalAccountId=' + externalAccountId);
    }

    updateExternalAccount(externalAccount){
        return axios.put(EXTERNALACCOUNT_API_BASE_URL + '/update', externalAccount);
    }

    deleteExternalAccount(externalAccountId){
        return axios.delete(EXTERNALACCOUNT_API_BASE_URL + '/delete?externalAccountId=' + externalAccountId);
    }
}

export default new ExternalAccountService()