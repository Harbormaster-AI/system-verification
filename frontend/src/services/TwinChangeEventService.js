import axios from 'axios';

const TWINCHANGEEVENT_API_BASE_URL = "/TwinChangeEvent";

class TwinChangeEventService {

    getTwinChangeEvents(){
        return axios.get(TWINCHANGEEVENT_API_BASE_URL + '/' );
    }

    createTwinChangeEvent(twinChangeEvent){
        return axios.post(TWINCHANGEEVENT_API_BASE_URL  + '/create', twinChangeEvent);
    }

    getTwinChangeEventById(twinChangeEventId){
        return axios.get(TWINCHANGEEVENT_API_BASE_URL + '/load?twinChangeEventId=' + twinChangeEventId);
    }

    updateTwinChangeEvent(twinChangeEvent){
        return axios.put(TWINCHANGEEVENT_API_BASE_URL + '/update', twinChangeEvent);
    }

    deleteTwinChangeEvent(twinChangeEventId){
        return axios.delete(TWINCHANGEEVENT_API_BASE_URL + '/delete?twinChangeEventId=' + twinChangeEventId);
    }
}

export default new TwinChangeEventService()