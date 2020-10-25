import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./loginStyle.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Overlay from "./Overlay";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [rightPanelActive, setRightPanelActive] = useState(false);

  function handleClickSignUpButton() {
    setRightPanelActive(true);
  }

  function handleClickSignInButton() {
    setRightPanelActive(false);
  }

  return (
    <div className="App">
      <div
        className={`container ${rightPanelActive ? `right-panel-active` : ``}`}
        id="container"
      >
        <SignUp register={register} handleSubmit={handleSubmit} />
        <SignIn register={register} handleSubmit={handleSubmit} />
        <Overlay
          handleClickSignInButton={handleClickSignInButton}
          handleClickSignUpButton={handleClickSignUpButton}
        />
      </div>
    </div>
  );
};

export default Login;
