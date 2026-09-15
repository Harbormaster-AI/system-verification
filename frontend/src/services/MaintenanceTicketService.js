import axios from 'axios';

const MAINTENANCETICKET_API_BASE_URL = "/MaintenanceTicket";

class MaintenanceTicketService {

    getMaintenanceTickets(){
        return axios.get(MAINTENANCETICKET_API_BASE_URL + '/' );
    }

    createMaintenanceTicket(maintenanceTicket){
        return axios.post(MAINTENANCETICKET_API_BASE_URL  + '/create', maintenanceTicket);
    }

    getMaintenanceTicketById(maintenanceTicketId){
        return axios.get(MAINTENANCETICKET_API_BASE_URL + '/load?maintenanceTicketId=' + maintenanceTicketId);
    }

    updateMaintenanceTicket(maintenanceTicket){
        return axios.put(MAINTENANCETICKET_API_BASE_URL + '/update', maintenanceTicket);
    }

    deleteMaintenanceTicket(maintenanceTicketId){
        return axios.delete(MAINTENANCETICKET_API_BASE_URL + '/delete?maintenanceTicketId=' + maintenanceTicketId);
    }
}

export default new MaintenanceTicketService()