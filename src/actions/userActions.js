import axios from "axios";
import { SET_PROFILE_PAGE, SET_FOLLOW_UNFOLLOW, ADD_FOLLOWERS } from "./types";

const endpoint = `http://localhost:8080`;
// const endpoint = ``;

export const getUser = (user)=>dispatch=>{
    axios.get(`${endpoint}/api/user/${user}`).then((res)=>{
        dispatch({
            type: SET_PROFILE_PAGE,
            payload:res.data
        })
    })
};

export const followUser = (user)=>dispatch=>{

  axios.post(`${endpoint}/api/user/${user}/follow`)
      .then(res=>{
          dispatch({
              type:SET_FOLLOW_UNFOLLOW,
              payload:true
          });

      })
      .catch(err=>{
          console.log(err);
      })
};

export const unfollowUser = (user)=>dispatch=>{
    axios.post(`${endpoint}/api/user/${user}/unfollow`)
        .then(res=>{
            dispatch({
                type:SET_FOLLOW_UNFOLLOW,
                payload:false
            })
        })
        .catch(err=>{
            console.log(err);
        })
};