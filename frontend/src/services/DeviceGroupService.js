import axios from 'axios';

const DEVICEGROUP_API_BASE_URL = "/DeviceGroup";

class DeviceGroupService {

    getDeviceGroups(){
        return axios.get(DEVICEGROUP_API_BASE_URL + '/' );
    }

    createDeviceGroup(deviceGroup){
        return axios.post(DEVICEGROUP_API_BASE_URL  + '/create', deviceGroup);
    }

    getDeviceGroupById(deviceGroupId){
        return axios.get(DEVICEGROUP_API_BASE_URL + '/load?deviceGroupId=' + deviceGroupId);
    }

    updateDeviceGroup(deviceGroup){
        return axios.put(DEVICEGROUP_API_BASE_URL + '/update', deviceGroup);
    }

    deleteDeviceGroup(deviceGroupId){
        return axios.delete(DEVICEGROUP_API_BASE_URL + '/delete?deviceGroupId=' + deviceGroupId);
    }
}

export default new DeviceGroupService()