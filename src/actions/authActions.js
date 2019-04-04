import {OPEN_SNACKBAR, SET_LOADING_STATE,  SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios';
import {openSnackbar} from "../components/Notifier";


const endpoint = `http://localhost:8080`;
// const endpoint = ``;

//Register User
export const registerUser = (userData, history, openSnackbar) => dispatch =>{
    dispatch({
        type:SET_LOADING_STATE,
        payload:true
    });
    axios.post(`${endpoint}/api/auth/register`, userData)
        .then((res)=>{
            if(res.data.success){
                history.push('/login');
                dispatch({
                    type:SET_LOADING_STATE,
                    payload:false
                });
            }
            dispatch({
                type:SET_LOADING_STATE,
                payload:false
            });
            openSnackbar({ varient:'success',message: res.data.message });
        })
        .catch(err=>{
            dispatch({
                type:SET_LOADING_STATE,
                payload:false
            });
            openSnackbar({ varient:'success',message: 'Server Error' });
        })
};

//Login User
export const loginUser = (userData, history, openSnackbar) => dispatch =>{
    dispatch({
        type:SET_LOADING_STATE,
        payload:true
    });
        axios.post(`${endpoint}/api/auth/login`, userData)
            .then((res)=>{
                if(res.data.success){
                    //save to localstorage
                    const { token } = res.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(res.data.data));
                    axios.defaults.headers.common['Authorization']= token;
                    dispatch({
                        type: SET_CURRENT_USER,
                        payload:res.data.data
                    });
                    dispatch({
                        type:SET_LOADING_STATE,
                        payload:false
                    });
                    history.push('/feed');
                    openSnackbar({ varient:'success',message: res.data.message });
                }else{
                    dispatch({
                        type:SET_LOADING_STATE,
                        payload:false
                    });
                    openSnackbar({ varient:'success',message: res.data.message });
                }

            })
            .catch(err=>{
                dispatch({
                    type:SET_LOADING_STATE,
                    payload:false
                });
                openSnackbar({ varient:'success',message: 'Server Error' });
            })
};

export const setCurrentUser = userData => dispatch =>{


    dispatch({
        type:SET_CURRENT_USER,
        payload:userData
    })
};

export const logoutUser = (openSnackBar)=>dispatch => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(false);

    dispatch(setCurrentUser({}));
    window.location.href = '/login';
    openSnackbar({ varient:'success',message: 'Logged Out Successfully!' });
};

