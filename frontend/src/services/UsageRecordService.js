import axios from 'axios';

const USAGERECORD_API_BASE_URL = "/UsageRecord";

class UsageRecordService {

    getUsageRecords(){
        return axios.get(USAGERECORD_API_BASE_URL + '/' );
    }

    createUsageRecord(usageRecord){
        return axios.post(USAGERECORD_API_BASE_URL  + '/create', usageRecord);
    }

    getUsageRecordById(usageRecordId){
        return axios.get(USAGERECORD_API_BASE_URL + '/load?usageRecordId=' + usageRecordId);
    }

    updateUsageRecord(usageRecord){
        return axios.put(USAGERECORD_API_BASE_URL + '/update', usageRecord);
    }

    deleteUsageRecord(usageRecordId){
        return axios.delete(USAGERECORD_API_BASE_URL + '/delete?usageRecordId=' + usageRecordId);
    }
}

export default new UsageRecordService()