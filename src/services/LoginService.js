import axios from "axios";

const USER_REST_API_URL = 'https://animal-aid-backend.herokuapp.com/user'

class UserService{

    getAllUsers(){
        return axios.get(USER_REST_API_URL)
    }

}

export default new UserService()