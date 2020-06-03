import React from "react";
import ThunderboltOutlined from "@ant-design/icons/lib/icons/ThunderboltOutlined";
import cn from "classnames";
import "./CostIndicator.scss";
import {connect} from "react-redux";
import {changePack} from "../../redux/actions";
import {withRouter} from "react-router-dom";

const CostIndicator = ({max_cost, cost, className, costIsValid}) => {
    return (
      <div
          id="cost"
           className={cn("cost_indicator", {"cost_indicator--not_valid": !costIsValid}, className)}
      >
          <ThunderboltOutlined className="cost_indicator__icon"/>
          <span className="cost_indicator__text">{cost} / {max_cost}</span>
      </div>
    );
}

export default withRouter(connect(
    ({change_pack}) => ({
        cost: change_pack.cost,
        costIsValid: change_pack.costIsValid
    }), changePack
)(CostIndicator))