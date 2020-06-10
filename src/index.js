import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom"
import {createStore} from 'redux' 
import {Provider} from 'react-redux'

const initialstate = {
  user:{email:'',password:'',isAuthenticated:false}
}

function reducer (state=initialstate,action){
  if(action.type==='LOGIN'){
    state.user = action.payload
    state.user.isAuthenticated = true;
  }
  return state

}
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <App />
  </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
