import axios from 'axios'
import {
    BASE_URL
} from '../base.js'
const Instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type':'application/octet-stream',
    }
});

export default Instance;