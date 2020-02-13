import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import User from './components/users/User'
import Alert from './components/users/Alert'
import About from './components/pages/About'
import './App.css';
import GithubState from './context/github/GithubState'
import {Home} from './components/pages/Home'
import NotFound from './components/pages/NotFound'

const App = ()=> {

      return (
       <GithubState>
          <Router>
           <div className="App">
              <Navbar />
                <div className='container'>
                  <Alert />
                    <Switch>
                    <Route exact  path='/' component ={Home}/>
                   <Route exact path='/about' component={About}/>
                   <Route exact path='/user/:t' component={User}  />
                   <Route component={NotFound}  />
                </Switch>
              </div>
           </div>
           </Router>
        </GithubState>
        );
}

export default App;

