import axios from 'axios';

const DATARETENTIONPOLICY_API_BASE_URL = "/DataRetentionPolicy";

class DataRetentionPolicyService {

    getDataRetentionPolicys(){
        return axios.get(DATARETENTIONPOLICY_API_BASE_URL + '/' );
    }

    createDataRetentionPolicy(dataRetentionPolicy){
        return axios.post(DATARETENTIONPOLICY_API_BASE_URL  + '/create', dataRetentionPolicy);
    }

    getDataRetentionPolicyById(dataRetentionPolicyId){
        return axios.get(DATARETENTIONPOLICY_API_BASE_URL + '/load?dataRetentionPolicyId=' + dataRetentionPolicyId);
    }

    updateDataRetentionPolicy(dataRetentionPolicy){
        return axios.put(DATARETENTIONPOLICY_API_BASE_URL + '/update', dataRetentionPolicy);
    }

    deleteDataRetentionPolicy(dataRetentionPolicyId){
        return axios.delete(DATARETENTIONPOLICY_API_BASE_URL + '/delete?dataRetentionPolicyId=' + dataRetentionPolicyId);
    }
}

export default new DataRetentionPolicyService()