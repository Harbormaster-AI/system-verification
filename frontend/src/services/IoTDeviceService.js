import axios from 'axios';

const IOTDEVICE_API_BASE_URL = "/IoTDevice";

class IoTDeviceService {

    getIoTDevices(){
        return axios.get(IOTDEVICE_API_BASE_URL + '/' );
    }

    createIoTDevice(ioTDevice){
        return axios.post(IOTDEVICE_API_BASE_URL  + '/create', ioTDevice);
    }

    getIoTDeviceById(ioTDeviceId){
        return axios.get(IOTDEVICE_API_BASE_URL + '/load?ioTDeviceId=' + ioTDeviceId);
    }

    updateIoTDevice(ioTDevice){
        return axios.put(IOTDEVICE_API_BASE_URL + '/update', ioTDevice);
    }

    deleteIoTDevice(ioTDeviceId){
        return axios.delete(IOTDEVICE_API_BASE_URL + '/delete?ioTDeviceId=' + ioTDeviceId);
    }
}

export default new IoTDeviceService()