import axios from 'axios';

const EXCHANGERATE_API_BASE_URL = "http://localhost:8080/ExchangeRate";

class ExchangeRateService {

    getExchangeRates(){
        return axios.get(EXCHANGERATE_API_BASE_URL + '/' );
    }

    createExchangeRate(exchangeRate){
        return axios.post(EXCHANGERATE_API_BASE_URL  + '/create', exchangeRate);
    }

    getExchangeRateById(exchangeRateId){
        return axios.get(EXCHANGERATE_API_BASE_URL + '/load?exchangeRateId=' + exchangeRateId);
    }

    updateExchangeRate(exchangeRate){
        return axios.put(EXCHANGERATE_API_BASE_URL + '/update', exchangeRate);
    }

    deleteExchangeRate(exchangeRateId){
        return axios.delete(EXCHANGERATE_API_BASE_URL + '/delete?exchangeRateId=' + exchangeRateId);
    }
}

export default new ExchangeRateService()