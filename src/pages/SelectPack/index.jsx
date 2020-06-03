import React from "react";
import { PacksForm } from "components";
export default () =>
    <PacksForm
        isSelect
        name="Выберите колоду"
        description="Кликните по колоде, чтобы выбрать"
        title_info="Страница выбора колоды"
        text_info="<b>Выберите</b> одну из созданных вами колод для начала боя просто <b>кликнув по ней</b>
                   <br>При клике на кнопку <b>ВЫХОД</b> вы перейдете на главную страницу игры
                   <br>При клике <b>на иконке юзера</b> вам откроется меню управления юзером"
        timeout_info={25000}
    />
