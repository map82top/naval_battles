import React from "react";
import { Route } from "react-router-dom";
import {LoginForm, RegistrationForm, Background, Info} from "components";
import "./Auth.scss"
import { imageApi } from "utils/api";

const Index = () => {
  return (
      <Background
          image={imageApi.getImage("login_background.jpeg")}
          className="auth"
      >
          <Info
              className="auth__content__info"
              title="Об игре"
              text="Naval Battles - это карточная походовая онлайн игра на 2 человек. <br> Игра основанна на одноименной настольной карточной игре
                        <br>Если ты увлекаешься историем военного-морского флота, морскими сражениями, присоединяйся!"
          />
          <Route exact path={["/signin", "/"]} component={LoginForm}/>
          <Route exact path="/signup" component={RegistrationForm} />
      </Background>

  );
};

export default Index;