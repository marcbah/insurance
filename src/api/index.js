import axios from 'axios';
import {adminServiceUrl} from '../config'

export const AdminAPI = axios.create({
    baseURL: `${adminServiceUrl}/`,
    headers: {
        get:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        },
        post: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
            /*   RESERVED TO ADD MORE PARAMETERS */
        },
        put: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
            /*   RESERVED TO ADD MORE PARAMETERS */
        }
    }
});
