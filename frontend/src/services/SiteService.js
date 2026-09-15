import axios from 'axios';

const SITE_API_BASE_URL = "/Site";

class SiteService {

    getSites(){
        return axios.get(SITE_API_BASE_URL + '/' );
    }

    createSite(site){
        return axios.post(SITE_API_BASE_URL  + '/create', site);
    }

    getSiteById(siteId){
        return axios.get(SITE_API_BASE_URL + '/load?siteId=' + siteId);
    }

    updateSite(site){
        return axios.put(SITE_API_BASE_URL + '/update', site);
    }

    deleteSite(siteId){
        return axios.delete(SITE_API_BASE_URL + '/delete?siteId=' + siteId);
    }
}

export default new SiteService()