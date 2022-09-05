import React, { lazy, Suspense, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import { StylesProvider, createGenerateClassName, LinearProgress } from "@material-ui/core";

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: 'container'
});

export default function App() {
  const [ isSignedIn, setIsSignedIn ] = useState(false)
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
      <div>
      
        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}></Header>
        <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth">
            <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
          </Route>
          <Route path="/" component={MarketingLazy}/>
        </Switch>
        </Suspense>
      </div>
      </StylesProvider>
    </BrowserRouter>
  );
}
