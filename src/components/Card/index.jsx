import React, {useRef, useState} from "react";
import "./Card.scss";
import cn from "classnames";
import { Modal } from "antd";
import {Draggable} from "react-beautiful-dnd";
import { imageApi} from "utils/api";
import composeRefs from "@seznam/compose-react-refs/composeRefs";

const Card = ({ className, card, index, onWheel, style, id, refsOnCards}) => {
    const [visible, setVisible] = useState(false);
    const [focusTimeout, setFocusTimeout] = useState(undefined);
    const cardRef =  useRef(null);
    refsOnCards.push(cardRef)

    const showModal = () => {
       setVisible(true);
    };

    const handleCancel = e => {
        setVisible(false);
    };

    const onMouseOver = e => {
        setFocusTimeout(setTimeout(showModal, 1000));
    }

    const onMouseOut = e => {
        if(focusTimeout !== undefined) {
            clearTimeout(focusTimeout);
            setFocusTimeout(undefined);
        }
    }

    return (
        <div className="card_wrapper" style={style} id={id} ref={cardRef}>
                <Draggable draggableId={card._id} index={index}>
                    { (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className={ cn("card", className) }
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onWheel={onWheel}
                            onClick={showModal}
                            // onMouseOver={onMouseOver}
                            // onMouseOut={onMouseOut}
                        >
                                <img src={ imageApi.getImage(card.image) } alt={"image" + Math.random()} className="card__image"/>
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
                <div onClick={handleCancel}>
                    <img src={ imageApi.getImage(card.image) } alt={"image" + Math.random()} className="card__modal__image"/>
                </div>
            </Modal>
        </div>
    );
}

export default Card;