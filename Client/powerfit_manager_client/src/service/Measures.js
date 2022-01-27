import {
    BASE_URL
} from '../base.js'
import axios from 'axios';

const measuresDB = {
    insert: async function (data) {
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + "/medidas/insert", { data })
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

    getInfo: async (data) => {
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + '/medidas/info', { data })
            .then((response) => {
                return response.data[0][0];
            }).catch(error => {
                console.log(error);
            })
            .finally(() => {
                //loading.style.display="none";
            });
        return response;
    },

}
export default measuresDB;