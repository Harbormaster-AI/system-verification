import axios from 'axios';

const SCREENINGRESULT_API_BASE_URL = "http://localhost:8080/ScreeningResult";

class ScreeningResultService {

    getScreeningResults(){
        return axios.get(SCREENINGRESULT_API_BASE_URL + '/' );
    }

    createScreeningResult(screeningResult){
        return axios.post(SCREENINGRESULT_API_BASE_URL  + '/create', screeningResult);
    }

    getScreeningResultById(screeningResultId){
        return axios.get(SCREENINGRESULT_API_BASE_URL + '/load?screeningResultId=' + screeningResultId);
    }

    updateScreeningResult(screeningResult){
        return axios.put(SCREENINGRESULT_API_BASE_URL + '/update', screeningResult);
    }

    deleteScreeningResult(screeningResultId){
        return axios.delete(SCREENINGRESULT_API_BASE_URL + '/delete?screeningResultId=' + screeningResultId);
    }
}

export default new ScreeningResultService()