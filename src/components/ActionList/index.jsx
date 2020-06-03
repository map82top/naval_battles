import React from "react";
import {Droppable} from "react-beautiful-dnd";
import { Card } from "components";
import cn from "classnames";
import composeRefs from "@seznam/compose-react-refs";
import "./ActionList.scss";
import {connect} from "react-redux";

const ActionList = ({className, droppableId, handlerScroll, wheelElement, cardClassName, cards, colors}) => {
    const CardsList = React.memo(({ cards }) => {
        return cards ? cards.map((card, index) => (
                card ? (
                    <Card
                        id={card.hash}
                        card={card}
                        index={index}
                        key={card.hash}
                        className={cardClassName}
                        color={colors && colors[card.hash]}
                        style={{transform: `rotate(${-((17*cards.length)/2)+18*index}deg)`, transformOrigin: `90%`}}
                    />
                ) : '' ))
            : '';
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

export default connect((state, ownProps) => {
    const {stateName, collectionName} = ownProps
    const battle = state[stateName]
    return ({
        cards: battle[collectionName],
        colors: battle.elements_colors
    })
})(ActionList);