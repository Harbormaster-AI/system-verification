import axios from 'axios';

const BANKINGPRODUCT_API_BASE_URL = "http://localhost:8080/BankingProduct";

class BankingProductService {

    getBankingProducts(){
        return axios.get(BANKINGPRODUCT_API_BASE_URL + '/' );
    }

    createBankingProduct(bankingProduct){
        return axios.post(BANKINGPRODUCT_API_BASE_URL  + '/create', bankingProduct);
    }

    getBankingProductById(bankingProductId){
        return axios.get(BANKINGPRODUCT_API_BASE_URL + '/load?bankingProductId=' + bankingProductId);
    }

    updateBankingProduct(bankingProduct){
        return axios.put(BANKINGPRODUCT_API_BASE_URL + '/update', bankingProduct);
    }

    deleteBankingProduct(bankingProductId){
        return axios.delete(BANKINGPRODUCT_API_BASE_URL + '/delete?bankingProductId=' + bankingProductId);
    }
}

export default new BankingProductService()