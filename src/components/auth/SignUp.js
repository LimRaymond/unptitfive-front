import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { registerAction } from '../../store/actions/authActions';
import translate from '../../translations/translate';

const SignUp = (props) => {
  const { handleClickSignInButton } = props;
  const { register, handleSubmit, errors } = useForm();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.errorRegister) {
      handleClickSignInButton();
    }
    // eslint-disable-next-line
  }, [auth]);

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
      password2: data.password2,
      email: data.email,
    };
    dispatch(registerAction(userData));
  };

  return (
    <div className="form-container sign-up-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-title">{translate('CREATE_ACCOUNT', navigator.languages)}</h1>
        { errors.username && <p className="error-message">{errors.username.message}</p> }
        <input
          type="text"
          name="username"
          placeholder={translate('USERNAME', navigator.languages)}
          autoComplete="off"
          ref={register({
            required: translate('USERNAME_FIELD', navigator.languages),
          })}
        />
        { errors.email && <p className="error-message">{errors.email.message}</p> }
        <input
          type="text"
          name="email"
          placeholder={translate('EMAIL', navigator.languages)}
          autoComplete="off"
          ref={register({
            required: translate('EMAIL_FIELD', navigator.languages),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: translate('EMAIL_INVALID', navigator.languages),
            },
          })}
        />
        { errors.password && <p className="error-message">{errors.password.message}</p> }
        <input
          type="password"
          name="password"
          placeholder={translate('PASSWORD', navigator.languages)}
          ref={register({
            required: translate('PASSWORD_FIELD', navigator.languages),
            minLength: { value: 6, message: translate('PASSWORD_MIN', navigator.languages) },
          })}
        />
        <input
          type="password"
          name="password2"
          placeholder={translate('PASSWORD_MATCH', navigator.languages)}
          ref={register}
        />
        { auth.errorRegister ? (<p className="error-message">{auth.messageErrorRegister}</p>) : null}
        <input type="submit" value={translate('SIGN_UP', navigator.languages)} className="form-button" />
      </form>
    </div>
  );
};

SignUp.propTypes = {
  handleClickSignInButton: PropTypes.func.isRequired,
};

export default SignUp;
