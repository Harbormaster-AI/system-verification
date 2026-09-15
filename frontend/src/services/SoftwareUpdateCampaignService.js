import axios from 'axios';

const SOFTWAREUPDATECAMPAIGN_API_BASE_URL = "/SoftwareUpdateCampaign";

class SoftwareUpdateCampaignService {

    getSoftwareUpdateCampaigns(){
        return axios.get(SOFTWAREUPDATECAMPAIGN_API_BASE_URL + '/' );
    }

    createSoftwareUpdateCampaign(softwareUpdateCampaign){
        return axios.post(SOFTWAREUPDATECAMPAIGN_API_BASE_URL  + '/create', softwareUpdateCampaign);
    }

    getSoftwareUpdateCampaignById(softwareUpdateCampaignId){
        return axios.get(SOFTWAREUPDATECAMPAIGN_API_BASE_URL + '/load?softwareUpdateCampaignId=' + softwareUpdateCampaignId);
    }

    updateSoftwareUpdateCampaign(softwareUpdateCampaign){
        return axios.put(SOFTWAREUPDATECAMPAIGN_API_BASE_URL + '/update', softwareUpdateCampaign);
    }

    deleteSoftwareUpdateCampaign(softwareUpdateCampaignId){
        return axios.delete(SOFTWAREUPDATECAMPAIGN_API_BASE_URL + '/delete?softwareUpdateCampaignId=' + softwareUpdateCampaignId);
    }
}

export default new SoftwareUpdateCampaignService()