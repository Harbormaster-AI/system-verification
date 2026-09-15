import axios from 'axios';

const GATEWAY_API_BASE_URL = "/Gateway";

class GatewayService {

    getGateways(){
        return axios.get(GATEWAY_API_BASE_URL + '/' );
    }

    createGateway(gateway){
        return axios.post(GATEWAY_API_BASE_URL  + '/create', gateway);
    }

    getGatewayById(gatewayId){
        return axios.get(GATEWAY_API_BASE_URL + '/load?gatewayId=' + gatewayId);
    }

    updateGateway(gateway){
        return axios.put(GATEWAY_API_BASE_URL + '/update', gateway);
    }

    deleteGateway(gatewayId){
        return axios.delete(GATEWAY_API_BASE_URL + '/delete?gatewayId=' + gatewayId);
    }
}

export default new GatewayService()