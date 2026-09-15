import axios from 'axios';

const FLOOR_API_BASE_URL = "/Floor";

class FloorService {

    getFloors(){
        return axios.get(FLOOR_API_BASE_URL + '/' );
    }

    createFloor(floor){
        return axios.post(FLOOR_API_BASE_URL  + '/create', floor);
    }

    getFloorById(floorId){
        return axios.get(FLOOR_API_BASE_URL + '/load?floorId=' + floorId);
    }

    updateFloor(floor){
        return axios.put(FLOOR_API_BASE_URL + '/update', floor);
    }

    deleteFloor(floorId){
        return axios.delete(FLOOR_API_BASE_URL + '/delete?floorId=' + floorId);
    }
}

export default new FloorService()