import React from "react";
import "./Home.scss"
import { Button, Login, Background, Info } from "components";
import { useHistory } from "react-router-dom";
import { imageApi } from "utils/api";

const Index = () => {
    const history = useHistory();
    const onPlay = () => {
        history.replace("/select_pack");
    }
    const onPacks = () => {
        history.replace("/packs");
    }

  return (
      <Background
          image={ imageApi.getImage("naval_battles_background.jpg") }
          className="home"
      >
          <Info
              className="home__info"
              direction="RIGHT"
              timeout={10000}
              title="Главная страница"
              text="Это главноая страница игры. <br>При клике по кнопке <b>ИГРАТЬ</b> - вы попадете на страницу выбора колоды, которую вы будете использовать в бою.
              <br>При клике на кнопку <b>КОЛОДЫ</b> вы попадете на страницу редактирования ваших колод. На ней вы можете добавлять новые колоды, изменять уже существующие
              или удалять ненужные. <br>При клике на <b>иконку юзера</b> вам откроется меню управления юзером"
          />
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