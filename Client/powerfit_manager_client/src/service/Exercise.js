import {
    BASE_URL
} from '../base.js'
import axios from 'axios';

const exercise = {
    getAll: async () => {
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

    insert: async function(object){
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + "/ejercicio/insert", {object})
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
   update: async function(object){
        //loading.style.display="block";
        const response = await axios.put(BASE_URL + "/ejercicio/put", {object})
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
    delete: async function(id){
        //loading.style.display="block";
        const response = await axios.put(BASE_URL + "/ejercicio/delete", {id})
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
   
}

export default exercise;