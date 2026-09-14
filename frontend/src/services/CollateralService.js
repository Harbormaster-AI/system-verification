import axios from 'axios';

const COLLATERAL_API_BASE_URL = "http://localhost:8080/Collateral";

class CollateralService {

    getCollaterals(){
        return axios.get(COLLATERAL_API_BASE_URL + '/' );
    }

    createCollateral(collateral){
        return axios.post(COLLATERAL_API_BASE_URL  + '/create', collateral);
    }

    getCollateralById(collateralId){
        return axios.get(COLLATERAL_API_BASE_URL + '/load?collateralId=' + collateralId);
    }

    updateCollateral(collateral){
        return axios.put(COLLATERAL_API_BASE_URL + '/update', collateral);
    }

    deleteCollateral(collateralId){
        return axios.delete(COLLATERAL_API_BASE_URL + '/delete?collateralId=' + collateralId);
    }
}

export default new CollateralService()