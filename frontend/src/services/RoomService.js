import axios from 'axios';

const ROOM_API_BASE_URL = "/Room";

class RoomService {

    getRooms(){
        return axios.get(ROOM_API_BASE_URL + '/' );
    }

    createRoom(room){
        return axios.post(ROOM_API_BASE_URL  + '/create', room);
    }

    getRoomById(roomId){
        return axios.get(ROOM_API_BASE_URL + '/load?roomId=' + roomId);
    }

    updateRoom(room){
        return axios.put(ROOM_API_BASE_URL + '/update', room);
    }

    deleteRoom(roomId){
        return axios.delete(ROOM_API_BASE_URL + '/delete?roomId=' + roomId);
    }
}

export default new RoomService()