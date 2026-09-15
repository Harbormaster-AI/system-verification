import axios from 'axios';

const APIKEY_API_BASE_URL = "/ApiKey";

class ApiKeyService {

    getApiKeys(){
        return axios.get(APIKEY_API_BASE_URL + '/' );
    }

    createApiKey(apiKey){
        return axios.post(APIKEY_API_BASE_URL  + '/create', apiKey);
    }

    getApiKeyById(apiKeyId){
        return axios.get(APIKEY_API_BASE_URL + '/load?apiKeyId=' + apiKeyId);
    }

    updateApiKey(apiKey){
        return axios.put(APIKEY_API_BASE_URL + '/update', apiKey);
    }

    deleteApiKey(apiKeyId){
        return axios.delete(APIKEY_API_BASE_URL + '/delete?apiKeyId=' + apiKeyId);
    }
}

export default new ApiKeyService()