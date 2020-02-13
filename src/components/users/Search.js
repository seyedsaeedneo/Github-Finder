import React, {useState,useContext } from 'react'

import GithubContext from '../../context/github/githubContext'

const Search =(  )=>{
  const githubContext = useContext(GithubContext)
  const {showAlert} = githubContext
  

  const[text,setText]= useState('')
   
   const onSubmit = e=>{
        e.preventDefault()
         if(text===''){
           showAlert('Plese enter something','light')
         }else{
          githubContext.searchUsers(text);
           setText('')
        }
      }
      const onChange = e=> setText(e.target.value)

    return (
            <div>
                 <form onSubmit={onSubmit}>
                    <input 
                     type='text'
                     name='text' 
                     placeholder='Search users...' 
                     value={text}
                     onChange={onChange}
                     />
                    <input type='submit' value='search' className='btn btn-dark btn-block'/>
                    </form>
                    {githubContext.users.length>0&&(
                      <button  className='btn btn-light btn-block' onClick={githubContext.clearUsers}>
                        Clear 
                      </button >
                    )}
                    
             </div>
        )       
    
}

export default Search
