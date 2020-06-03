import React, {useRef} from "react";
import { Background, Button, Info } from "components";
import "./Wait.scss";
import { LoadingOutlined } from "@ant-design/icons";
import io from "socket.io-client";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { battleActions } from "redux/actions";
import { imageApi } from "utils/api";

const WaitPage = ({ location, history, data,  setId}) => {
    const timeLabel = useRef(null)
    const socket  = io.connect(window.location.origin + "/queue");

    socket.on('connect', () => {
        socket.emit('JOIN', { user: data, pack: location.state })
    })

    socket.on('TIME', time => {
        timeLabel.current.innerHTML = time
    })

    socket.on('ALLOW_EXIT', () => {
        socket.close()
        history.replace("/select_pack")
    })

    socket.on('CREATE_BATTLE', id => {
        socket.close()
        setId(id, data._id)
        history.replace("/battle")
    })

    const onBack = () => {
        socket.emit('EXIT')
    }

    return (
        <Background
            image={ imageApi.getImage("pack_background.jpg") }
            className="wait"
        >
            <Info
                className="wait__info"
                direction="LEFT"
                timeout={10000}
                title="Страница ожидания подбора противника"
                text="Подождите пока противиник с примерно равным вам уровнем мастерства присоединится к битве
                <br>Если вы передумали учавствовать в сражение намите на кнопку <b>ВЫЙТИ</b>"
            />

            <div className="wait__content">
                <LoadingOutlined className="wait__content__icon"/>
                <div ref={timeLabel} className="wait__content__time_label">00:00</div>
                <div className="wait__content__text"></div>
            </div>

            <Button
                className="wait__button"
                title="Выйти"
                href="/home"
                onClick={onBack}
            />
        </Background>
    );
}

export default withRouter(connect(
    ({user}) => ({
        data: user.data
    }),
    battleActions
)(WaitPage));