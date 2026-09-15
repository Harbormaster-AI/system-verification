import axios from 'axios';

const SIMCARD_API_BASE_URL = "/SimCard";

class SimCardService {

    getSimCards(){
        return axios.get(SIMCARD_API_BASE_URL + '/' );
    }

    createSimCard(simCard){
        return axios.post(SIMCARD_API_BASE_URL  + '/create', simCard);
    }

    getSimCardById(simCardId){
        return axios.get(SIMCARD_API_BASE_URL + '/load?simCardId=' + simCardId);
    }

    updateSimCard(simCard){
        return axios.put(SIMCARD_API_BASE_URL + '/update', simCard);
    }

    deleteSimCard(simCardId){
        return axios.delete(SIMCARD_API_BASE_URL + '/delete?simCardId=' + simCardId);
    }
}

export default new SimCardService()