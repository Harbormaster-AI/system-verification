import axios from 'axios';

const TELEMETRYSCHEMA_API_BASE_URL = "/TelemetrySchema";

class TelemetrySchemaService {

    getTelemetrySchemas(){
        return axios.get(TELEMETRYSCHEMA_API_BASE_URL + '/' );
    }

    createTelemetrySchema(telemetrySchema){
        return axios.post(TELEMETRYSCHEMA_API_BASE_URL  + '/create', telemetrySchema);
    }

    getTelemetrySchemaById(telemetrySchemaId){
        return axios.get(TELEMETRYSCHEMA_API_BASE_URL + '/load?telemetrySchemaId=' + telemetrySchemaId);
    }

    updateTelemetrySchema(telemetrySchema){
        return axios.put(TELEMETRYSCHEMA_API_BASE_URL + '/update', telemetrySchema);
    }

    deleteTelemetrySchema(telemetrySchemaId){
        return axios.delete(TELEMETRYSCHEMA_API_BASE_URL + '/delete?telemetrySchemaId=' + telemetrySchemaId);
    }
}

export default new TelemetrySchemaService()