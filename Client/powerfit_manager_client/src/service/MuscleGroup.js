import {
    BASE_URL
} from '../base.js'
import axios from 'axios';

const muscle = {
    getAll: async function () {
        //loading.style.display="block";
        const response = await axios.get(BASE_URL + '/musculo/get')
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

    insert: async function (name) {
        //loading.style.display="block";

        const response = await axios.post(BASE_URL + '/muscle/insert', { name })
            .then((response) => {
                return response.data;
            }).catch(error => {
                console.log(error);
            })
            .finally(() => {
                //loading.style.display="none";
            });
        return response;
    },

    update: async function (id, name) {
        //loading.style.display="block";
        console.log(id + name);
        const response = await axios.put(BASE_URL + '/muscle/update', { id, name })
            .then((response) => {
                return response.data;
            }).catch(error => {
                console.log(error);
            })
            .finally(() => {
                //loading.style.display="none";
            });
        return response;
    },
    delete: async function (id) {
        //loading.style.display="block";
        const response = await axios.put(BASE_URL + '/muscle/delete', { id })
            .then((response) => {
                return response.data;
            }).catch(error => {
                console.log(error);
            })
            .finally(() => {
                //loading.style.display="none";
            });
        return response;
    }

}

export default muscle