import axios from 'axios';

const ACCESSPOLICY_API_BASE_URL = "/AccessPolicy";

class AccessPolicyService {

    getAccessPolicys(){
        return axios.get(ACCESSPOLICY_API_BASE_URL + '/' );
    }

    createAccessPolicy(accessPolicy){
        return axios.post(ACCESSPOLICY_API_BASE_URL  + '/create', accessPolicy);
    }

    getAccessPolicyById(accessPolicyId){
        return axios.get(ACCESSPOLICY_API_BASE_URL + '/load?accessPolicyId=' + accessPolicyId);
    }

    updateAccessPolicy(accessPolicy){
        return axios.put(ACCESSPOLICY_API_BASE_URL + '/update', accessPolicy);
    }

    deleteAccessPolicy(accessPolicyId){
        return axios.delete(ACCESSPOLICY_API_BASE_URL + '/delete?accessPolicyId=' + accessPolicyId);
    }
}

export default new AccessPolicyService()