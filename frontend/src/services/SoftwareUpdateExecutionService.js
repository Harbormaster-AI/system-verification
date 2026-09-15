import axios from 'axios';

const SOFTWAREUPDATEEXECUTION_API_BASE_URL = "/SoftwareUpdateExecution";

class SoftwareUpdateExecutionService {

    getSoftwareUpdateExecutions(){
        return axios.get(SOFTWAREUPDATEEXECUTION_API_BASE_URL + '/' );
    }

    createSoftwareUpdateExecution(softwareUpdateExecution){
        return axios.post(SOFTWAREUPDATEEXECUTION_API_BASE_URL  + '/create', softwareUpdateExecution);
    }

    getSoftwareUpdateExecutionById(softwareUpdateExecutionId){
        return axios.get(SOFTWAREUPDATEEXECUTION_API_BASE_URL + '/load?softwareUpdateExecutionId=' + softwareUpdateExecutionId);
    }

    updateSoftwareUpdateExecution(softwareUpdateExecution){
        return axios.put(SOFTWAREUPDATEEXECUTION_API_BASE_URL + '/update', softwareUpdateExecution);
    }

    deleteSoftwareUpdateExecution(softwareUpdateExecutionId){
        return axios.delete(SOFTWAREUPDATEEXECUTION_API_BASE_URL + '/delete?softwareUpdateExecutionId=' + softwareUpdateExecutionId);
    }
}

export default new SoftwareUpdateExecutionService()