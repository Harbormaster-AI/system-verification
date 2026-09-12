import axios from 'axios';

const IDENTITYDOCUMENT_API_BASE_URL = "http://localhost:8080/IdentityDocument";

class IdentityDocumentService {

    getIdentityDocuments(){
        return axios.get(IDENTITYDOCUMENT_API_BASE_URL + '/' );
    }

    createIdentityDocument(identityDocument){
        return axios.post(IDENTITYDOCUMENT_API_BASE_URL  + '/create', identityDocument);
    }

    getIdentityDocumentById(identityDocumentId){
        return axios.get(IDENTITYDOCUMENT_API_BASE_URL + '/load?identityDocumentId=' + identityDocumentId);
    }

    updateIdentityDocument(identityDocument){
        return axios.put(IDENTITYDOCUMENT_API_BASE_URL + '/update', identityDocument);
    }

    deleteIdentityDocument(identityDocumentId){
        return axios.delete(IDENTITYDOCUMENT_API_BASE_URL + '/delete?identityDocumentId=' + identityDocumentId);
    }
}

export default new IdentityDocumentService()