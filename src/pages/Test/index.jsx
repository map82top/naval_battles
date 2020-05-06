import React from "react";
import {Background} from "components";
import background from "assets/img/table_background.jpg";
import { ActionList } from "components";
import "./Test.scss";

import ship1 from "assets/img/action1.png";
import ship2 from "assets/img/action2.png";
import ship3 from "assets/img/action3.png";
import {DragDropContext} from "react-beautiful-dnd";

const all_cards = [
    {
        id: "1",
        image: ship1,
        cost: 4
    },
    {
        id: "2",
        image: ship2,
        cost: 4
    },
    {
        id: "3",
        image: ship3,
        cost: 4
    },
    // {
    //     id: "4",
    //     image: ship3,
    //     cost: 3
    // },
    // {
    //     id: "5",
    //     image: ship1,
    //     cost: 4
    // },
    // {
    //     id: "6",
    //     image: ship1,
    //     cost: 4
    // },
    // {
    //     id: "7",
    //     image: ship1,
    //     cost: 4
    // }
]

const Test = () => {
    const onDragStart = ({draggableId}) => {
        let elem = document.getElementById(draggableId);
        elem.classList.add("action_dragging");
    }

    const onDragEnd = ({draggableId}) => {
        let elem = document.getElementById(draggableId);
        elem.classList.remove("action_dragging");
    }

    return (
        <Background
            className="test"
            image={background}
        >
            <DragDropContext onBeforeDragStart={onDragStart} onDragEnd={onDragEnd}>

                <ActionList
                    className="drop"
                    droppableId={"dvdfv"}
                    showBorder={false}
                    cards={all_cards}
                    cardClassName="drop_card"
                />

                {/*<GameStatusPanel*/}
                {/*    gamer={"ilyaBurov"}*/}
                {/*    phase={2}*/}
                {/*    className="panel"*/}
                {/*/>*/}
            </DragDropContext>
        </Background>
    );
}

export default Test;