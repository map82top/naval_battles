import React, {useState, useRef, useEffect} from "react"
import "./Info.scss"
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import cn from "classnames"

const Info = ({title, className, text, direction, timeout}) => {
    const [visible, setVisible] = useState(false);
    const text_ref = useRef(null)
    const title_ref = useRef(null)

    const onInfoClick = () => {
        setVisible(!visible)
        if(!visible) {
            setTimeout(() => {
                setVisible(false)
            }, timeout ? timeout : 3000)
        }
    }

    useEffect(() => {
        text_ref.current.innerHTML = text
        title_ref.current.innerHTML = title
    }, [])

    return (
        <div className={cn("info", className, {
            "info--direction-right": direction === "RIGHT",
            "info--direction-left": direction === "LEFT",
        })}>
            <div className={cn("info__description", {"info__description--visible": visible})}>
                <span className="info__description__title" ref={title_ref}></span>
                <p className="info__description__text" ref={text_ref}></p>
            </div>
            <InfoCircleOutlined onClick={onInfoClick} className="info__icon"/>
        </div>
    )
}

export default Info;