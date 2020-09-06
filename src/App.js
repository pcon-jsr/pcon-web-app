import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { firebaseAuth } from './firebase/firebase.utils';
import { AuthContext } from './contexts';
import { navigationRoutes } from './navigation/routes';
import MainNavigation from './navigation/MainNavigation';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/SplashScreen';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingAuthState, setCheckingAuthState] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = firebaseAuth.onAuthStateChanged(userData => {
      const user = {
        userId: userData.uid,
        name: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
      };
      console.log(user);
      setCurrentUser(user);
      setCheckingAuthState(false);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  if (checkingAuthState) {
    return (
      <SplashScreen />
    );
  }

  let routes;
  if (currentUser) {
    routes = (
      <Switch>
        <Route exact path={navigationRoutes.HOME}>
          <HomeScreen />
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
  } else {
    routes = (
      <Switch>
        <Route exact path={navigationRoutes.HOME}>
          <HomeScreen />
        </Route>
        <Route exact path={navigationRoutes.AUTH}>
          <AuthScreen />
        </Route>
        <Route exact path={navigationRoutes.EVENTS}>

        </Route>
        <Route exact path={navigationRoutes.PROJECTS}>

        </Route>
        <Route exact path={navigationRoutes.ACHIEVEMENTS}>

        </Route>
        <Route exact path={navigationRoutes.ALUMINI}>

        </Route>
        <Route exact path={navigationRoutes.TEAM}>

        </Route>
        <Route exact path={navigationRoutes.INTERVIEW_EXPERIENCES}>

        </Route>
        <Route exact path={navigationRoutes.GALLERY}>

        </Route>
        <Redirect to={navigationRoutes.AUTH} />
      </Switch>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          user: currentUser
        }}
      >
        <Router>
          <MainNavigation />
          <main>
            {routes}
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
