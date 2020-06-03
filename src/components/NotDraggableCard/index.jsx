import React from "react";
import "./NotDraggableCard.scss";
import cn from "classnames";
import { imageApi} from "utils/api";

const NotDraggableCard = ({ className, card}) => {
    return (
        <div
            className={ cn("not_draggable_card", className) }
        >
            <img src={ imageApi.getImage(card.image) } alt={"image" + Math.random()} className="not_draggable_card__image"/>
        </div>
    );
}

export default NotDraggableCard;