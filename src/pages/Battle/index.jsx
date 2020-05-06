import React, { useState, useEffect } from "react";
import {Background, GameStatusPanel, DropList, ActionList} from "components";
import background from "assets/img/table_background.jpg";
import {DragDropContext} from "react-beautiful-dnd";
import "./Battle.scss"


import Xarrow from "react-xarrows";

const enemy_hands_actions = [
    {
        _id: "1",
        image: "action_empty.png",
    },
    {
        _id: "2",
        image: "action_empty.png",
    },
    {
        _id: "3",
        image: "action_empty.png",
    },
    {
        _id: "4",
        image: "action_empty.png",
    },
    {
        _id: "5",
        image: "action_empty.png",
    },
]
const hands_actions = [
    {
        _id: "6",
        image: "action1.png",
    },
    {
        _id: "7",
        image: "action2.png",
    },
    {
        _id: "8",
        image: "action3.png",
    },
    {
        _id: "9",
        image: "action1.png",
    },
    {
        _id: "10",
        image: "action2.png",
    },
]
const actions = [
    {
        _id: "11",
        image: "action1.png",
        targetId: "23"
    },
    {
        _id: "12",
        image: "action2.png",
    },
    {
        _id: "13",
        image: "action3.png",
        targetId: "21"
    }
]
const row_1 = [
    {
        _id: "14",
        image: "Aoba.png",
    },
    {
        _id: "15",
        image: "Hiryu.png",
    },
    {
        _id: "16",
        image: "Kagero.png",
    }
]
const row_2 = [
    {
        _id: "17",
        image: "Aoba.png",
    },
    {
        _id: "18",
        image: "Hiryu.png",
    }
]
const row_3 = [
    {
        _id: "19",
        image: "Kagero.png",
    },
    {
        _id: "20",
        image: "Aoba.png",
    }
]
const enemy_row_1 = [
    {
        _id: "21",
        image: "Hiryu.png",
    },
    {
        _id: "22",
        image: "Kagero.png",
    },
    {
        _id: "23",
        image: "Aoba.png",
    }
]
const enemy_row_2 = [
    {
        _id: "24",
        image: "Hiryu.png",
    },
    {
        _id: "25",
        image: "Kagero.png",
    }
]
const enemy_row_3 = [
    {
        _id: "26",
        image: "Aoba.png",
    },
    {
        _id: "27",
        image: "Hiryu.png",
    }
]
const enemy_actions = [
    {
        _id: "28",
        image: "action1.png",
    },
    {
        _id: "29",
        image: "action2.png",
    },
    {
        _id: "30",
        image: "action3.png",
    }
]
// const arrow_massiv = [
//     {
//         start: "11",
//         end: "22"
//     },
//     {
//         start: "12",
//         end: "21"
//     }
// ]

const move = (source, destination, droppableSource, droppableDestination, refsOnCards) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const isMyShips = (draggableId) => {
    return draggableId === "row_1" || draggableId === "row_2" || draggableId === "row_3";
}

const isEnemyShips = (draggableId) => {
    return draggableId === "enemy_row_1" || draggableId === "enemy_row_2" || draggableId === "enemy_row_3";
}

const XarrowContainer = ({arrows}) => {
    return arrows ? arrows.map((arrow, index) => (
        <Xarrow
            start={arrow.start}
            end={arrow.end}
            key={"arrow" + Math.random()}
        />
    )) : '';
}

