import React from "react";
import { Route } from "react-router-dom";
import {LoginForm, RegistrationForm, Background} from "components";
import "./Auth.scss"
import { imageApi } from "utils/api";

const Index = () => {
  return (
      <Background
          image={imageApi.getImage("login_background.jpeg")}
          className="auth"
      >
          <Route exact  path="/signin" component={LoginForm}/>
          <Route exact path="/signup" component={RegistrationForm} />
      </Background>

  );
};

export default Index;