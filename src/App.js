import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import './App.css';
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route path="/auth" component={LandingPage}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
