import React from "react";
import "./Home.scss"
import { Button, Login, Background } from "components";
import { useHistory } from "react-router-dom";
import { imageApi } from "utils/api";

const Index = () => {
    const history = useHistory();
    const onPlay = () => {
        history.push("/select_pack");
    }
    const onPacks = () => {
        history.push("/packs");
    }

  return (
      <Background
          image={ imageApi.getImage("naval_battles_background.jpg") }
          className="home"
      >
          <div className="home__top">
              <Login
                  theme="dark"
              />
          </div>
          <div className="home__content">
              <div className="home__content__form">
                  <Button title="Играть" className="home__content__form__button" onClick={ onPlay }/>
                  <Button title="Колоды" className="home__content__form__button" onClick={ onPacks }/>
              </div>
          </div>
      </Background>
  );
};

export default Index;