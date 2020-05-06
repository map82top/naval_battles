import React from "react";
import "./IconButton.scss";
import { Link } from "react-router-dom";
import cn from "classnames";

const IconButton = ({ onClick, icon, className, href }) => {
   return (
       <button onClick={onClick} className={cn("iconbutton", className)}>{icon}</button>
   )
};

export default IconButton;