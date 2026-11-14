import axios from 'axios';

const RISKASSESSMENT_API_BASE_URL = "http://localhost:8080/RiskAssessment";

class RiskAssessmentService {

    getRiskAssessments(){
        return axios.get(RISKASSESSMENT_API_BASE_URL + '/' );
    }

    createRiskAssessment(riskAssessment){
        return axios.post(RISKASSESSMENT_API_BASE_URL  + '/create', riskAssessment);
    }

    getRiskAssessmentById(riskAssessmentId){
        return axios.get(RISKASSESSMENT_API_BASE_URL + '/load?riskAssessmentId=' + riskAssessmentId);
    }

    updateRiskAssessment(riskAssessment){
        return axios.put(RISKASSESSMENT_API_BASE_URL + '/update', riskAssessment);
    }

    deleteRiskAssessment(riskAssessmentId){
        return axios.delete(RISKASSESSMENT_API_BASE_URL + '/delete?riskAssessmentId=' + riskAssessmentId);
    }
}

export default new RiskAssessmentService()