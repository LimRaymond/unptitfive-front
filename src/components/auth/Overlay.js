import React from 'react';
import PropTypes from 'prop-types';

const Overlay = (props) => {
  const { handleClickSignInButton, handleClickSignUpButton } = props;
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Bienvenue à nouveau</h1>
          <p className="overlay-description">
            Pour rester connecter avec nous,
            <br />
            veuillez vous connecter avec vos identifiants
          </p>
          <button
            type="button"
            className="ghost form-button"
            id="signIn"
            onClick={handleClickSignInButton}
          >
            Se connecter
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Salut l&apos;ami !</h1>
          <p className="overlay-description">
            Créer toi un compte
            <br />
            et commence à chatter avec d&apos;autres utilisateurs
          </p>
          <button
            type="button"
            className="ghost form-button"
            id="signUp"
            onClick={handleClickSignUpButton}
          >
            S&apos;inscrire
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
