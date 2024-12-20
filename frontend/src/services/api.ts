import axios from 'axios';

//const api = axios.create({
// baseURL: 'http://localhost:3000/api',
//  headers: { 'Content-Type': 'application/json' },
//});

const api = axios.create({
    baseURL: 'http://192.168.1.7:3000/api', 
});

export default api;
