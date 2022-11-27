
import axios from "axios";

const ANIMAL_REST_API_URL = 'http://localhost:8080/api/animals'

class AnimalAPI{

    // get all list of clients inforamtion
    getAllAnimals(){
        return axios.get(ANIMAL_REST_API_URL)
    }

    // create new animal
    createAnimal(animal){
        return axios.post(ANIMAL_REST_API_URL, animal)
    }


}

export default new AnimalAPI()