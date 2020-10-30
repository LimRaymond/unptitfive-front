import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { registerAction } from '../../store/actions/authActions';

const SignUp = (props) => {
  const { handleClickSignInButton } = props;
  const { register, handleSubmit, errors } = useForm();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.errorRegister) {
      handleClickSignInButton();
    }
  }, [auth.errorRegister]);

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
        <h1 className="form-title">Créer un compte</h1>
        { errors.username && <p className="error-message">{errors.username.message}</p> }
        <input
          type="text"
          name="username"
          placeholder="Nom de compte"
          autoComplete="off"
          ref={register({
            required: 'Un nom de compte est nécessaire',
            minLength: { value: 1, message: 'Le nom de compte doit contenir 1 caractères minimum'},
          })}
        />
        { errors.email && <p className="error-message">{errors.email.message}</p> }
        <input
          type="text"
          name="email"
          placeholder="Adresse Email"
          autoComplete="off"
          ref={register({
            required: 'Une adresse email est nécessaire',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "L'adresse email est invalide",
            }
          })}
        />
        { errors.password && <p className="error-message">{errors.password.message}</p> }
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          ref={register({
            required: 'Un mot de passe est nécessaire',
            minLength: { value: 6, message: 'Le mot de passe doit contenir 6 caractères minimum'},
          })}
        />
        <input
          type="password"
          name="password2"
          placeholder="Retapez votre mot de passe"
          ref={register}
        />
        { auth.errorRegister ? (<p className="error-message">{auth.messageErrorRegister}</p>) : null}
        <input type="submit" value="S'inscrire" className="form-button" />
      </form>
    </div>
  );
};

export default SignUp;
