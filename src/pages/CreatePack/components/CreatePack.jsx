import React, { useState } from "react";
import {Background, CostIndicator, Button , Slider} from "components";
import { withRouter } from 'react-router-dom'
import {Form, Input} from "antd"
import "./CreatePack.scss";
import { DragDropContext } from "react-beautiful-dnd";
import cn from "classnames";
import { imageApi } from "utils/api";
import { changePack } from "redux/actions";
import { connect } from "react-redux";
import { openNotification } from "utils/helpers";


const useConstructor = (callBack) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list ? list : []);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source ? source : []);
    const destClone = Array.from(destination ? destination : []);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    result.droped = removed;

    return result;
};

const CreatePack = (props) => {
    const {
        location,
        main_pack,
        reserve_pack,
        fetchChangePack,
        setMain,
        setReserve,
        saveChangedPack,
        setCost,
        setName,
        cost,
        name,
        resetState,
    } = props

    const [allCardsBorderVisible,  setAllCardsBorderVisible] = useState(false);
    const [myCardsBorderVisible,  setMyCardsBorderVisible] = useState(false);
    const max_cost = 25;

    useConstructor(() => {
        fetchChangePack(location.state)
    });

    const validCostIndicator = () => {
        return cost <= 25 && cost > 20
    }

    const validName = () => {
        return name.length >= 5
    }

    const onChangeName = e => {
        setName(e.target.value)
    }

    const onDragStart = ({draggableId, source}) => {
        if (source.droppableId === "all_cards") {
           setMyCardsBorderVisible(true);

        } else if (source.droppableId === "my_cards"){
            setAllCardsBorderVisible(true);
        }
    }

    const mapDroppableId = {
        all_cards: reserve_pack,
        my_cards: main_pack
    }

    const onDragEnd = result => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            const items = reorder (
                mapDroppableId[source.droppableId],
                source.index,
                destination.index
            );
            source.droppableId === 'my_cards' ? setMain(items) : setReserve(items);

        } else {
            const drop_items = move (
                mapDroppableId[source.droppableId],
                mapDroppableId[destination.droppableId],
                source,
                destination
            );

            let new_cost =  cost + (destination.droppableId === 'my_cards' ?  drop_items.droped.cost : -drop_items.droped.cost);

            setCost(new_cost)
            setMain(drop_items.my_cards)
            setReserve(drop_items.all_cards)
        }

        source.droppableId === "all_cards" ?  setMyCardsBorderVisible(false) : setAllCardsBorderVisible(false)
    }

    const onSaveButton = e =>{
        const postData = {
            main: main_pack,
            reserve: reserve_pack,
            cost: cost,
            name: name,
            _id: props._id,
            country: props.country,
        }

        saveChangedPack(postData)
            .then((response) => {
                openNotification({
                    title: 'Отлично!',
                    text: response.data.description ? response.data.description : 'Колода сохранена!',
                    type: 'success',
                });
            })
            .catch((error) => {
                openNotification({
                    title: 'Ошибка!',
                    text: 'Не удалось сохранить колоду',
                    type: 'error',
                });
            })

        resetState()
        props.history.push('/packs');
    }

    return (
        <Background
            className="create_pack"
            image={imageApi.getImage("table_background.jpg")}
        >
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <div className={cn("create_pack__all_cards")}>
                    <Slider cards={ reserve_pack } droppableId="all_cards" showBorder={allCardsBorderVisible}/>
                </div>
                <div className={cn("create_pack__my_cards")}>
                    <Slider cards={ main_pack } droppableId="my_cards" showBorder={myCardsBorderVisible}/>
                </div>
                <div className="create_pack__footer">
                    <Form.Item
                        className="create_pack__footer__input"
                        validateStatus={validName() ? "success" : "error"}
                        help={"Поле обязательно для заполнения"}
                        hasFeedback
                    >
                        <Input
                            id="name"
                            name="name"
                            placeholder="Название колоды"
                            value={name}
                            onChange={onChangeName}
                        />
                    </Form.Item>

                    <CostIndicator
                        max_cost={max_cost}
                        cost={ cost }
                        isValid={ validCostIndicator() }
                        className={"create_pack__footer__counter"}
                    />

                    <Button
                        className="create_pack__footer__button"
                        title="Готово"
                        disabled={!validName() || !validCostIndicator()}
                        onClick={onSaveButton}
                    />
                </div>
            </DragDropContext>
        </Background>
    )
}

export default withRouter(connect(
    ({change_pack}) => ({
        main_pack: change_pack.main,
        reserve_pack: change_pack.reserve,
        cost: change_pack.cost,
        name: change_pack.name,
        country: change_pack.country,
        _id: change_pack._id
    }),
    changePack
)(CreatePack));