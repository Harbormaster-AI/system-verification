import axios from 'axios';

const TELEMETRYSTREAM_API_BASE_URL = "/TelemetryStream";

class TelemetryStreamService {

    getTelemetryStreams(){
        return axios.get(TELEMETRYSTREAM_API_BASE_URL + '/' );
    }

    createTelemetryStream(telemetryStream){
        return axios.post(TELEMETRYSTREAM_API_BASE_URL  + '/create', telemetryStream);
    }

    getTelemetryStreamById(telemetryStreamId){
        return axios.get(TELEMETRYSTREAM_API_BASE_URL + '/load?telemetryStreamId=' + telemetryStreamId);
    }

    updateTelemetryStream(telemetryStream){
        return axios.put(TELEMETRYSTREAM_API_BASE_URL + '/update', telemetryStream);
    }

    deleteTelemetryStream(telemetryStreamId){
        return axios.delete(TELEMETRYSTREAM_API_BASE_URL + '/delete?telemetryStreamId=' + telemetryStreamId);
    }
}

export default new TelemetryStreamService()