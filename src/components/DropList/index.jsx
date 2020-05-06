import React, { useRef } from "react";
import {Droppable} from "react-beautiful-dnd";
import { Card } from "components";
import cn from "classnames";
import composeRefs from "@seznam/compose-react-refs";
import "./DropList.scss";

const DropList = ({className, droppableId, handlerScroll, wheelElement, showBorder, cards, cardClassName, refsOnCards}) => {
    const listCardsRefs = [];
    refsOnCards[droppableId] = listCardsRefs;

    const CardsList = React.memo(({ cards }) => {
        return cards ? cards.map((card, index) => (
            <Card
                id={card._id}
                card={card}
                index={index}
                key={card._id}
                className={cardClassName}
                refsOnCards={listCardsRefs}
            />
        )) : '';
    });

    return (
            <Droppable
                droppableId={droppableId}
                direction="horizontal"
            >
                {provided => {
                    return (
                        <div
                            className={cn("drop_list", {"drop_list--show_border": showBorder}, className)}
                            onWheel={handlerScroll}
                            ref={composeRefs(provided.innerRef, wheelElement)}
                            {...provided.droppableProps}
                        >
                            <CardsList cards={cards}/>
                            {provided.placeholder}
                        </div>

                    )
                }}
            </Droppable>
    )
}

export default DropList;