import axios from 'axios';

axios.defaults.baseURL = 'https://blog-server.hunger-valley.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.withCredentials = true;

const config = {
	timeout: 5000,
}

export const http = axios.create(config)