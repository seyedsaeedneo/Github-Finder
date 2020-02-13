import React,{useReducer} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SEARCH_USERS,
    SET_LOADING,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SHOW_ALERT,
    REMOVE_ALERT}  from '../types'

 let githubClientId ;
 let githubClientSecret ;

 if(process.env.NODE_ENV !=='production'){
    githubClientId     = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
 }else{
    githubClientId     = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET
 }
 const GithubState = props=>{
    const initialState ={
        users:[],
        user :{},
        repos:[],
        loading:false,
        alert:null
    }
  
    const [state, dispatch] = useReducer(GithubReducer, initialState)

     //search Users
    const searchUsers =async text=>{
          setLoading()
        
           const res = await axios.get(
               `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=
           ${githubClientSecret}`);
    
           dispatch({
               type:SEARCH_USERS,
               payload:res.data.items
           })
           
      }
     //get User
     const getUser = async username => {
        setLoading()
      
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=
        ${githubClientId}&client_secret=
        ${githubClientSecret}`);
  
        dispatch({
            type:GET_USER,
            payload:res.data
        })
       }
     //get Repos
     const getUserRepos = async username => {
        setLoading(true)
      
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
        ${githubClientId}&client_secret=
        ${githubClientSecret}`);
  
          dispatch({
            type:GET_REPOS,
            payload :res.data
            })
       }
     //Clear Users
      const clearUsers =()=>dispatch({type:CLEAR_USERS})
     //Set Loading
      const setLoading =()=>dispatch({type:SET_LOADING})
     // show alert
       const showAlert =(msg,tt)=>{
        dispatch({
        type:SHOW_ALERT,
        payload:{msg,tt}
    })
    setTimeout(()=>dispatch({type:REMOVE_ALERT,
        payload:null}),5000)
   }
     return(<GithubContext.Provider
            value={{
               users  :state.users,
               user   :state.user,
               repos  :state.repos,
               loading:state.loading,
               alert:state.alert,
               searchUsers,
               clearUsers,
               getUser,
               getUserRepos,
               showAlert
              }}
        >
         {props.children}
        </GithubContext.Provider>
        ) 
}
export default GithubState