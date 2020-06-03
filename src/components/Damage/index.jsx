import React from "react";
import { imageApi } from "utils/api";
import cn from "classnames"
import "./Damage.scss"

const Damage = ({damage, className, style}) => {
    return (
        <div className={className} style={style}>
            <div className={cn("damage", className)}>
                <img
                    src={imageApi.getImage("damage.png") }
                    alt={Math.random()}
                    className="damage__image"
                />
                <span
                    className="damage__value"
                >{damage}</span>
            </div>
        </div>
    )
}

export default Damage
