import axios from 'axios';

const DEVICEVENDOR_API_BASE_URL = "/DeviceVendor";

class DeviceVendorService {

    getDeviceVendors(){
        return axios.get(DEVICEVENDOR_API_BASE_URL + '/' );
    }

    createDeviceVendor(deviceVendor){
        return axios.post(DEVICEVENDOR_API_BASE_URL  + '/create', deviceVendor);
    }

    getDeviceVendorById(deviceVendorId){
        return axios.get(DEVICEVENDOR_API_BASE_URL + '/load?deviceVendorId=' + deviceVendorId);
    }

    updateDeviceVendor(deviceVendor){
        return axios.put(DEVICEVENDOR_API_BASE_URL + '/update', deviceVendor);
    }

    deleteDeviceVendor(deviceVendorId){
        return axios.delete(DEVICEVENDOR_API_BASE_URL + '/delete?deviceVendorId=' + deviceVendorId);
    }
}

export default new DeviceVendorService()