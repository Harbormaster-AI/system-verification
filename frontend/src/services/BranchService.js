import axios from 'axios';

const BRANCH_API_BASE_URL = "http://localhost:8080/Branch";

class BranchService {

    getBranchs(){
        return axios.get(BRANCH_API_BASE_URL + '/' );
    }

    createBranch(branch){
        return axios.post(BRANCH_API_BASE_URL  + '/create', branch);
    }

    getBranchById(branchId){
        return axios.get(BRANCH_API_BASE_URL + '/load?branchId=' + branchId);
    }

    updateBranch(branch){
        return axios.put(BRANCH_API_BASE_URL + '/update', branch);
    }

    deleteBranch(branchId){
        return axios.delete(BRANCH_API_BASE_URL + '/delete?branchId=' + branchId);
    }
}

export default new BranchService()