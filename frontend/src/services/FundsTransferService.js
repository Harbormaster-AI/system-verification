import axios from 'axios';

const FUNDSTRANSFER_API_BASE_URL = "http://localhost:8080/FundsTransfer";

class FundsTransferService {

    getFundsTransfers(){
        return axios.get(FUNDSTRANSFER_API_BASE_URL + '/' );
    }

    createFundsTransfer(fundsTransfer){
        return axios.post(FUNDSTRANSFER_API_BASE_URL  + '/create', fundsTransfer);
    }

    getFundsTransferById(fundsTransferId){
        return axios.get(FUNDSTRANSFER_API_BASE_URL + '/load?fundsTransferId=' + fundsTransferId);
    }

    updateFundsTransfer(fundsTransfer){
        return axios.put(FUNDSTRANSFER_API_BASE_URL + '/update', fundsTransfer);
    }

    deleteFundsTransfer(fundsTransferId){
        return axios.delete(FUNDSTRANSFER_API_BASE_URL + '/delete?fundsTransferId=' + fundsTransferId);
    }
}

export default new FundsTransferService()