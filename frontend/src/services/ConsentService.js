import axios from 'axios';

const CONSENT_API_BASE_URL = "http://localhost:8080/Consent";

class ConsentService {

    getConsents(){
        return axios.get(CONSENT_API_BASE_URL + '/' );
    }

    createConsent(consent){
        return axios.post(CONSENT_API_BASE_URL  + '/create', consent);
    }

    getConsentById(consentId){
        return axios.get(CONSENT_API_BASE_URL + '/load?consentId=' + consentId);
    }

    updateConsent(consent){
        return axios.put(CONSENT_API_BASE_URL + '/update', consent);
    }

    deleteConsent(consentId){
        return axios.delete(CONSENT_API_BASE_URL + '/delete?consentId=' + consentId);
    }
}

export default new ConsentService()