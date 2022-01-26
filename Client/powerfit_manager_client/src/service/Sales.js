import {
    BASE_URL
} from '../base.js'
import axios from 'axios';

const SalesDB = {
    insert: async (data) => {
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + '/sales/insert', { data })
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
    getSaleInfo: async (data) => {
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + '/sales/get-sale-info', { data })
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

export default SalesDB;