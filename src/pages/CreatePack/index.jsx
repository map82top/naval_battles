import React, {useEffect, useState} from "react";
import {Background, CostIndicator, ChangePackExitButton, Slider, Info} from "components";
import { withRouter } from 'react-router-dom'
import "./CreatePack.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { imageApi } from "utils/api";
import { changePack } from "redux/actions";
import { connect } from "react-redux";
import {PackNameInput} from "../../components";

const CreatePack = (props) => {
    const {
        location,
        fetchChangePack,
        moveCards,
        resetState
    } = props

    const [allCardsBorderVisible,  setAllCardsBorderVisible] = useState(false);
    const [myCardsBorderVisible,  setMyCardsBorderVisible] = useState(false);
    const max_cost = 25;

    useEffect(() => {
        fetchChangePack(location.state)
        return () => {
            resetState()
        }
    }, [])

    const onDragStart = ({draggableId, source}) => {
        if (source.droppableId === "reserve") {
           setMyCardsBorderVisible(true);

        } else if (source.droppableId === "main"){
            setAllCardsBorderVisible(true);
        }
    }

    const onDragEnd = result => {
        const {source, destination} = result
        moveCards(result)
        source.droppableId === "reserve" ?  setMyCardsBorderVisible(false) : setAllCardsBorderVisible(false)
    }

    return (
        <Background
            className="create_pack"
            image={imageApi.getImage("table_background.jpg")}
        >
            <Info
                className="create_pack__info"
                direction="RIGHT"
                timeout={25000}
                title="Страница редактирования колоды"
                text="В <b>верхней части экрана</b> находятся карточки кораблей, которые доступны для составления колоды выбранной нации
                <br>В <b>нижней части экрана</b> находятся карточки кораблей, из которых состоит выбранная колода
                <br><b>Чтобы сохранить</b> колоду необходимо <b>ввести имя колоды</b> из неменее чем 5 символов и выбрать такое количество карточке,
                 чтобы их совокупная <b>стоимость составляла от 20 до 25 очков</b>
                 <br><b>Стоимость корабля</b обозначается цифрой окруженной лавровой ветвью
                 <br><b>Прочность кораля</b> обозначается цифрой под иконкой корабля
                <br>При клике на кнопку <b>ВЫХОД</b> вы перейдете на страницу управления колодами
                 <br>При клике на кнопку <b>СОХРАНИТЬ</b> ваша колода будет сохранена и после сохранения вы перейдете на страницу управления колодами"
            />
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Slider
                    className="create_pack__all_cards"
                    stateName="change_pack"
                    collectionName="reserve"
                    droppableId="reserve"
                    showBorder={allCardsBorderVisible}/>
                <Slider
                    className="create_pack__my_cards"
                    stateName="change_pack"
                    collectionName="main"
                    droppableId="main"
                    showBorder={myCardsBorderVisible}/>

                <div className="create_pack__footer">
                    <PackNameInput/>

                    <CostIndicator
                        max_cost={max_cost}
                        className={"create_pack__footer__counter"}
                    />

                    <ChangePackExitButton
                        className="create_pack__footer__button"
                    />
                </div>
            </DragDropContext>
        </Background>
    )
}

export default withRouter(connect(
    null,
    changePack
)(CreatePack));