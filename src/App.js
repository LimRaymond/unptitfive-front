import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/landing/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
