import axios from 'axios';

const PROVISIONINGRECORD_API_BASE_URL = "/ProvisioningRecord";

class ProvisioningRecordService {

    getProvisioningRecords(){
        return axios.get(PROVISIONINGRECORD_API_BASE_URL + '/' );
    }

    createProvisioningRecord(provisioningRecord){
        return axios.post(PROVISIONINGRECORD_API_BASE_URL  + '/create', provisioningRecord);
    }

    getProvisioningRecordById(provisioningRecordId){
        return axios.get(PROVISIONINGRECORD_API_BASE_URL + '/load?provisioningRecordId=' + provisioningRecordId);
    }

    updateProvisioningRecord(provisioningRecord){
        return axios.put(PROVISIONINGRECORD_API_BASE_URL + '/update', provisioningRecord);
    }

    deleteProvisioningRecord(provisioningRecordId){
        return axios.delete(PROVISIONINGRECORD_API_BASE_URL + '/delete?provisioningRecordId=' + provisioningRecordId);
    }
}

export default new ProvisioningRecordService()