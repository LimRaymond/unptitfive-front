import React from 'react';
import PropTypes from 'prop-types';

import translate from '../../translations/translate';

const Overlay = (props) => {
  const { handleClickSignInButton, handleClickSignUpButton } = props;

  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>{translate('WELCOME_AGAIN', navigator.languages)}</h1>
          <p className="overlay-description">
            {translate('WELCOME_AGAIN_1', navigator.languages)}
            <br />
            {translate('WELCOME_AGAIN_2', navigator.languages)}
          </p>
          <button
            type="button"
            className="ghost form-button"
            id="signIn"
            onClick={handleClickSignInButton}
          >
            {translate('SIGN_IN', navigator.languages)}
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>{translate('HELLO_FRIEND', navigator.languages)}</h1>
          <p className="overlay-description">
            {translate('HELLO_FRIEND_1', navigator.languages)}
            <br />
            {translate('HELLO_FRIEND_2', navigator.languages)}
          </p>
          <button
            type="button"
            className="ghost form-button"
            id="signUp"
            onClick={handleClickSignUpButton}
          >
            {translate('SIGN_UP', navigator.languages)}
          </button>
        </div>
      </div>
    </div>
  );
};

Overlay.propTypes = {
  handleClickSignInButton: PropTypes.func.isRequired,
  handleClickSignUpButton: PropTypes.func.isRequired,
};

export default Overlay;
