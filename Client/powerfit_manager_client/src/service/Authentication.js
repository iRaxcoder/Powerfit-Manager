import {
    BASE_URL
} from '../base.js'
import axios from 'axios';

const auth = {
    logIn: function (user) {
        //loading.style.display="block";
        const response = axios.post(BASE_URL + '/aut/iniciar-sesion', {
                username: user.userName,
                password: user.secret
            }).then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                //loading.style.display="none";
            });
        return response;
    },
    logOut: function () {
        const response= axios.get(BASE_URL + '/aut/cerrar-sesion').then((response) => {
            return response.data;
        });
        return response;
    }
}

export default auth;