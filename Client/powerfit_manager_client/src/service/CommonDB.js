import {
    BASE_URL
} from '../base.js'
import axios from 'axios';

const commonDB = {
    getAll: async (data) => {
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + '/module/get',{data})
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

    getSearch: async (data) => {
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + '/module/get-search',{data})
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

    insert: async function(data){
        console.log(data);
        //loading.style.display="block";
        const response = await axios.post(BASE_URL + "/module/insert", {data})
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
   update: async function(data){
        //loading.style.display="block";
        const response = await axios.put(BASE_URL + "/module/put", {data})
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
    delete: async function(data){
        //loading.style.display="block";
        const response = await axios.put(BASE_URL + "/module/delete", {data})
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

export default commonDB;