import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  loginAction,
} from '../../store/actions/authActions';
import translate from '../../translations/translate';

const SignIn = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      password: data.password,
    };
    dispatch(loginAction(userData));
  };

  return (
    <div className="form-container sign-in-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-title">{translate('SIGN_IN', navigator.languages)}</h1>
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
        { errors.password && <p className="error-message">{errors.password.message}</p> }
        <input
          type="password"
          name="password"
          placeholder={translate('PASSWORD', navigator.languages)}
          ref={register({
            required: translate('PASSWORD_FIELD', navigator.languages),
          })}
        />
        { !auth.errorRegister ? (<p className="success-message">{auth.auth.message}</p>) : null}
        { auth.errorLogin ? (<p className="error-message">{auth.messageErrorLogin}</p>) : null}
        <input type="submit" value={translate('SIGN_IN', navigator.languages)} className="form-button" />
      </form>
    </div>
  );
};

export default SignIn;
