import axios from 'axios';

const KYCPROFILE_API_BASE_URL = "http://localhost:8080/KycProfile";

class KycProfileService {

    getKycProfiles(){
        return axios.get(KYCPROFILE_API_BASE_URL + '/' );
    }

    createKycProfile(kycProfile){
        return axios.post(KYCPROFILE_API_BASE_URL  + '/create', kycProfile);
    }

    getKycProfileById(kycProfileId){
        return axios.get(KYCPROFILE_API_BASE_URL + '/load?kycProfileId=' + kycProfileId);
    }

    updateKycProfile(kycProfile){
        return axios.put(KYCPROFILE_API_BASE_URL + '/update', kycProfile);
    }

    deleteKycProfile(kycProfileId){
        return axios.delete(KYCPROFILE_API_BASE_URL + '/delete?kycProfileId=' + kycProfileId);
    }
}

export default new KycProfileService()