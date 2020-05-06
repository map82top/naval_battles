import React from "react";
import cn from "classnames";
import { Radio } from 'antd';
import background from "assets/img/table_background.jpg";
import { Glass, Button } from "components";
import "./GameStatusPanel.scss";
import move from "assets/img/move.png";
import attack from "assets/img/attack.png";
import preparation from "assets/img/prepatation.png";
import defende from "assets/img/defende.png";

const GameStatusPanel = ({className, gamer, phase}) => {
    return (
        <Glass
            className={cn("game_status_panel", className)}
            backgroundImage={background}
        >
            <div className="game_status_panel__title">
                Ход игрока <br/> <span className="game_status_panel__title__name">{gamer}</span>
            </div>
            <div className="game_status_panel__phases">
                <span>Фаза</span>
                <Radio.Group value={phase}>
                    <Radio value={1} className="game_status_panel__phases__item">
                        <img src={move} alt="move"/>
                    </Radio>
                    <Radio value={2} className="game_status_panel__phases__item">
                        <img src={preparation} alt="prepataton"/>
                    </Radio>
                    <Radio value={3} className="game_status_panel__phases__item">
                        <img src={attack} alt="attack"/>
                    </Radio>
                    <Radio value={4} className="game_status_panel__phases__item">
                        <img src={defende} alt="defende"/>
                    </Radio>
                </Radio.Group>
            </div>
            <Button
                className="game_status_panel__button"
                title="Завершить фазу"
            />
        </Glass>
    );
}

export default GameStatusPanel;