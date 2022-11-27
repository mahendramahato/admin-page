import axios from "axios";

const ADMIN_REST_API_URL = 'http://localhost:8080/api/clients'
const ASSIGN_ANIMAL = 'http://localhost:8080/api/clients/assign/'

const APPOINTMENT_SCALE_LOW = 'http://localhost:8080/api/clients/low/'
const APPOINTMENT_SCALE_MEDIUM = 'http://localhost:8080/api/clients/medium/'
const APPOINTMENT_SCALE_HIGH = 'http://localhost:8080/api/clients/high/'

const WEEKEND_FOSTER = 'http://localhost:8080/api/clients/weekend'
const SHORT_FOSTER = 'http://localhost:8080/api/clients/short'
const FAMILY_FOSTER = 'http://localhost:8080/api/clients/family'

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






        // get all list of clients with low scale appointments
        getAllClientByLow(){
            return axios.get(APPOINTMENT_SCALE_LOW)
        }
    
        // get all list of clients with medium scale appointments
        getAllClientByMedium(){
            return axios.get(APPOINTMENT_SCALE_MEDIUM)
        }
    
        // get all list of clients with high scale appointments
        getAllClientByHigh(){
            return axios.get(APPOINTMENT_SCALE_HIGH)
        }
    
        // get all list of clients with weekend foster
        getAllClientByWeekend(){
            return axios.get(WEEKEND_FOSTER)
        }
    
        // get all list of clients with short foster
        getAllClientByShort(){
            return axios.get(SHORT_FOSTER)
        }
    
        // get all list of clients with family foster
        getAllClientByFamily(){
            return axios.get(FAMILY_FOSTER)
        }


}

export default new AdminAPI()