import axios from 'axios';

const ALERTRULE_API_BASE_URL = "/AlertRule";

class AlertRuleService {

    getAlertRules(){
        return axios.get(ALERTRULE_API_BASE_URL + '/' );
    }

    createAlertRule(alertRule){
        return axios.post(ALERTRULE_API_BASE_URL  + '/create', alertRule);
    }

    getAlertRuleById(alertRuleId){
        return axios.get(ALERTRULE_API_BASE_URL + '/load?alertRuleId=' + alertRuleId);
    }

    updateAlertRule(alertRule){
        return axios.put(ALERTRULE_API_BASE_URL + '/update', alertRule);
    }

    deleteAlertRule(alertRuleId){
        return axios.delete(ALERTRULE_API_BASE_URL + '/delete?alertRuleId=' + alertRuleId);
    }
}

export default new AlertRuleService()