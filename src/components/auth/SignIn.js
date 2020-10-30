import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  loginAction,
} from '../../store/actions/authActions';

const SignIn = (props) => {
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
        <h1 className="form-title">Connexion</h1>
        { errors.username && <p className="error-message">{errors.username.message}</p> }
        <input
          type="text"
          name="username"
          placeholder="Nom de compte"
          autoComplete="off"
          ref={register({
            required: 'Le champ nom de compte est vide',
            minLength: { value: 1, message: 'Le champ nom de compte ne doit pas être vide'},
          })}
        />
        { errors.password && <p className="error-message">{errors.password.message}</p> }
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          ref={register({
            required: 'Le champ mot de passe est vide',
            minLength: { value: 1, message: 'Le champ nom de compte ne doit pas être vide'},
          })}
        />
        { !auth.errorRegister ? (<p className="success-message">{auth.auth.message}</p>) : null}
        <input type="submit" value="Se connecter" className="form-button" />
      </form>
    </div>
  );
};

export default SignIn;
