/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';

import './App.css';
import './dark.css';
import Authentification from './components/auth/Authentification';
import Chat from './components/chat/Chat';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (Cookies.get('isConnected') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: rest.redirectedPath,
        state: { from: props.location },
      }}
      />
    ))}
  />
);

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/authentification" />
        </Route>
        <Route exact path="/authentification" component={Authentification} />
        <PrivateRoute exact path="/chat" redirectedPath="/authentification" component={Chat} />
        <Redirect from="*" to="/chat" />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
