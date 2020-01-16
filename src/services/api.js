import axios from 'axios';

//endereço do server... node.
const api = axios.create({
    baseURL: 'http://localhost:3333' 
})

export default api;