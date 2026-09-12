import axios from 'axios';

const ACCOUNTSTATEMENT_API_BASE_URL = "http://localhost:8080/AccountStatement";

class AccountStatementService {

    getAccountStatements(){
        return axios.get(ACCOUNTSTATEMENT_API_BASE_URL + '/' );
    }

    createAccountStatement(accountStatement){
        return axios.post(ACCOUNTSTATEMENT_API_BASE_URL  + '/create', accountStatement);
    }

    getAccountStatementById(accountStatementId){
        return axios.get(ACCOUNTSTATEMENT_API_BASE_URL + '/load?accountStatementId=' + accountStatementId);
    }

    updateAccountStatement(accountStatement){
        return axios.put(ACCOUNTSTATEMENT_API_BASE_URL + '/update', accountStatement);
    }

    deleteAccountStatement(accountStatementId){
        return axios.delete(ACCOUNTSTATEMENT_API_BASE_URL + '/delete?accountStatementId=' + accountStatementId);
    }
}

export default new AccountStatementService()