import axios from 'axios';

const DISPUTE_API_BASE_URL = "http://localhost:8080/Dispute";

class DisputeService {

    getDisputes(){
        return axios.get(DISPUTE_API_BASE_URL + '/' );
    }

    createDispute(dispute){
        return axios.post(DISPUTE_API_BASE_URL  + '/create', dispute);
    }

    getDisputeById(disputeId){
        return axios.get(DISPUTE_API_BASE_URL + '/load?disputeId=' + disputeId);
    }

    updateDispute(dispute){
        return axios.put(DISPUTE_API_BASE_URL + '/update', dispute);
    }

    deleteDispute(disputeId){
        return axios.delete(DISPUTE_API_BASE_URL + '/delete?disputeId=' + disputeId);
    }
}

export default new DisputeService()