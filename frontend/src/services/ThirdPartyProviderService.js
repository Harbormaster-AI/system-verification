import axios from 'axios';

const THIRDPARTYPROVIDER_API_BASE_URL = "http://localhost:8080/ThirdPartyProvider";

class ThirdPartyProviderService {

    getThirdPartyProviders(){
        return axios.get(THIRDPARTYPROVIDER_API_BASE_URL + '/' );
    }

    createThirdPartyProvider(thirdPartyProvider){
        return axios.post(THIRDPARTYPROVIDER_API_BASE_URL  + '/create', thirdPartyProvider);
    }

    getThirdPartyProviderById(thirdPartyProviderId){
        return axios.get(THIRDPARTYPROVIDER_API_BASE_URL + '/load?thirdPartyProviderId=' + thirdPartyProviderId);
    }

    updateThirdPartyProvider(thirdPartyProvider){
        return axios.put(THIRDPARTYPROVIDER_API_BASE_URL + '/update', thirdPartyProvider);
    }

    deleteThirdPartyProvider(thirdPartyProviderId){
        return axios.delete(THIRDPARTYPROVIDER_API_BASE_URL + '/delete?thirdPartyProviderId=' + thirdPartyProviderId);
    }
}

export default new ThirdPartyProviderService()