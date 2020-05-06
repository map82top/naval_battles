import Xarrow from "react-xarrows";
import React from "react";

const XarrowContainer = ({arrows}) => {
    return arrows ? arrows.map((arrow, index) => {
        console.log("arrow created");
        return (
        <Xarrow
            start={arrow.start}
            end={arrow.end}
            key={"arrow" + Math.random()}
        />
    )}) : '';
}
export default XarrowContainer;