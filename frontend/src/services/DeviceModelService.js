import axios from 'axios';

const DEVICEMODEL_API_BASE_URL = "/DeviceModel";

class DeviceModelService {

    getDeviceModels(){
        return axios.get(DEVICEMODEL_API_BASE_URL + '/' );
    }

    createDeviceModel(deviceModel){
        return axios.post(DEVICEMODEL_API_BASE_URL  + '/create', deviceModel);
    }

    getDeviceModelById(deviceModelId){
        return axios.get(DEVICEMODEL_API_BASE_URL + '/load?deviceModelId=' + deviceModelId);
    }

    updateDeviceModel(deviceModel){
        return axios.put(DEVICEMODEL_API_BASE_URL + '/update', deviceModel);
    }

    deleteDeviceModel(deviceModelId){
        return axios.delete(DEVICEMODEL_API_BASE_URL + '/delete?deviceModelId=' + deviceModelId);
    }
}

export default new DeviceModelService()