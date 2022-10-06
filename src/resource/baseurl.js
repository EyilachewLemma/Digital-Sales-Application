import axios from "axios";
const apiClient = axios.create({
        baseURL: 'https://marketing.rensysengineering.com/',
        // baseURL: 'https://rensys-laravel.merahitechnologies.com/',    
    // baseURL: 'http://192.168.0.8:8000',

    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',


    }
})
export default apiClient