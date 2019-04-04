import { SET_PROFILE_PAGE, SET_FOLLOW_UNFOLLOW, ADD_FOLLOWERS, REMOVE_FOLLOWERS } from '../actions/types';
import _ from 'lodash'

const initialState = {
    userPage:{
        data:{},
        followers:[],
        following:[]
    }
};


export default function(state = initialState, action){

    switch (action.type) {
        case SET_PROFILE_PAGE:
            return {
                ...state,
                userPage:action.payload
            };
        case SET_FOLLOW_UNFOLLOW:
            let { userPage } = state;
            userPage.alreadyFollowing = !!action.payload;
            return {
              ...state,
                userPage
            };

        default:
            return state;
    }
}