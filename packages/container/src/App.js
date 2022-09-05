import React, { lazy, Suspense, useState, useEffect } from "react";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route, Router, Redirect  } from "react-router-dom";
import { StylesProvider, createGenerateClassName, LinearProgress } from "@material-ui/core";
import { createBrowserHistory } from 'history';

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: 'container'
});

const history = createBrowserHistory();

export default function App() {
  const [ isSignedIn, setIsSignedIn ] = useState(false)

  useEffect(() => {
    if(isSignedIn) history.push('/dashboard')
  }, [isSignedIn])

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
      <div>
      
        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}></Header>
        <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth">
            <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
          </Route>
          <Route path="/dashboard">
            { !isSignedIn && <Redirect to="/"></Redirect>}
            <DashboardLazy></DashboardLazy>
          </Route>
          <Route path="/" component={MarketingLazy}/>
        </Switch>
        </Suspense>
      </div>
      </StylesProvider>
    </Router>
  );
}
