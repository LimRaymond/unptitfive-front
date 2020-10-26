/* eslint-disable */
import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import './App.css';
import Authentification from './components/auth/Authentification';
import Chat from './components/chat/Chat';
import { setUserAction } from './store/actions/authActions';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={props => Cookies.get('isConnected') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: rest.redirectedPath,
        state: { from: props.location },
      }}
      />
    )}
  />
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const myCookie = Cookies.get('user');
    if (myCookie) {
      dispatch(setUserAction(myCookie));
    }
  });

  return (
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
};

export default App;
