import axios from 'axios';

const MESSAGINGENDPOINT_API_BASE_URL = "/MessagingEndpoint";

class MessagingEndpointService {

    getMessagingEndpoints(){
        return axios.get(MESSAGINGENDPOINT_API_BASE_URL + '/' );
    }

    createMessagingEndpoint(messagingEndpoint){
        return axios.post(MESSAGINGENDPOINT_API_BASE_URL  + '/create', messagingEndpoint);
    }

    getMessagingEndpointById(messagingEndpointId){
        return axios.get(MESSAGINGENDPOINT_API_BASE_URL + '/load?messagingEndpointId=' + messagingEndpointId);
    }

    updateMessagingEndpoint(messagingEndpoint){
        return axios.put(MESSAGINGENDPOINT_API_BASE_URL + '/update', messagingEndpoint);
    }

    deleteMessagingEndpoint(messagingEndpointId){
        return axios.delete(MESSAGINGENDPOINT_API_BASE_URL + '/delete?messagingEndpointId=' + messagingEndpointId);
    }
}

export default new MessagingEndpointService()