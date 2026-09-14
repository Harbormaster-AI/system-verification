import axios from 'axios';

const LOANPAYMENT_API_BASE_URL = "http://localhost:8080/LoanPayment";

class LoanPaymentService {

    getLoanPayments(){
        return axios.get(LOANPAYMENT_API_BASE_URL + '/' );
    }

    createLoanPayment(loanPayment){
        return axios.post(LOANPAYMENT_API_BASE_URL  + '/create', loanPayment);
    }

    getLoanPaymentById(loanPaymentId){
        return axios.get(LOANPAYMENT_API_BASE_URL + '/load?loanPaymentId=' + loanPaymentId);
    }

    updateLoanPayment(loanPayment){
        return axios.put(LOANPAYMENT_API_BASE_URL + '/update', loanPayment);
    }

    deleteLoanPayment(loanPaymentId){
        return axios.delete(LOANPAYMENT_API_BASE_URL + '/delete?loanPaymentId=' + loanPaymentId);
    }
}

export default new LoanPaymentService()