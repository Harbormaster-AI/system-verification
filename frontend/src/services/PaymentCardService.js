import axios from 'axios';

const PAYMENTCARD_API_BASE_URL = "http://localhost:8080/PaymentCard";

class PaymentCardService {

    getPaymentCards(){
        return axios.get(PAYMENTCARD_API_BASE_URL + '/' );
    }

    createPaymentCard(paymentCard){
        return axios.post(PAYMENTCARD_API_BASE_URL  + '/create', paymentCard);
    }

    getPaymentCardById(paymentCardId){
        return axios.get(PAYMENTCARD_API_BASE_URL + '/load?paymentCardId=' + paymentCardId);
    }

    updatePaymentCard(paymentCard){
        return axios.put(PAYMENTCARD_API_BASE_URL + '/update', paymentCard);
    }

    deletePaymentCard(paymentCardId){
        return axios.delete(PAYMENTCARD_API_BASE_URL + '/delete?paymentCardId=' + paymentCardId);
    }
}

export default new PaymentCardService()