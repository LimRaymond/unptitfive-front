import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";

import "./App.css";
import Authentification from "./components/auth/Authentification";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/authentification" />
          </Route>
          <Route path="/authentification" component={Authentification} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
