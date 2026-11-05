import axios from 'axios';

const CUSTOMER_API_BASE_URL = "http://localhost:8080/Customer";

class CustomerService {

    getCustomers(){
        return axios.get(CUSTOMER_API_BASE_URL + '/' );
    }

    createCustomer(customer){
        return axios.post(CUSTOMER_API_BASE_URL  + '/create', customer);
    }

    getCustomerById(customerId){
        return axios.get(CUSTOMER_API_BASE_URL + '/load?customerId=' + customerId);
    }

    updateCustomer(customer){
        return axios.put(CUSTOMER_API_BASE_URL + '/update', customer);
    }

    deleteCustomer(customerId){
        return axios.delete(CUSTOMER_API_BASE_URL + '/delete?customerId=' + customerId);
    }
}

export default new CustomerService()