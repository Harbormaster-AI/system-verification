import axios from 'axios';

const EDGEAPPLICATION_API_BASE_URL = "/EdgeApplication";

class EdgeApplicationService {

    getEdgeApplications(){
        return axios.get(EDGEAPPLICATION_API_BASE_URL + '/' );
    }

    createEdgeApplication(edgeApplication){
        return axios.post(EDGEAPPLICATION_API_BASE_URL  + '/create', edgeApplication);
    }

    getEdgeApplicationById(edgeApplicationId){
        return axios.get(EDGEAPPLICATION_API_BASE_URL + '/load?edgeApplicationId=' + edgeApplicationId);
    }

    updateEdgeApplication(edgeApplication){
        return axios.put(EDGEAPPLICATION_API_BASE_URL + '/update', edgeApplication);
    }

    deleteEdgeApplication(edgeApplicationId){
        return axios.delete(EDGEAPPLICATION_API_BASE_URL + '/delete?edgeApplicationId=' + edgeApplicationId);
    }
}

export default new EdgeApplicationService()