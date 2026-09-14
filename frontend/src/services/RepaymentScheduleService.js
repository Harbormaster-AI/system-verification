import axios from 'axios';

const REPAYMENTSCHEDULE_API_BASE_URL = "http://localhost:8080/RepaymentSchedule";

class RepaymentScheduleService {

    getRepaymentSchedules(){
        return axios.get(REPAYMENTSCHEDULE_API_BASE_URL + '/' );
    }

    createRepaymentSchedule(repaymentSchedule){
        return axios.post(REPAYMENTSCHEDULE_API_BASE_URL  + '/create', repaymentSchedule);
    }

    getRepaymentScheduleById(repaymentScheduleId){
        return axios.get(REPAYMENTSCHEDULE_API_BASE_URL + '/load?repaymentScheduleId=' + repaymentScheduleId);
    }

    updateRepaymentSchedule(repaymentSchedule){
        return axios.put(REPAYMENTSCHEDULE_API_BASE_URL + '/update', repaymentSchedule);
    }

    deleteRepaymentSchedule(repaymentScheduleId){
        return axios.delete(REPAYMENTSCHEDULE_API_BASE_URL + '/delete?repaymentScheduleId=' + repaymentScheduleId);
    }
}

export default new RepaymentScheduleService()