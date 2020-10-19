import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
   token: ""
});

export default function reduce(state = initialState, action = {}) {
   switch (action.type) {
       case types.SET_TOKEN:
           return state.merge({
               token: action.value
           });
       default:
           return state;
   }
};

export function token(state) {
   return state.token.token;
};