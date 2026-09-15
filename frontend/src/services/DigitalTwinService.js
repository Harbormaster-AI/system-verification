import axios from 'axios';

const DIGITALTWIN_API_BASE_URL = "/DigitalTwin";

class DigitalTwinService {

    getDigitalTwins(){
        return axios.get(DIGITALTWIN_API_BASE_URL + '/' );
    }

    createDigitalTwin(digitalTwin){
        return axios.post(DIGITALTWIN_API_BASE_URL  + '/create', digitalTwin);
    }

    getDigitalTwinById(digitalTwinId){
        return axios.get(DIGITALTWIN_API_BASE_URL + '/load?digitalTwinId=' + digitalTwinId);
    }

    updateDigitalTwin(digitalTwin){
        return axios.put(DIGITALTWIN_API_BASE_URL + '/update', digitalTwin);
    }

    deleteDigitalTwin(digitalTwinId){
        return axios.delete(DIGITALTWIN_API_BASE_URL + '/delete?digitalTwinId=' + digitalTwinId);
    }
}

export default new DigitalTwinService()