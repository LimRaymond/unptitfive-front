import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  loginAction,
} from '../../store/actions/authActions';

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

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
        <input
          type="text"
          name="username"
          placeholder="Nom de compte"
          autoComplete="off"
          ref={register}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          ref={register}
        />
        <input type="submit" value="Se connecter" className="form-button" />
      </form>
    </div>
  );
};

export default SignIn;
