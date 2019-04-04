import { OPEN_SNACKBAR } from '../actions/types'
const initialState = {
    success:false,
    message:''
};


export default function(state = initialState, action){
    switch (action.type) {
        case OPEN_SNACKBAR:
            return action.payload;
        default:
            return state;
    }
}