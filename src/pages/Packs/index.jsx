import React from "react";
import { PacksForm } from "components";
export default () =>
    <PacksForm
        name="Колоды"
        description="Нажмите на колоду, чтобы редактировать ее."
        title_info="Страница управления колодами"
        text_info="На этой странице можно <b>добавлять</b>, <b>изменять</b> и <b>удалять</b> ваши колоды
        <br>При клике <b>на одну из карточек</b> вы перейдете на страницу редактировиня выбранной колоды
        <br>При нажатии на иконку <b>мусорной корзины</b> вы удалите выбранную колоду
        <br>Чтобы создать новую колоду нажмите на <b>пустую колоду</b>
        <br>При клике на кнопку <b>ВЫХОД</b> вы перейдете на главную страницу игры
        <br>При клике <b>на иконке юзера</b> вам откроется меню управления юзером"
        timeout_info={25000}
    />