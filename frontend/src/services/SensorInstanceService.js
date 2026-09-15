import axios from 'axios';

const SENSORINSTANCE_API_BASE_URL = "/SensorInstance";

class SensorInstanceService {

    getSensorInstances(){
        return axios.get(SENSORINSTANCE_API_BASE_URL + '/' );
    }

    createSensorInstance(sensorInstance){
        return axios.post(SENSORINSTANCE_API_BASE_URL  + '/create', sensorInstance);
    }

    getSensorInstanceById(sensorInstanceId){
        return axios.get(SENSORINSTANCE_API_BASE_URL + '/load?sensorInstanceId=' + sensorInstanceId);
    }

    updateSensorInstance(sensorInstance){
        return axios.put(SENSORINSTANCE_API_BASE_URL + '/update', sensorInstance);
    }

    deleteSensorInstance(sensorInstanceId){
        return axios.delete(SENSORINSTANCE_API_BASE_URL + '/delete?sensorInstanceId=' + sensorInstanceId);
    }
}

export default new SensorInstanceService()