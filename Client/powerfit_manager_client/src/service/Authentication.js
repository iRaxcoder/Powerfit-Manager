import {
    BASE_URL
} from '../base.js'
import axios from 'axios';

const auth = {
    logIn: function (user) {
       const response= axios.post(BASE_URL + '/aut/iniciar-sesion', {
                username: user.userName,
                password: user.secret
            }).then(response=>{
                return response.data;
            });
            
        return response;
    },
    logOut: function () {

    }
}

export default auth;