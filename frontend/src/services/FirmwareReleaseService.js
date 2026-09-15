import axios from 'axios';

const FIRMWARERELEASE_API_BASE_URL = "/FirmwareRelease";

class FirmwareReleaseService {

    getFirmwareReleases(){
        return axios.get(FIRMWARERELEASE_API_BASE_URL + '/' );
    }

    createFirmwareRelease(firmwareRelease){
        return axios.post(FIRMWARERELEASE_API_BASE_URL  + '/create', firmwareRelease);
    }

    getFirmwareReleaseById(firmwareReleaseId){
        return axios.get(FIRMWARERELEASE_API_BASE_URL + '/load?firmwareReleaseId=' + firmwareReleaseId);
    }

    updateFirmwareRelease(firmwareRelease){
        return axios.put(FIRMWARERELEASE_API_BASE_URL + '/update', firmwareRelease);
    }

    deleteFirmwareRelease(firmwareReleaseId){
        return axios.delete(FIRMWARERELEASE_API_BASE_URL + '/delete?firmwareReleaseId=' + firmwareReleaseId);
    }
}

export default new FirmwareReleaseService()