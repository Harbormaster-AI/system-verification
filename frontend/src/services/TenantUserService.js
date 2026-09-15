import axios from 'axios';

const TENANTUSER_API_BASE_URL = "/TenantUser";

class TenantUserService {

    getTenantUsers(){
        return axios.get(TENANTUSER_API_BASE_URL + '/' );
    }

    createTenantUser(tenantUser){
        return axios.post(TENANTUSER_API_BASE_URL  + '/create', tenantUser);
    }

    getTenantUserById(tenantUserId){
        return axios.get(TENANTUSER_API_BASE_URL + '/load?tenantUserId=' + tenantUserId);
    }

    updateTenantUser(tenantUser){
        return axios.put(TENANTUSER_API_BASE_URL + '/update', tenantUser);
    }

    deleteTenantUser(tenantUserId){
        return axios.delete(TENANTUSER_API_BASE_URL + '/delete?tenantUserId=' + tenantUserId);
    }
}

export default new TenantUserService()