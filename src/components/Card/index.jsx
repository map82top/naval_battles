import React, { useState} from "react";
import "./Card.scss";
import cn from "classnames";
import { Modal } from "antd";
import {Draggable} from "react-beautiful-dnd";
import { imageApi} from "utils/api";
import {Damage} from "../index";

const Card = ({ className, card, index, onWheel, style, id, color}) => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
       setVisible(true);
    };

    const handleCancel = e => {
        setVisible(false);
    };

    const getStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.001s`,
        };
    }

    return (
        <div
            className="card_wrapper"
            id={id}
            style={{ ...style, border: color + " 0.25vh solid" }}
        >
                <Draggable draggableId={card.hash ? card.hash : card._id} index={index}>
                    { (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className={ cn("card", className, {"card--blocked": card.blocked}) }
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{...getStyle(provided.draggableProps.style, snapshot) }}
                            onWheel={onWheel}
                            onClick={showModal}
                            // onMouseOver={onMouseOver}
                            // onMouseOut={onMouseOut}
                        >
                            <span className={"card__hp"}>{card.hp}</span>
                            <img src={ imageApi.getImage(card.image) } alt={"image" + Math.random()} className="card__image"/>
                            <Damage
                                damage={card.damage}
                                className="card__damage"
                                style={{opacity: card.damage ? 1 : 0 }}
                            />
                        </div>
                    )}
                </Draggable>
            <Modal
                className="card__modal"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                keyboard
                centered
            >
                <div onClick={handleCancel} className={"card__modal__content"}>
                    <span className={"card__modal__content__hp"}>{card.hp}</span>
                    <img src={ imageApi.getImage(card.image) } alt={"image" + Math.random()} className="card__modal__content__image"/>
                </div>
            </Modal>
        </div>
    );
}

export default Card;