import axios from 'axios';

const COMMANDDEFINITION_API_BASE_URL = "/CommandDefinition";

class CommandDefinitionService {

    getCommandDefinitions(){
        return axios.get(COMMANDDEFINITION_API_BASE_URL + '/' );
    }

    createCommandDefinition(commandDefinition){
        return axios.post(COMMANDDEFINITION_API_BASE_URL  + '/create', commandDefinition);
    }

    getCommandDefinitionById(commandDefinitionId){
        return axios.get(COMMANDDEFINITION_API_BASE_URL + '/load?commandDefinitionId=' + commandDefinitionId);
    }

    updateCommandDefinition(commandDefinition){
        return axios.put(COMMANDDEFINITION_API_BASE_URL + '/update', commandDefinition);
    }

    deleteCommandDefinition(commandDefinitionId){
        return axios.delete(COMMANDDEFINITION_API_BASE_URL + '/delete?commandDefinitionId=' + commandDefinitionId);
    }
}

export default new CommandDefinitionService()