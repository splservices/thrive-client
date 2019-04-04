import { combineReducers } from 'redux';
import  authReducer  from './authReducer';
import snackbarReducer from './snackbarReducer';
import feedReducer from './feedReducer';
import userReducer from "./userReducer";

export default combineReducers({
    auth:authReducer,
    feed:feedReducer,
    userPage:userReducer,
    snackbar:snackbarReducer
});