import React, { Component } from 'react'
import Loginpage from './container/Loginpage'
import './App.css';
import {Provider} from 'react-redux';
import createStore from './redux/configstore/Configstore';
import {BrowserRouter as Router} from 'react-router-dom';
import { Route } from 'react-router-dom';
import Signuppage from './container/Signuppage';
import UserList from "./container/UserList"

const store=createStore()
class App extends Component {
  render() {
    
    return (
      <Provider store={store}>
        <Router>
          <div className ='App'>
            <Route exact path ='/' component ={Loginpage} />
            <Route exact path ='/signup' component={Signuppage} />
            <Route exact path ='/userlist' component={UserList} />

          </div>
        </Router>
      </Provider>
    )
  }
}

export default App


                        