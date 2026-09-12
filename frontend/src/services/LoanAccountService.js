import axios from 'axios';

const LOANACCOUNT_API_BASE_URL = "http://localhost:8080/LoanAccount";

class LoanAccountService {

    getLoanAccounts(){
        return axios.get(LOANACCOUNT_API_BASE_URL + '/' );
    }

    createLoanAccount(loanAccount){
        return axios.post(LOANACCOUNT_API_BASE_URL  + '/create', loanAccount);
    }

    getLoanAccountById(loanAccountId){
        return axios.get(LOANACCOUNT_API_BASE_URL + '/load?loanAccountId=' + loanAccountId);
    }

    updateLoanAccount(loanAccount){
        return axios.put(LOANACCOUNT_API_BASE_URL + '/update', loanAccount);
    }

    deleteLoanAccount(loanAccountId){
        return axios.delete(LOANACCOUNT_API_BASE_URL + '/delete?loanAccountId=' + loanAccountId);
    }
}

export default new LoanAccountService()