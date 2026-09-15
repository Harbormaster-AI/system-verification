import axios from 'axios';

const ACTUATORINSTANCE_API_BASE_URL = "/ActuatorInstance";

class ActuatorInstanceService {

    getActuatorInstances(){
        return axios.get(ACTUATORINSTANCE_API_BASE_URL + '/' );
    }

    createActuatorInstance(actuatorInstance){
        return axios.post(ACTUATORINSTANCE_API_BASE_URL  + '/create', actuatorInstance);
    }

    getActuatorInstanceById(actuatorInstanceId){
        return axios.get(ACTUATORINSTANCE_API_BASE_URL + '/load?actuatorInstanceId=' + actuatorInstanceId);
    }

    updateActuatorInstance(actuatorInstance){
        return axios.put(ACTUATORINSTANCE_API_BASE_URL + '/update', actuatorInstance);
    }

    deleteActuatorInstance(actuatorInstanceId){
        return axios.delete(ACTUATORINSTANCE_API_BASE_URL + '/delete?actuatorInstanceId=' + actuatorInstanceId);
    }
}

export default new ActuatorInstanceService()