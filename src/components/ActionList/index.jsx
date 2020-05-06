import React from "react";
import {Droppable} from "react-beautiful-dnd";
import { Card } from "components";
import cn from "classnames";
import composeRefs from "@seznam/compose-react-refs";
import "./ActionList.scss";

const ActionList = ({className, droppableId, handlerScroll, wheelElement, cards, cardClassName, refsOnCards}) => {
    const listCardsRefs = [];
    refsOnCards[droppableId] = listCardsRefs;

    const CardsList = React.memo(function CardsList({ cards }) {
        return cards ? cards.map((card, index) => (
            <Card
                id={card._id}
                card={card}
                index={index}
                key={card._id}
                className={cardClassName}
                style={{transform: `rotate(${-((17*cards.length)/2)+18*index}deg)`, transformOrigin: `90%`}}
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
                            className={cn("action_list", className)}
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

export default ActionList;