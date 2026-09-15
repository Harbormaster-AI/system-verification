import axios from 'axios';

const TWINTEMPLATE_API_BASE_URL = "/TwinTemplate";

class TwinTemplateService {

    getTwinTemplates(){
        return axios.get(TWINTEMPLATE_API_BASE_URL + '/' );
    }

    createTwinTemplate(twinTemplate){
        return axios.post(TWINTEMPLATE_API_BASE_URL  + '/create', twinTemplate);
    }

    getTwinTemplateById(twinTemplateId){
        return axios.get(TWINTEMPLATE_API_BASE_URL + '/load?twinTemplateId=' + twinTemplateId);
    }

    updateTwinTemplate(twinTemplate){
        return axios.put(TWINTEMPLATE_API_BASE_URL + '/update', twinTemplate);
    }

    deleteTwinTemplate(twinTemplateId){
        return axios.delete(TWINTEMPLATE_API_BASE_URL + '/delete?twinTemplateId=' + twinTemplateId);
    }
}

export default new TwinTemplateService()