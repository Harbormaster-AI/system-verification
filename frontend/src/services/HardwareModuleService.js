import axios from 'axios';

const HARDWAREMODULE_API_BASE_URL = "/HardwareModule";

class HardwareModuleService {

    getHardwareModules(){
        return axios.get(HARDWAREMODULE_API_BASE_URL + '/' );
    }

    createHardwareModule(hardwareModule){
        return axios.post(HARDWAREMODULE_API_BASE_URL  + '/create', hardwareModule);
    }

    getHardwareModuleById(hardwareModuleId){
        return axios.get(HARDWAREMODULE_API_BASE_URL + '/load?hardwareModuleId=' + hardwareModuleId);
    }

    updateHardwareModule(hardwareModule){
        return axios.put(HARDWAREMODULE_API_BASE_URL + '/update', hardwareModule);
    }

    deleteHardwareModule(hardwareModuleId){
        return axios.delete(HARDWAREMODULE_API_BASE_URL + '/delete?hardwareModuleId=' + hardwareModuleId);
    }
}

export default new HardwareModuleService()