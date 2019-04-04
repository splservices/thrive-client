import { ADD_FEED, SET_CURRENT_FEEDS } from '../actions/types';
import _ from 'lodash'

const initialState = {
    feeds:[]
};


export default function(state = initialState, action){

    switch (action.type) {
        case ADD_FEED:
            let feeds = state.feeds;
            feeds.unshift(action.payload);
            return {
                ...state,
                feeds:feeds
            };
        case SET_CURRENT_FEEDS:
            return {
                ...state,
                feeds:action.payload
            };
        default:
            return state;
    }
}