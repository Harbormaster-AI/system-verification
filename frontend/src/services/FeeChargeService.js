import axios from 'axios';

const FEECHARGE_API_BASE_URL = "http://localhost:8080/FeeCharge";

class FeeChargeService {

    getFeeCharges(){
        return axios.get(FEECHARGE_API_BASE_URL + '/' );
    }

    createFeeCharge(feeCharge){
        return axios.post(FEECHARGE_API_BASE_URL  + '/create', feeCharge);
    }

    getFeeChargeById(feeChargeId){
        return axios.get(FEECHARGE_API_BASE_URL + '/load?feeChargeId=' + feeChargeId);
    }

    updateFeeCharge(feeCharge){
        return axios.put(FEECHARGE_API_BASE_URL + '/update', feeCharge);
    }

    deleteFeeCharge(feeChargeId){
        return axios.delete(FEECHARGE_API_BASE_URL + '/delete?feeChargeId=' + feeChargeId);
    }
}

export default new FeeChargeService()