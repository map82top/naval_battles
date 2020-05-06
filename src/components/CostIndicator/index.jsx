import React from "react";
import ThunderboltOutlined from "@ant-design/icons/lib/icons/ThunderboltOutlined";
import cn from "classnames";
import "./CostIndicator.scss";

const CostIndicator = ({max_cost, cost, isValid, className}) => {
    return (
      <div id="cost" className={cn("cost_indicator", {"cost_indicator--not_valid": !isValid}, className)}

      >
          <ThunderboltOutlined className="cost_indicator__icon"/>
          <span  className="cost_indicator__text">{cost} / {max_cost}</span>
      </div>
    );
}

export default CostIndicator;