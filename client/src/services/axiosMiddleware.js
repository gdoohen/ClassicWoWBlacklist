import axios from 'axios';

const BASE_URL = "/api";

export const getJSON = async url => {
    return axios({
        method: 'get',
        url: `${BASE_URL}${url}`,
        responseType: 'json'
    }).then(response => {
        return response;
    }).catch(error => {
        console.log("getJSON error", error);
        return error.response;
    });
};

export const post = async (url, body = {}) => {
    return axios({
        method: 'post',
        url: `${BASE_URL}${url}`,
        responseType: 'json',
        data: body
    }).then(response => {
        return response;
    }).catch(error => {
        console.log("post error", error);
        return error.response;
    });
};