import axios from "axios";

const ADMIN_REST_API_URL = 'http://localhost:8081/api/clients'
const ASSIGN_ANIMAL = 'http://localhost:8081/api/clients/assign/'

const APPOINTMENT_SCALE_LOW = 'http://localhost:8081/api/clients/assign/low/'
const APPOINTMENT_SCALE_MEDIUM = 'http://localhost:8081/api/clients/assign/medium/'
const APPOINTMENT_SCALE_HIGH = 'http://localhost:8081/api/clients/assign/high/'

const LOW_COUNT = 'http://localhost:8081/api/clients/alists/lcount'

const WEEKEND_FOSTER = 'http://localhost:8081/api/clients/weekend'
const SHORT_FOSTER = 'http://localhost:8081/api/clients/short'
const FAMILY_FOSTER = 'http://localhost:8081/api/clients/family'

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
    deleteForm(clientId){
        return axios.delete(ADMIN_REST_API_URL + '/' + clientId);
    }

    // update client form by id
    updateForm(clientId, client){
        return axios.put(ADMIN_REST_API_URL + '/' + clientId, client);
    }
    //create client
    createClient(un_client){
        return axios.post(ADMIN_REST_API_URL, un_client)
    }

    // --------------------------------------------------------------------------

    // create assigned animal
    createAssignClient(assignedPet){
        return axios.post(ASSIGN_ANIMAL, assignedPet)
    }
    // get all assigned animal client
    getAllAssignedAnimals(){
        return axios.get(ASSIGN_ANIMAL)
    }
    // get assigned client form by id
    getAssignedClientById(clientId){
        return axios.get(ASSIGN_ANIMAL + clientId);
    }
    // delete assigned client api by id
    deleteAssignClient(aid){
        return axios.delete(ASSIGN_ANIMAL + aid);
    }
    // update assigned client by id
    updateAForm(clientId, client){
        return axios.put(ASSIGN_ANIMAL + clientId, client);
    }

    // --------------------------------------------------------------------------
    // query for low high and medium appointment scale

    // get all list of clients with low scale appointments
    getAllAAnimalsByLow(){
        return axios.get(APPOINTMENT_SCALE_LOW)
    }

    // get all list of clients with medium scale appointments
    getAllAAnimalsByMedium(){
        return axios.get(APPOINTMENT_SCALE_MEDIUM)
    }

    // get all list of clients with high scale appointments
    getAllAAnimalsByHigh(){
        return axios.get(APPOINTMENT_SCALE_HIGH)
    }

}

export default new AdminAPI()