import axios from 'axios';

const TENANT_API_BASE_URL = "/Tenant";

class TenantService {

    getTenants(){
        return axios.get(TENANT_API_BASE_URL + '/' );
    }

    createTenant(tenant){
        return axios.post(TENANT_API_BASE_URL  + '/create', tenant);
    }

    getTenantById(tenantId){
        return axios.get(TENANT_API_BASE_URL + '/load?tenantId=' + tenantId);
    }

    updateTenant(tenant){
        return axios.put(TENANT_API_BASE_URL + '/update', tenant);
    }

    deleteTenant(tenantId){
        return axios.delete(TENANT_API_BASE_URL + '/delete?tenantId=' + tenantId);
    }
}

export default new TenantService()