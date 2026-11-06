import axios from 'axios';

const FXTRADE_API_BASE_URL = "http://localhost:8080/FXTrade";

class FXTradeService {

    getFXTrades(){
        return axios.get(FXTRADE_API_BASE_URL + '/' );
    }

    createFXTrade(fXTrade){
        return axios.post(FXTRADE_API_BASE_URL  + '/create', fXTrade);
    }

    getFXTradeById(fXTradeId){
        return axios.get(FXTRADE_API_BASE_URL + '/load?fXTradeId=' + fXTradeId);
    }

    updateFXTrade(fXTrade){
        return axios.put(FXTRADE_API_BASE_URL + '/update', fXTrade);
    }

    deleteFXTrade(fXTradeId){
        return axios.delete(FXTRADE_API_BASE_URL + '/delete?fXTradeId=' + fXTradeId);
    }
}

export default new FXTradeService()