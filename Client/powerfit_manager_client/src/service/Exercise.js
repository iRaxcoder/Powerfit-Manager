import {
    BASE_URL
} from '../base.js'
import axios from 'axios';

const exercise = {
    getAll: async function () {
        //loading.style.display="block";
        const response = await axios.get(BASE_URL + '/ejercicio/get')
            .then((response) => {
                return response.data[0];
            }).catch(error => {
                console.log(error);
            })
            .finally(() => {
                //loading.style.display="none";
            });
        return response;
    },
}

export default exercise;