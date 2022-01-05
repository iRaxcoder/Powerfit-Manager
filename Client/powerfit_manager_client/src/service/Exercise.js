import {
    BASE_URL
} from '../base.js'
import axios from 'axios';
import Instance from './Instance.js';

export default {
    getAll: async () => {
        return await axios.get(BASE_URL + '/ejercicio/get');
    }
}
