import React from 'react';
import { createStore, combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth from './store/reducers/auth';
import Course from './store/reducers/course'

//combining all reducer together
const rootReducer=combineReducers({
  Auth:Auth,
  Course:Course
})

//creating store
const store=createStore(rootReducer,applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}><App/></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
