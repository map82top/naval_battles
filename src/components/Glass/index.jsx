import React from "react";
import "./Glass.scss";
import cn from "classnames";

const Glass = ({className, children, backgroundImage}) =>
    <div
        className={cn("glass", className)}
        style={backgroundImage && {backgroundImage: `url(${backgroundImage}`}}
    >
        {children}
    </div>

export default Glass;