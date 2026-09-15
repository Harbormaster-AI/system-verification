import axios from 'axios';

const BUILDING_API_BASE_URL = "/Building";

class BuildingService {

    getBuildings(){
        return axios.get(BUILDING_API_BASE_URL + '/' );
    }

    createBuilding(building){
        return axios.post(BUILDING_API_BASE_URL  + '/create', building);
    }

    getBuildingById(buildingId){
        return axios.get(BUILDING_API_BASE_URL + '/load?buildingId=' + buildingId);
    }

    updateBuilding(building){
        return axios.put(BUILDING_API_BASE_URL + '/update', building);
    }

    deleteBuilding(buildingId){
        return axios.delete(BUILDING_API_BASE_URL + '/delete?buildingId=' + buildingId);
    }
}

export default new BuildingService()