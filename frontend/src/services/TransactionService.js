import axios from 'axios';

const TRANSACTION_API_BASE_URL = "http://localhost:8080/Transaction";

class TransactionService {

    getTransactions(){
        return axios.get(TRANSACTION_API_BASE_URL + '/' );
    }

    createTransaction(transaction){
        return axios.post(TRANSACTION_API_BASE_URL  + '/create', transaction);
    }

    getTransactionById(transactionId){
        return axios.get(TRANSACTION_API_BASE_URL + '/load?transactionId=' + transactionId);
    }

    updateTransaction(transaction){
        return axios.put(TRANSACTION_API_BASE_URL + '/update', transaction);
    }

    deleteTransaction(transactionId){
        return axios.delete(TRANSACTION_API_BASE_URL + '/delete?transactionId=' + transactionId);
    }
}

export default new TransactionService()