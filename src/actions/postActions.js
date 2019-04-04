import axios from "axios";
import { ADD_FEED,SET_CURRENT_FEEDS } from "./types";

const endpoint = `http://localhost:8080`;
// const endpoint = ``;

export const createPost = (postData)=>dispatch=>{
    let post = {content:postData};
  axios.post(`${endpoint}/api/post`, post).then(res=>{
      dispatch({
          type: ADD_FEED,
          payload: res.data.data
      })
  })
};

export const getPosts = ()=>dispatch=>{
    axios.get(`${endpoint}/api/post`).then((res)=>{
        dispatch({
            type: SET_CURRENT_FEEDS,
            payload:res.data.data
        });
    })
};