import React, { useRef, useState } from "react";
import "./Slider.scss";
import cn from "classnames";
import CaretLeftOutlined from "@ant-design/icons/lib/icons/CaretLeftOutlined";
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import { DropList } from "components";

const Slider = ({className, droppableId, showBorder, cardClassName, stateName, collectionName}) => {
    const wheelElement = useRef(null);
    const [rightBtnActive, setRightActive] = useState(false);
    const [leftBtnActive, setLeftActive] = useState(false);
    const scrollStep = 800;

    const handlerScroll = e => {
        wheelElement.current && wheelElement.current.scrollBy(e.deltaY , 0);
        let current = wheelElement.current.scrollLeft;
        let max = wheelElement.current.scrollWidth - wheelElement.current.clientWidth;
        current >= max ? setRightActive(false) : setRightActive(true);

        current <= 0 ? setLeftActive(false) : setLeftActive(true);
    }

    const handlerScrollRightButton = () => {
        wheelElement.current && wheelElement.current.scrollBy({
            top: 0,
            left: scrollStep,
            behavior: 'smooth'
        });

        let current = wheelElement.current.scrollLeft;
        let max = wheelElement.current.scrollWidth - wheelElement.current.clientWidth;
        if(current >= max) {
            setRightActive(false);
        } else if(!leftBtnActive) {
            setLeftActive(true);
        }
    }
    const handlerScrollLeftButton = () => {
        wheelElement.current && wheelElement.current.scrollBy({
            top: 0,
            left: -scrollStep,
            behavior: 'smooth'
        });

        let current = wheelElement.current.scrollLeft;
        if(current <= 0) {
            setLeftActive(false);
        } else if(!rightBtnActive) {
            setRightActive(true);
        }
    }

    return (
        <div className={cn("slider", className)} >
            <CaretLeftOutlined
                className={ cn("slider__button", {"slider__button--active": leftBtnActive}) }
                onClick={handlerScrollLeftButton}
            />
            <DropList
                droppableId={droppableId}
                showBorder={showBorder}
                handlerScroll={handlerScroll}
                wheelElement={wheelElement}
                cardClassName={cardClassName}
                stateName={stateName}
                collectionName={collectionName}
            />
            <CaretRightOutlined
                className={ cn("slider__button", {"slider__button--active": rightBtnActive}) }
                onClick={handlerScrollRightButton}
            />
        </div>
    );
}

export default Slider;