import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { registerAction } from '../../store/actions/authActions';

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      password: data.password,
      password2: data.password2,
      email: data.email,
    };
    dispatch(registerAction(userData));
    window.location.reload();
  };

  return (
    <div className="form-container sign-up-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-title">Créer un compte</h1>

        <input
          type="text"
          name="username"
          placeholder="Nom de compte"
          autoComplete="off"
          ref={register}
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse Email"
          autoComplete="off"
          ref={register}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          ref={register}
        />
        <input
          type="password"
          name="password2"
          placeholder="Retapez votre mot de passe"
          ref={register}
        />
        <input type="submit" value="S'inscrire" className="form-button" />
      </form>
    </div>
  );
};

export default SignUp;