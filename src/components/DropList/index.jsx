import React from "react";
import {Droppable} from "react-beautiful-dnd";
import { Card } from "components";
import cn from "classnames";
import composeRefs from "@seznam/compose-react-refs";
import "./DropList.scss";
import {connect} from "react-redux";

const DropList = ({className, droppableId, handlerScroll, wheelElement, showBorder, cardClassName, cards, colors}) => {
    const CardsList = React.memo(({ cards }) => {
        return cards ? cards.map((card, index) => (
             card ? (
                <Card
                    id={card.hash ? card.hash : card._id}
                    card={card}
                    index={index}
                    key={card.hash ? card.hash : card._id}
                    className={cardClassName}
                    color={colors && colors[card.hash]}
                />
                ) : '' ))
            : '';
        }
    );

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
                            { provided.placeholder }
                        </div>
                    )
                }}
            </Droppable>
    )
}

export default connect((state, ownProps) => {
    const {stateName, collectionName} = ownProps
    const change_pack = state[stateName]
    return ({
        cards:   change_pack[collectionName],
        colors:  change_pack.elements_colors
    })
})(DropList)