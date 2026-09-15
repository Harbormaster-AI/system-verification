import axios from 'axios';

const NETWORKPROFILE_API_BASE_URL = "/NetworkProfile";

class NetworkProfileService {

    getNetworkProfiles(){
        return axios.get(NETWORKPROFILE_API_BASE_URL + '/' );
    }

    createNetworkProfile(networkProfile){
        return axios.post(NETWORKPROFILE_API_BASE_URL  + '/create', networkProfile);
    }

    getNetworkProfileById(networkProfileId){
        return axios.get(NETWORKPROFILE_API_BASE_URL + '/load?networkProfileId=' + networkProfileId);
    }

    updateNetworkProfile(networkProfile){
        return axios.put(NETWORKPROFILE_API_BASE_URL + '/update', networkProfile);
    }

    deleteNetworkProfile(networkProfileId){
        return axios.delete(NETWORKPROFILE_API_BASE_URL + '/delete?networkProfileId=' + networkProfileId);
    }
}

export default new NetworkProfileService()