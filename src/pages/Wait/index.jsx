import React from "react";
import { Background, Button } from "components";
import background from "assets/img/pack_background.jpg";
import "./Wait.scss";
import { LoadingOutlined } from "@ant-design/icons";
import {useHistory} from "react-router-dom";

const WaitPage = () => {
    const history =  useHistory();
    const onBack = () => {
        history.push("/select_pack");
    }
    return (
        <Background
            image={ background }
            className="wait"
        >
            <LoadingOutlined className="wait__icon"/>
            <div className="wait__text"></div>
            <Button
                className="wait__button"
                title="Выйти"
                href="/home"
                onClick={onBack}
            />
        </Background>
    );
}



export default WaitPage;