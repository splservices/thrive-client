import { SET_CURRENT_USER, SET_LOADING_STATE } from '../actions/types';
import _ from 'lodash'

const initialState = {
    isAuthenticated:false,
    user:{},
    isLoading:false
};


export default function(state = initialState, action){

    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !_.isEmpty(action.payload),
                user:action.payload
            };
        case SET_LOADING_STATE:
            return {
                ...state,
                isLoading:action.payload
            };
        default:
            return state;
    }
}