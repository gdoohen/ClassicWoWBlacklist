import * as types from './actionTypes';

export function setToken(value) {
    return {
        type: types.SET_TOKEN,
        value
    };
};