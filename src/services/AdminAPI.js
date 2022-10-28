import axios from "axios";

const ADMIN_REST_API_URL = 'http://localhost:8080/api/clients'

class AdminAPI{

    // get all list of clients inforamtion
    getAllClients(){
        return axios.get(ADMIN_REST_API_URL)
    }

    // get client form by id
    getClientById(clientId){
        return axios.get(ADMIN_REST_API_URL + '/' + clientId);
    }

    // delete client form by id
    deleteClient(clientId){
        return axios.delete(ADMIN_REST_API_URL + '/' + clientId);
    }
}

export default new AdminAPI()