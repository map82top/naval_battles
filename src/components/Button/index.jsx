import React from "react";
import "./Button.scss";
import cn from "classnames";

const Button = ({ onClick, title, className, disabled, visible = true }) => {
    return (
        <button
            onClick={onClick}
            className={cn(className, {"button--disabled": disabled, "button": !disabled, "button--hidden": !visible})}
            disabled={disabled}
            type="submit"
        >
            {title}
        </button>
   );
};

export default Button;