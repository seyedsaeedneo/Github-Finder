import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
    SHOW_ALERT,
    REMOVE_ALERT
} from '../types'

export default (state,action)=>{
  switch(action.type){
      case SEARCH_USERS:
      return {
          ...state,
          users:action.payload,
          loading:false
       } 
       case GET_USER:
           return{
               ...state,
               user:action.payload,
               loading:false
           }
           case GET_REPOS:
               return{
                   ...state,
                   repos:action.payload
               }
       case CLEAR_USERS:
      return{
          ...state,
         users:[], 
         loading:false
     }  
      case SET_LOADING:
      return {
        ...state, 
         loading:true
      }
      case SHOW_ALERT:
      return {
        ...state,
        alert:action.payload,
       }
       case REMOVE_ALERT:
           return{
            ...state,
            alert:action.payload,  
           }
      default :
      return state
  }
}