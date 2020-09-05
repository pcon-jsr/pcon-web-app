import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { navigationRoutes } from './navigation/routes';
import MainNavigation from './navigation/MainNavigation';

function App() {

  let routes;
  routes = (
    <Switch>
      <Route exact path={navigationRoutes.HOME}>

      </Route>
      <Route exact path={navigationRoutes.EVENTS}>

      </Route>
      <Route exact path={navigationRoutes.PROJECTS}>

      </Route>
      <Route exact path={navigationRoutes.ACHIEVEMENTS}>

      </Route>
      <Route exact path={navigationRoutes.ALUMINI}>

      </Route>
      <Route exact path={navigationRoutes.NOTIFICATIONS}>

      </Route>
      <Route exact path={navigationRoutes.TEAM}>

      </Route>
      <Route exact path={navigationRoutes.INTERVIEW_EXPERIENCES}>

      </Route>
      <Route exact path={navigationRoutes.GALLERY}>

      </Route>
      <Redirect to={navigationRoutes.HOME} />
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
