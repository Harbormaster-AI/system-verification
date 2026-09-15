import axios from 'axios';

const CONNECTIVITYPLAN_API_BASE_URL = "/ConnectivityPlan";

class ConnectivityPlanService {

    getConnectivityPlans(){
        return axios.get(CONNECTIVITYPLAN_API_BASE_URL + '/' );
    }

    createConnectivityPlan(connectivityPlan){
        return axios.post(CONNECTIVITYPLAN_API_BASE_URL  + '/create', connectivityPlan);
    }

    getConnectivityPlanById(connectivityPlanId){
        return axios.get(CONNECTIVITYPLAN_API_BASE_URL + '/load?connectivityPlanId=' + connectivityPlanId);
    }

    updateConnectivityPlan(connectivityPlan){
        return axios.put(CONNECTIVITYPLAN_API_BASE_URL + '/update', connectivityPlan);
    }

    deleteConnectivityPlan(connectivityPlanId){
        return axios.delete(CONNECTIVITYPLAN_API_BASE_URL + '/delete?connectivityPlanId=' + connectivityPlanId);
    }
}

export default new ConnectivityPlanService()