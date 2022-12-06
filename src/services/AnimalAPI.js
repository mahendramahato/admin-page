
import axios from "axios";

const ANIMAL_REST_API_URL = 'https://animal-aid-backend.herokuapp.com/api/animals'

class AnimalAPI{

    // get all list of animals inforamtion
    getAllAnimals(){
        return axios.get(ANIMAL_REST_API_URL)
    }

    // create new animal
    createAnimal(animal){
        return axios.post(ANIMAL_REST_API_URL, animal)
    }

    // get assigned animal form by id
    getAnimalById(animal){
        return axios.get(ANIMAL_REST_API_URL + '/' + animal);
    }
    // delete assigned animal api by id
    deleteForm(aid){
        return axios.delete(ANIMAL_REST_API_URL +'/' +  aid);
    }
    // update assigned animal by id
    updateForm(animalId, animal){
        return axios.put(ANIMAL_REST_API_URL +'/' +  animalId, animal);
    }


}

export default new AnimalAPI()