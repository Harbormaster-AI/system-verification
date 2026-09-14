import axios from 'axios';

const STANDINGINSTRUCTION_API_BASE_URL = "http://localhost:8080/StandingInstruction";

class StandingInstructionService {

    getStandingInstructions(){
        return axios.get(STANDINGINSTRUCTION_API_BASE_URL + '/' );
    }

    createStandingInstruction(standingInstruction){
        return axios.post(STANDINGINSTRUCTION_API_BASE_URL  + '/create', standingInstruction);
    }

    getStandingInstructionById(standingInstructionId){
        return axios.get(STANDINGINSTRUCTION_API_BASE_URL + '/load?standingInstructionId=' + standingInstructionId);
    }

    updateStandingInstruction(standingInstruction){
        return axios.put(STANDINGINSTRUCTION_API_BASE_URL + '/update', standingInstruction);
    }

    deleteStandingInstruction(standingInstructionId){
        return axios.delete(STANDINGINSTRUCTION_API_BASE_URL + '/delete?standingInstructionId=' + standingInstructionId);
    }
}

export default new StandingInstructionService()