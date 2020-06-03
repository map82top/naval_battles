import React from "react";
import { Button } from "components";
import "./GameStatusPanel.scss";
import {connect} from "react-redux";

const GameStatusPanel = ({time, myTurn, onChangeTurn, enemyPoints, userName, userPoints, buttonVisible}) => {
    console.log(buttonVisible)
    return (
            <div className="game_status_panel">
                <div className="game_status_panel__time">{time}</div>
                <Button
                    className="game_status_panel__button"
                    title="Завершить ход"
                    disabled={!myTurn}
                    visible={buttonVisible}
                    onClick={onChangeTurn}
                />
                <div className="game_status_panel__points">
                    <span className="game_status_panel__points__title">Получено очков</span>
                    <div className="game_status_panel__points__row">
                        <span>Противник</span>
                        <span className="game_status_panel__points__row__value">{enemyPoints}</span>
                    </div>
                    <div className="game_status_panel__points__row">
                        <span>{userName}</span>
                        <span className="game_status_panel__points__row__value">{userPoints}</span>
                    </div>
                </div>
            </div>
    );
}

export default connect(
    ({battle, user}) => ({
        time: battle.time,
        myTurn: battle.myTurn,
        enemyPoints: battle.enemy_points,
        userPoints: battle.user_points,
        userName: user.data.username,
        buttonVisible: battle.end_turn_button_visible
    })
)(GameStatusPanel);