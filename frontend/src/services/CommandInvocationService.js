import axios from 'axios';

const COMMANDINVOCATION_API_BASE_URL = "/CommandInvocation";

class CommandInvocationService {

    getCommandInvocations(){
        return axios.get(COMMANDINVOCATION_API_BASE_URL + '/' );
    }

    createCommandInvocation(commandInvocation){
        return axios.post(COMMANDINVOCATION_API_BASE_URL  + '/create', commandInvocation);
    }

    getCommandInvocationById(commandInvocationId){
        return axios.get(COMMANDINVOCATION_API_BASE_URL + '/load?commandInvocationId=' + commandInvocationId);
    }

    updateCommandInvocation(commandInvocation){
        return axios.put(COMMANDINVOCATION_API_BASE_URL + '/update', commandInvocation);
    }

    deleteCommandInvocation(commandInvocationId){
        return axios.delete(COMMANDINVOCATION_API_BASE_URL + '/delete?commandInvocationId=' + commandInvocationId);
    }
}

export default new CommandInvocationService()