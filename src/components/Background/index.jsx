import React from "react";
import "./Background.scss"
import cn from "classnames";

const Background = ({children, image, className}) => {
    return (
      <div
          className={cn("background", className)}
          style={{backgroundImage: `url(${image}`}}
      >
          {children}
      </div>
    );
}
export default Background;