import React from "react";
import "./IconButton.scss";
import cn from "classnames";

const IconButton = ({ onClick, icon, className }) => {
   return (
       <button onClick={onClick} className={cn("iconbutton", className)}>{icon}</button>
   )
};

export default IconButton;