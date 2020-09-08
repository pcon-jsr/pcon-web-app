import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { firebaseAuth, createUserProfileDocument } from './firebase/firebase.utils';
import { AuthContext } from './contexts';
import { navigationRoutes } from './navigation/routes';
import MainNavigation from './navigation/MainNavigation';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/SplashScreen';
import ProfileScreen from './screens/ProfileScreen';
import InterviewsScreen from './screens/InterviewsScreen';
import CreateInterviewScreen from './screens/CreateInterviewScreen';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingAuthState, setCheckingAuthState] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = firebaseAuth.onAuthStateChanged(async userData => {
      if (userData) {
        const additionalData = {
          registrationNum: '',
          branch: '',
          verified: false,
          appliedForVerification: false,
        };
        const userRef = await createUserProfileDocument(userData, additionalData);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
          setCheckingAuthState(false);
        });
      } else {
        setCurrentUser(null);
        setCheckingAuthState(false);
      }
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

  const commonRoutes = ([
    <Route key={1} exact path={navigationRoutes.HOME}>
      <HomeScreen />
    </Route>,
    <Route key={2} exact path={navigationRoutes.EVENTS}>

    </Route>,
    <Route key={3} exact path={navigationRoutes.PROJECTS}>

    </Route>,
    <Route key={4} exact path={navigationRoutes.ACHIEVEMENTS}>

    </Route>,
    <Route key={5} exact path={navigationRoutes.ALUMINI}>

    </Route>,
    <Route key={6} exact path={navigationRoutes.NOTIFICATIONS}>

    </Route>,
    <Route key={7} exact path={navigationRoutes.TEAM}>

    </Route>,
    <Route key={8} exact path={navigationRoutes.INTERVIEW_EXPERIENCES}>
      <InterviewsScreen />
    </Route>,
    <Route key={9} exact path={navigationRoutes.GALLERY}>

    </Route>,
  ]);


  let routes;
  if (currentUser) {
    routes = (
      <Switch>
        {commonRoutes.map(route => route)}
        <Route exact path={navigationRoutes.PROFILE}>
          <ProfileScreen />
        </Route>
        <Route exact path={navigationRoutes.CREATE_INTERVIEW_EXPERIENCES}>
          <CreateInterviewScreen />
        </Route>
        <Redirect to={navigationRoutes.HOME} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        {commonRoutes.map(route => route)}
        <Route exact path={navigationRoutes.AUTH}>
          <AuthScreen />
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
