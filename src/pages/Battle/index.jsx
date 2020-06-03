import React, { useState, useEffect, useRef } from "react";
import {Background, GameStatusPanel, DropList, ActionList, Slider, NotDraggableCard, Info} from "components";
import {DragDropContext} from "react-beautiful-dnd";
import { connect } from "react-redux";
import "./Battle.scss"
import {battleActions} from "redux/actions";
import {imageApi} from "utils/api";
import io from "socket.io-client"
import Promise from "bluebird"
import {store} from "redux/store";
import randomColor from "randomcolor"
import {openNotification} from "../../utils/helpers";
import {withRouter} from "react-router-dom";

const isMyShips = (draggableId) => {
    return draggableId === "row_1" || draggableId === "row_2" || draggableId === "row_3";
}

const isEnemyShips = (draggableId) => {
    return draggableId === "enemy_row_1" || draggableId === "enemy_row_2" || draggableId === "enemy_row_3";
}


const Battle = (props) => {
    const {
        idUser,
        idBattle,
        firstRowShowBorder,
        secondRowShowBorder,
        thirdRowShowBorder,
        firstEnemyRowShowBorder,
        secondEnemyRowShowBorder,
        thirdEnemyRowShowBorder,
        setFloatingCard,
        setPlacingShips,
        floatingCard,
        setShipsOneRow,
        setShipsTwoRow,
        setShipsThreeRow,
        setHandsActions,
        setActionsRow,
        setEnemyPlacingShips,
        setEnemyShipsOneRow,
        setEnemyShipsTwoRow,
        setEnemyShipsThreeRow,
        setEnemyHandsActions,
        setEnemyActionsRow,
        setTime,
        battleStarted,
        setBattleStarted,
        clearState,
        onBeforeDragFromPlacingShipsRow,
        onBeforeDragFromFirstRow,
        onBeforeDragFromSecondRow,
        onBeforeDragFromThirdRow,
        handleShipCardMove,
        onBeforeDragFromHandsActions,
        onAfterDragFromHandsActions,
        handleActionCardMove,
        setElementsColors,
        setMyTurn,
        myTurn,
        setDamage,
        setEnemyPoints,
        setUserPoints,
        history,
        setEndTurnButtonVisible
    } = props

    const [clientSocket, setSocket] = useState(null)
    const [showSupportInfo, setShowSupportInfo] = useState(false)
    const supportInfoRef = useRef(null)

    const setters = {
        "placing_ships_row": setPlacingShips,
            "row_1": setShipsOneRow,
            "row_2": setShipsTwoRow,
            "row_3": setShipsThreeRow,
            "hands_actions": setHandsActions,
            "actions_row": setActionsRow,
            "enemy_placing_ships_row": setEnemyPlacingShips,
            "enemy_row_1": setEnemyShipsOneRow,
            "enemy_row_2": setEnemyShipsTwoRow,
            "enemy_row_3": setEnemyShipsThreeRow,
            "enemy_hands_actions": setEnemyHandsActions,
            "enemy_actions_row": setEnemyActionsRow,
            "enemy_points": setEnemyPoints,
            "user_points": setUserPoints,
    }

    useEffect(() => {
        const socket = io.connect("/battle/" + idBattle)
        socket.emitAsync = Promise.promisify(socket.emit)

        socket.on('connect', () => {
            socket.emit('LOAD_BATTLE', {
                userId: idUser,
                battleId: idBattle
            })
        })

        socket.on('GAME_SNAPSHOT', snapshot => {
            for(let row_name in snapshot) {
                if(snapshot.hasOwnProperty(row_name) && row_name in setters) {
                    setters[row_name](snapshot[row_name])
                }
            }
        })

        socket.on('ALLOW_MOVE_SHIP_CARD', ({from, to}) => {
            setters[from.name](from.state)
            setters[to.name](to.state)
        })

        socket.on('TIME', time => {
            setTimeout(() => {
                setTime(time)
            }, 0)
        })

        socket.on('PLACING_START', () => {
            runSupportInfo("ПОДГОТОВКА К СРАЖЕНИЮ",1500,
                () => { runSupportInfo("РАСПОЛОЖИТЕ КАРТЫ КОРАБЛЕЙ НА ИГРОВОМ ПОЛЕ",2500) }
                )
        })

        socket.on('START_BATTLE', () => {
            setBattleStarted(true)
            setEndTurnButtonVisible(true)
            runSupportInfo("СРАЖЕНИЕ НАЧАЛОСЬ",1500)
        })

        socket.on('YOUR_TURN', () => {
            setShowSupportInfo(false)
            setMyTurn(true)

            const battleState = store.getState().battle
            const colors = Object.assign({}, battleState.elements_colors)
            for(let ship of battleState["row_1"]) {
                if(ship.hash in colors) {
                    delete colors[ship.hash]
                }
            }

            for(let ship of battleState["row_2"]) {
                if(ship.hash in colors) {
                    delete colors[ship.hash]
                }
            }

            for(let ship of battleState["row_3"]) {
                if(ship.hash in colors) {
                    delete colors[ship.hash]
                }
            }

            for(let ship of battleState["row_3"]) {
                if(ship.hash in colors) {
                    delete colors[ship.hash]
                }
            }

            setElementsColors(colors)

            runSupportInfo( "ВАШ ХОД",1500)
        })

        socket.on('ENEMY_TURN', () => {
            setShowSupportInfo(false)
            setMyTurn(false)

            const battleState = store.getState().battle
            const colors = Object.assign({}, battleState.elements_colors)
            for(let ship of battleState["enemy_row_1"]) {
                if(ship.hash in colors) {
                    delete colors[ship.hash]
                }
            }

            for(let ship of battleState["enemy_row_2"]) {
                if(ship.hash in colors) {
                    delete colors[ship.hash]
                }
            }

            for(let ship of battleState["enemy_row_3"]) {
                if(ship.hash in colors) {
                    delete colors[ship.hash]
                }}


            setElementsColors(colors)
            runSupportInfo( "ХОД ПРОТИВНИКА", 1500)
        })

        socket.on('ALLOW_DEFENCE_CARD', (data) => {
            const {from, to} = data
            console.log(data)

            const colors = Object.assign({}, store.getState().battle.elements_colors)
            setters[from.name](from.state)
            setters[to.name](to.state)

            if(data.protected) {
                const hash = store.getState().battle[data.protected.name][data.protected.index].hash
                let color = colors[hash]
                if(!color) {
                    color = randomColor()
                }

                colors[to.state[to.index].hash] = color
                colors[hash] = color
                setElementsColors(colors)

            } else {
                delete colors[from.state[from.index].hash]
                delete colors[to.state[to.index].hash]
                setElementsColors(colors)
            }
        })

        socket.on('ALLOW_ATTACK', (data) => {
            const {action, from, to, enemy_points, user_points, enemy_actions_row, actions_row} = data
            console.log(data)
            if(action) {
                setFloatingCard(action)
                setDamage(action.damage, to, setters)
                setTimeout(() => {
                    setters[from.name](from.state)
                    setters[to.name](to.state)
                    setFloatingCard(undefined)
                }, 1000)

            } else {
                setters[from.name](from.state)
                setters[to.name](to.state)
            }

            if(enemy_points) {
                setEnemyPoints(enemy_points)
            }

            if(user_points) {
                setUserPoints(user_points)
            }

            if(enemy_actions_row) {
                setEnemyActionsRow(enemy_actions_row)
            }

            if(actions_row) {
                setActionsRow(actions_row)
            }

        })

        socket.on('YOU_WIN', () => {
            socket.close()
            openNotification({
                title: 'Победа',
                text: 'Флот противника потоплен',
                type: 'success',
            });
            history.replace('/select_pack')
        })

        socket.on('YOU_LOSE', () => {
            socket.close()
            openNotification({
                title: 'Поражение',
                text: 'Вам не удалось потопить флот противника',
                type: 'error',
            });
            history.replace('/select_pack')
        })

        setSocket(socket)

        return () => {
            socket.removeListener('ALLOW_MOVE_SHIP_CARD', () => {console.log("unsubscribe from ALLOW_MOVE_CARD")});
            socket.removeListener('PLACING_SHIPS', () => {console.log("unsubscribe from PLACING_SHIPS")});
            socket.removeListener('TIME', () => {console.log("unsubscribe from TIME")})
            clearState()
        };

    }, [])

    const deleteColorsByDeletedActions = (actions_row, colors) => {
        const battleState = store.getState().battle
        if(!colors) {
            colors = Object.assign({}, battleState.elements_colors)
        }
        console.log(colors)
        const hash_actions = actions_row.map(action => action.hash)
        for(let hash in colors) {
            if(!(hash in hash_actions)) {
                delete colors[hash]
            }
        }

        return colors
    }

    const onChangeTurn = () => {
        clientSocket.emit('END_TURN', {userId: idUser})
    }

    const runSupportInfo = (message, timeout, timeoutFunc) => {
        supportInfoRef.current.innerHTML = message
        setShowSupportInfo(true)
        setTimeout(() => {
            setShowSupportInfo(false)
            if(supportInfoRef.current !== undefined) {
                supportInfoRef.current.innerHTML = ''
            }
            if(timeoutFunc) {
                timeoutFunc()
            }
        }, timeout)
    }

    const onDragStart = (result) => {
        const {
            draggableId,
            source
        } = result

        if(!myTurn && battleStarted) {
            return
        }

        if(source.droppableId === "hands_actions") {
            let elem = document.getElementById(draggableId);
            elem && elem.classList.add("action_dragging");
            onBeforeDragFromHandsActions(source)
        } else if(source.droppableId === "placing_ships_row") {
            onBeforeDragFromPlacingShipsRow(result)
        } else if(source.droppableId === "row_1") {
            onBeforeDragFromFirstRow()
        } else if(source.droppableId === "row_2") {
            onBeforeDragFromSecondRow()
        } else if(source.droppableId === "row_3") {
            onBeforeDragFromThirdRow()
        }
    }

    const onDragEnd = (result) => {
        const {
            draggableId,
            destination,
            source
        } = result

        if(!myTurn && battleStarted) {
            return
        }

        if(["row_1", "row_2",  "row_3", "placing_ships_row"].includes(source.droppableId)) {
            handleShipCardMove(result, clientSocket, setters)

        } else if(source.droppableId === "hands_actions") {
            let elem = document.getElementById(draggableId);
            elem && elem.classList.remove("action_dragging");

            handleActionCardMove(result, clientSocket, setters)
        }
    }

    return (
        <Background
            className="battle"
            image={imageApi.getImage("table_background.jpg")}
        >
            <Info
                className="battle__info"
                timeout={50000}
                title="Игровое поле"
                text="<b>В левой части игрового поля</b> находятся ваши корабли и корабли противника расположенные в 3 линии
                <br><b>В правой части игрового поля</b> находятся действия защиты активные в данный момент.
                Также справа находится <b>панель состояния игры с счетчиками заработанных очков</b> для вас и противника и таймером, показывающим время до окончания хода
                <br><b>На 1 линии</b> располагаются корабли ведущие огонь из орудий малого калибра
                <br><b>На 2 линии</b> располагаются корабли ведущие огонь из орудий среднего и крупного калибра
                <br><b>На 3 линии за пределами досягаемости артиллерийского огня</b> распологаются авианосцы, которые атакуют
                корабли противника с воздуха
                <br><b>Перед началом боя необходимо расположить карточки кораблей</b> на 3 линиях. Если игрок за указанное время не расположит все свои карточки
                на игровом поле, то они будут размещены на игровом поле в случайном порядке
                <br><b>Карточки действий бывают 2 типов</b> - <b>для ататки</b> и <b>для защиты</b>
                <br><b>Атакующие действия</b> применяются применяются <b>на кораблях противника</b> и используются сразу же после перетаскивания на карточку корабля
                <br><b>Действия защиты</b> применются <b>на кораблях игрока</b> и остаются ативными до начала следующего хода игрока.
                После использования, окантовки карточки защиты и карточки корабля, на которой была применена эта карточка защиты, окрашиваются в одинаковый цвет.
                <br><b>Цель игры</b> - быстрее противника уничножить корабли на общую стоимость 20 и более очков"

            />
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div className="battle__game_field">
                        <div className="battle__game_field__border">
                            <div className="battle__game_field__border__line">
                                ''
                            </div>
                            <div
                                className="battle__game_field__border__support_info"
                                style={{opacity: runSupportInfo ? 1 : 0 }}
                                ref={supportInfoRef}
                            />
                            {
                                floatingCard ? (
                                    <NotDraggableCard
                                        card={floatingCard}
                                        className="battle__game_field__border__floating_card"
                                    />) : ('')
                            }

                        </div>
                        <ActionList
                            className="battle__game_field__enemy_hands_actions"
                            droppableId="enemy_hands_actions"
                            stateName="battle"
                            collectionName="enemy_hands_actions"
                            cardClassName="drop_card"
                        />
                        <div className="battle__game_field__ships_enemy battle__game_field__ships">
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="enemy_row_3"
                                showBorder={thirdEnemyRowShowBorder}
                                stateName="battle"
                                collectionName="enemy_row_3"
                                cardClassName="ships_card"
                                showPlaceholder={true}
                            />
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="enemy_row_2"
                                showBorder={secondEnemyRowShowBorder}
                                stateName="battle"
                                collectionName="enemy_row_2"
                                cardClassName="ships_card"
                                showPlaceholder={true}
                            />
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="enemy_row_1"
                                showBorder={firstEnemyRowShowBorder}
                                stateName="battle"
                                collectionName="enemy_row_1"
                                cardClassName="ships_card"
                                showPlaceholder={true}
                            />
                        </div>
                        <div className="battle__game_field__ships_my battle__game_field__ships">
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="row_1"
                                showBorder={firstRowShowBorder}
                                stateName="battle"
                                collectionName="row_1"
                                cardClassName="ships_card"
                            />
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="row_2"
                                showBorder={secondRowShowBorder}
                                stateName="battle"
                                collectionName="row_2"
                                cardClassName="ships_card"
                            />
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="row_3"
                                showBorder={thirdRowShowBorder}
                                stateName="battle"
                                collectionName="row_3"
                                cardClassName="ships_card"
                            />
                        </div>
                        <DropList
                            className="battle__game_field__actions_enemy"
                            droppableId="enemy_actions_row"
                            stateName="battle"
                            collectionName="enemy_actions_row"
                            cardClassName="actions_card"
                        />

                        <DropList
                            className="battle__game_field__actions_my"
                            droppableId="actions_row"
                            stateName="battle"
                            collectionName="actions_row"
                            cardClassName="actions_card"
                        />

                        {!battleStarted ? (
                            <Slider
                                className="battle__game_field__placing_ships"
                                stateName="battle"
                                collectionName="placing_ships_row"
                                droppableId="placing_ships_row"
                                showBorder={false}
                                cardClassName="ships_card"
                            />
                        ) : (
                            <ActionList
                                className="battle__game_field__hands_actions"
                                droppableId="hands_actions"
                                stateName="battle"
                                collectionName="hands_actions"
                                cardClassName="drop_card"
                            />
                        )}
                </div>
            </DragDropContext>
            <div className="battle__sub_field">
                <GameStatusPanel
                    onChangeTurn={onChangeTurn}
                />
            </div>
        </Background>
    );
}
export default withRouter(connect(
    ({battle, user}) => ({
        idBattle: battle.id,
        idUser: user.data._id,
        firstRowShowBorder: battle.firstRowShowBorder,
        secondRowShowBorder: battle.secondRowShowBorder,
        thirdRowShowBorder: battle.thirdRowShowBorder,
        firstEnemyRowShowBorder: battle.firstEnemyRowShowBorder,
        secondEnemyRowShowBorder: battle.secondEnemyRowShowBorder,
        thirdEnemyRowShowBorder: battle.thirdEnemyRowShowBorder,
        battleStarted: battle.battleStarted,
        floatingCard: battle.floatingCard,
        myTurn: battle.myTurn,
        arrows: battle.arrows
    }),
    battleActions
)(Battle))