import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

import './loginStyle.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Overlay from './Overlay';
import useDarkMode from '../../hooks/useDarkMode';

const Authentification = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const isConnected = Cookies.get('isConnected');
  useDarkMode();

  useEffect(() => {
    if (isConnected || auth.errorLogin === false) {
      history.push('/chat');
    }
  });

  function handleClickSignUpButton() {
    setRightPanelActive(true);
  }

  function handleClickSignInButton() {
    setRightPanelActive(false);
  }

  return (
    <div className="App">
      <div
        className={rightPanelActive ? 'container right-panel-active' : 'container'}
        id="container"
      >
        <SignUp handleClickSignInButton={handleClickSignInButton} />
        <SignIn />
        <Overlay
          handleClickSignInButton={handleClickSignInButton}
          handleClickSignUpButton={handleClickSignUpButton}
        />
      </div>
    </div>
  );
};

export default Authentification;
