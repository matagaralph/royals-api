import axios from 'axios';

const royalsApi = axios.create({
    baseURL: 'https://royals.africa',
    headers: {
        Accept: 'application/json',
    },
});

export default royalsApi;
