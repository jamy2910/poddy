import axios from 'axios';

export const customFetch = axios.create({
    baseURL: 'https://8cwgjcwwye.eu-west-2.awsapprunner.com/api/v1',
    withCredentials: true
});