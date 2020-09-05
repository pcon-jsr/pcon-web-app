import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './navigation/MainNavigation';

function App() {

  let routes;
  routes = (
    <Switch>
      <Route exact path="/">

      </Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div className="App">
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </div>
  );
}

export default App;