const Battle = () => {
    const [handsActions, setHandsActions] = useState(hands_actions);
    const [enemyOneRowShips, setEnemyOneRowShips] = useState(enemy_row_1);
    const [myActionsRow, setMyActionsRow] = useState(actions);
    const [arrow, setArrow] = useState([]);
    const [refsOnCards, setRefsOnCards] = useState({})

    useEffect(() => {
        arrow.push({
            start: refsOnCards["actions_row"][0],
            end: refsOnCards["enemy_row_1"][1]
        });
        setArrow(arrow)
    }, [arrow])

    const onBeforeDragStart = (result) => {
        const {
            draggableId,
            destination,
            source
        } = result

        if(source.droppableId === "hands_actions") {
            let elem = document.getElementById(draggableId);
            elem && elem.classList.add("action_dragging");
        }
    }

    const onDragFromHandsActions = ({draggableId, destination, source}) => {
        if(isEnemyShips(destination.droppableId)) {
            if(destination.droppableId === "enemy_row_1") {
                //change target drop list
                destination.droppableId = "actions_row"
                destination.index = myActionsRow.length + 1;

                const result = move(
                    handsActions,
                    myActionsRow,
                    source,
                    destination
                );

                console.log(refsOnCards[source.droppableId])
                const [removed] = refsOnCards[source.droppableId].splice(source.index, 1);
                console.log(refsOnCards[source.droppableId])
                console.log(refsOnCards[destination.droppableId])
                refsOnCards[destination.droppableId].splice(destination.index, 0, removed);
                console.log(refsOnCards[destination.droppableId])
                console.log(refsOnCards)

                setRefsOnCards(refsOnCards)
                setMyActionsRow(result.actions_row);
                setHandsActions(result.hands_actions);

                console.log(refsOnCards)
                console.log(source.index)
                console.log(destination.index)
                console.log(refsOnCards[source.droppableId][source.index])
                console.log(refsOnCards[destination.droppableId][destination.index - 1])
                arrow.push({
                    start: refsOnCards[source.droppableId][source.index],
                    end: refsOnCards[destination.droppableId][destination.index - 1]
                });
                setArrow(arrow);
               return;
            }
        }

        let elem = document.getElementById(draggableId);
        elem && elem.classList.remove("action_dragging");
    }


    const onDragEnd = (result) => {
        const {
            destination,
            source
        } = result

        if (!destination) {
            return;
        }

        if(source.droppableId === "hands_actions") {
            onDragFromHandsActions(result);
        }
    }
    console.log(refsOnCards);
    console.log(arrow)

    return (
        <Background
            className="battle"
            image={background}
        >
            <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd}>
                <div className="battle__game_field">
                        <div className="battle__game_field__border">
                            <div className="battle__game_field__border__line">''</div>
                        </div>
                        <ActionList
                            className="battle__game_field__enemy_hands_actions"
                            droppableId={"enemy_hands_actions"}
                            showBorder={true}
                            cards={enemy_hands_actions}
                            refsOnCards={refsOnCards}
                            // cardClassName="drop_card"
                        />
                        <div className="battle__game_field__ships_enemy battle__game_field__ships">
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="enemy_row_3"
                                // showBorder={true}
                                cards={enemy_row_3}
                                cardClassName="ships_card"
                                refsOnCards={refsOnCards}
                            />
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="enemy_row_2"
                                // showBorder={true}
                                cards={enemy_row_2}
                                cardClassName="ships_card"
                                refsOnCards={refsOnCards}
                            />
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="enemy_row_1"
                                // showBorder={true}
                                cards={enemyOneRowShips}
                                cardClassName="ships_card"
                                refsOnCards={refsOnCards}
                            />
                        </div>
                        <div className="battle__game_field__ships_my battle__game_field__ships">
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="row_1"
                                // showBorder={true}
                                cards={row_1}
                                cardClassName="ships_card"
                                refsOnCards={refsOnCards}
                            />
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="row_2"
                                // showBorder={true}
                                cards={row_2}
                                cardClassName="ships_card"
                                refsOnCards={refsOnCards}
                            />
                            <DropList
                                className="battle__game_field__ships__row"
                                droppableId="row_3"
                                // showBorder={true}
                                cards={row_3}
                                cardClassName="ships_card"
                                refsOnCards={refsOnCards}
                            />
                        </div>
                        <DropList
                            className="battle__game_field__actions_enemy"
                            droppableId="enemy_actions_row"
                            // showBorder={true}
                            cards={enemy_actions}
                            cardClassName="actions_card"
                            refsOnCards={refsOnCards}
                        />

                        <DropList
                            className="battle__game_field__actions_my"
                            droppableId="actions_row"
                            // showBorder={true}
                            cards={myActionsRow}
                            cardClassName="actions_card"
                            refsOnCards={refsOnCards}
                        />

                        <ActionList
                            className="battle__game_field__hands_actions"
                            droppableId={"hands_actions"}
                            // showBorder={true}
                            cards={handsActions}
                            refsOnCards={refsOnCards}
                            // cards={all_cards}
                            // cardClassName="drop_card"
                        />
                </div>
                <XarrowContainer arrows={arrow}/>
            </DragDropContext>
            <div className="battle__sub_field">
                <GameStatusPanel
                    gamer={"ilyaBurov"}
                    phase={2}
                    className="panel"
                />
            </div>
        </Background>
    );
}

export default Battle;