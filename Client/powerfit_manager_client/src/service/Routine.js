import {
    BASE_URL
} from '../base.js'
import axios from 'axios';

const RoutineDB = {
    insert: async (data) => {
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + '/routine/insert', { data })
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
    getSearch: async (data) => {
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + '/routine/get-search', { data })
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

export default RoutineDB;