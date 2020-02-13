import React, { Fragment,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'

import Repos from '../repos/Repos'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'



    const User=({match}) => {
      const githubContext =useContext(GithubContext)

      const {repos,getUserRepos,loading,getUser,user} = githubContext
     
   
      useEffect(()=>{
        getUser(match.params.t) 
        getUserRepos(match.params.t)  
        //eslint-disable-next-line
      },[])

        const {
            name,
            company,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
           }=user;
         
           if(loading)return<Spinner/>
           return ( 
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back To Search
                </Link>
                Hireable:{''}
                {hireable? <i className='fas fa-check text-succes'/>: <i className='fas fa-times-circle text-danger'/>}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} className='round-img' alt='' style={{width:'150px'}}/>
                        <h1>{name}</h1>
                        <p>location:{location}</p>
                    </div>
                <div>
                {bio&&(<Fragment>
    
                     <h3>Bio</h3>
                     <p>{bio}</p>
                     <a href={html_url} className='btn btn-dark my-1'>Visit Git hub Profile</a>
                     <ul>
                      <li>
                    {login && <Fragment><strong>Username:</strong>{login}</Fragment>}
                      </li>
                    </ul>
                    <ul>
                      <li>
                      {company && <Fragment><strong>Company:</strong>{company}</Fragment>}
                      </li>
                    </ul>
                    <ul>
                      <li>
                      {blog && <Fragment><strong>Website:</strong>{blog}</Fragment>}
                      </li>
                    </ul>
                     </Fragment>
                   
                    )}
                  </div>
                  </div>
                  <div className='card text-center'>
                      <div className='badge badge-primary'>Followers:{followers} </div>
                      <div className='badge badge-success'>Following:{following} </div>
                      <div className='badge badge-light'>public Repos:{public_repos} </div>
                      <div className='badge badge-dark'>public Gists:{public_gists} </div>
                  </div>
                  <Repos repos={repos}/>
                  
            </Fragment>
                  )
       
}    

    export default User
    
    
    