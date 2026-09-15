import axios from 'axios';

const DEVICECERTIFICATE_API_BASE_URL = "/DeviceCertificate";

class DeviceCertificateService {

    getDeviceCertificates(){
        return axios.get(DEVICECERTIFICATE_API_BASE_URL + '/' );
    }

    createDeviceCertificate(deviceCertificate){
        return axios.post(DEVICECERTIFICATE_API_BASE_URL  + '/create', deviceCertificate);
    }

    getDeviceCertificateById(deviceCertificateId){
        return axios.get(DEVICECERTIFICATE_API_BASE_URL + '/load?deviceCertificateId=' + deviceCertificateId);
    }

    updateDeviceCertificate(deviceCertificate){
        return axios.put(DEVICECERTIFICATE_API_BASE_URL + '/update', deviceCertificate);
    }

    deleteDeviceCertificate(deviceCertificateId){
        return axios.delete(DEVICECERTIFICATE_API_BASE_URL + '/delete?deviceCertificateId=' + deviceCertificateId);
    }
}

export default new DeviceCertificateService()