import axios from 'axios';

const ALERT_API_BASE_URL = "/Alert";

class AlertService {

    getAlerts(){
        return axios.get(ALERT_API_BASE_URL + '/' );
    }

    createAlert(alert){
        return axios.post(ALERT_API_BASE_URL  + '/create', alert);
    }

    getAlertById(alertId){
        return axios.get(ALERT_API_BASE_URL + '/load?alertId=' + alertId);
    }

    updateAlert(alert){
        return axios.put(ALERT_API_BASE_URL + '/update', alert);
    }

    deleteAlert(alertId){
        return axios.delete(ALERT_API_BASE_URL + '/delete?alertId=' + alertId);
    }
}

export default new AlertService()