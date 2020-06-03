import randomColor from "randomcolor"

const Actions = {
    setId: battleId => ({
            type: "BATTLE:SET_ID",
            payload: battleId,
    }),
    setBattleStarted: value => ({
        type: "BATTLE:SET_BATTLE_STARTED",
        payload: value,
    }),
    setArrows: arrows => ({
        type: "BATTLE:SET_ARROWS",
        payload: arrows,
    }),
    setMyTurn: value => ({
        type: "BATTLE:SET_MY_TURN",
        payload: value,
    }),
    setTime: time => ({
        type: "BATTLE:SET_TIME",
        payload: time,
    }),
    setFloatingCard: card => ({
        type: "BATTLE:SET_FLOATING_CARD",
        payload: card,
    }),
    setIsPlacing: isPlacing => ({
        type: "BATTLE:SET_IS_PLACING",
        payload: isPlacing,
    }),
    setPlacingShips: ships => ({
        type: "BATTLE:SET_PLACING_SHIPS",
        payload: ships,
    }),
    setShipsOneRow: ships => ({
        type: "BATTLE:SET_SHIPS_ONE_ROW",
        payload: ships,
    }),
    setShipsTwoRow: ships => ({
        type: "BATTLE:SET_SHIPS_TWO_ROW",
        payload: ships,
    }),
    setShipsThreeRow: ships => ({
        type: "BATTLE:SET_SHIPS_THREE_ROW",
        payload: ships,
    }),
    setHandsActions: actions => ({
        type: "BATTLE:SET_HANDS_ACTIONS",
        payload: actions,
    }),
    setActionsRow: actions => ({
        type: "BATTLE:SET_ACTIONS_ROW",
        payload: actions,
    }),
    setEnemyPlacingShips: ships => ({
        type: "BATTLE:SET_ENEMY_PLACING_SHIPS",
        payload: ships,
    }),
    setEnemyShipsOneRow: ships => ({
        type: "BATTLE:SET_ENEMY_SHIPS_ONE_ROW",
        payload: ships,
    }),
    setEnemyShipsTwoRow: ships => ({
        type: "BATTLE:SET_ENEMY_SHIPS_TWO_ROW",
        payload: ships,
    }),
    setEnemyShipsThreeRow: ships => ({
        type: "BATTLE:SET_ENEMY_SHIPS_THREE_ROW",
        payload: ships,
    }),
    setEnemyHandsActions: actions => ({
        type: "BATTLE:SET_ENEMY_HANDS_ACTIONS",
        payload: actions,
    }),
    setEnemyActionsRow: actions => ({
        type: "BATTLE:SET_ENEMY_ACTIONS_ROW",
        payload: actions,
    }),
    setFirstRowShowBorder: visible => ({
        type: "BATTLE:SET_FIRST_ROW_SHOW_BORDER",
        payload: visible,
    }),
    setSecondRowShowBorder: visible => ({
        type: "BATTLE:SET_SECOND_ROW_SHOW_BORDER",
        payload: visible,
    }),
    setThirdRowShowBorder: visible => ({
        type: "BATTLE:SET_THIRD_ROW_SHOW_BORDER",
        payload: visible,
    }),
    setFirstEnemyRowShowBorder: visible => ({
        type: "BATTLE:SET_FIRST_ENEMY_ROW_SHOW_BORDER",
        payload: visible,
    }),
    setSecondEnemyRowShowBorder: visible => ({
        type: "BATTLE:SET_SECOND_ENEMY_ROW_SHOW_BORDER",
        payload: visible,
    }),
    setThirdEnemyRowShowBorder: visible => ({
        type: "BATTLE:SET_THIRD_ENEMY_ROW_SHOW_BORDER",
        payload: visible,
    }),
    setElementsColors: colors => ({
        type: "BATTLE:SET_ELEMENTS_COLORS",
        payload: colors
    }),
    setEnemyPoints: count_of_points => ({
        type: "BATTLE:SET_ENEMY_POINTS",
        payload: count_of_points
    }),
    setUserPoints: count_of_points => ({
        type: "BATTLE:SET_USER_POINTS",
        payload: count_of_points
    }),
    clearState: () => ({
        type: "BATTLE:STATE_CLEAR",
        payload: undefined,
    }),
    setEndTurnButtonVisible: is_visible => ({
       type: "BATTLE:SET_END_TURN_BUTTON_VISIBLE",
       payload:  is_visible
    }),
   onBeforeDragFromPlacingShipsRow: () => (dispatch, getState) => {
       const state = getState().battle
       dispatch(Actions.setFirstRowShowBorder(true))
        if(state.row_1 && state.row_1.length > 0) {
            dispatch(Actions.setSecondRowShowBorder(true))
        }

        if(state.row_2 && state.row_2.length > 0) {
            dispatch(Actions.setThirdRowShowBorder(true))
        }
    },
    onAfterDragShipCard: () => dispatch => {
        dispatch(Actions.setFirstRowShowBorder(false))
        dispatch(Actions.setSecondRowShowBorder(false))
        dispatch(Actions.setThirdRowShowBorder(false))
    },
    onBeforeDragFromFirstRow: () => (dispatch, getState) => {
        const state = getState().battle
        if(state.row_1.length > 1) {
            dispatch(Actions.setSecondRowShowBorder(true))
            if(state.row_2.length > 0) {
                dispatch(Actions.setThirdRowShowBorder(true))
            }
        }
    },
    onBeforeDragFromSecondRow: () => (dispatch, getState) => {
        const state = getState().battle
        if(state.row_2.length > 1) {
            dispatch(Actions.setThirdRowShowBorder(true))
            dispatch(Actions.setFirstRowShowBorder(true))
        } else if(state.row_3.length === 0) {
            dispatch(Actions.setFirstRowShowBorder(true))
        }
    },
    onBeforeDragFromThirdRow: () => (dispatch, getState) => {
        dispatch(Actions.setFirstRowShowBorder(true))
        dispatch(Actions.setSecondRowShowBorder(true))
    },
    notValidMoveFromPlacingShipsRow: (destination, state) => {
        let dropId = destination.droppableId

        if(dropId !== "row_1" && dropId !== "row_2" && dropId !== "row_3") {
            return true
        }

        if(dropId === "row_2") {
            if(state.row_1.length === 0) return true

        } else if(dropId === "row_3") {
            if(state.row_2.length === 0) return true
        }

        return false
    },
    handleActionCardMove: (result, socket, setters) => (dispatch, getState) => {
        if(!result.destination)  return Promise.resolve()
        const {source, destination} = result
        let state = getState().battle.hands_actions
        let action = state[source.index]

        dispatch(Actions.onAfterDragFromHandsActions(action))

        if(Actions.notValidMoveFromHandsActions(action, destination, getState())) {
            return Promise.resolve()
        }

        if(action.type === 'ATTACK') {
            socket.emit('ATTACK_MOVE_CARD', {
                userId: getState().user.data._id,
                to: {
                    name: destination.droppableId,
                    index: destination.index
                },
                from: {
                    name: source.droppableId,
                    index: source.index
                }
            })

            const fromArrayClone = Array.from(state);
            fromArrayClone.splice(source.index, 1);
            dispatch(setters[result.source.droppableId](fromArrayClone))

            return Promise.resolve()

        } else if(action.type === "DEFENCE") {
            socket.emit('DEFENCE_MOVE_CARD',  {
                userId: getState().user.data._id,
                to: {
                    name: destination.droppableId,
                    index: destination.index
                },
                from: {
                    name: source.droppableId,
                    index: source.index
                }
            })

            const fromArrayClone = Array.from(state)
            const [removed] = fromArrayClone.splice(source.index, 1)
            const actionsRowClone =  Array.from(getState().battle["actions_row"])

            actionsRowClone.splice(actionsRowClone.length, 0, removed)

            dispatch(setters[result.source.droppableId](fromArrayClone))
            dispatch(setters["actions_row"](actionsRowClone))

            const colors =  Object.assign({}, getState().battle.elements_colors)
            const destination_row = getState().battle[destination.droppableId]
            let color = colors[destination_row[destination.index].hash]
            if(!color) {
                color = randomColor()
            }

            colors[removed.hash] = color
            colors[destination_row[destination.index].hash] =  color
            dispatch(Actions.setElementsColors(colors))
        }
    },
    notValidMoveFromHandsActions(action, destination, state) {
        const destination_row = state.battle[destination.droppableId];
        if(destination_row === undefined) {
            return true
        }

        if(destination_row[destination.index] === undefined) {
            return true
        }

        const availableLevels = []
        for(let level of action.levels) {
            // eslint-disable-next-line default-case
            switch (level) {
                case 0:
                    availableLevels.push("row_1")
                    availableLevels.push("row_2")
                    availableLevels.push("row_3")
                    break;
                case 1:
                    availableLevels.push("enemy_row_1")
                    break;
                case 2:
                    availableLevels.push("enemy_row_2")
                    break
                case 3:
                    availableLevels.push("enemy_row_3")
                    break
            }
        }

        return !availableLevels.includes(destination.droppableId)
    },
    handleShipCardMove: (result, socket, setters) => (dispatch, getState) => {
        if(!result.destination) return;
        const state = getState().battle
        const {source, destination} = result

        dispatch(Actions.onAfterDragShipCard())
        if(destination.droppableId === source.droppableId || Actions.notValidMoveFromPlacingShipsRow(destination, state)) {
            return
        }

        socket.emitAsync('MOVE_SHIP_CARD', {
            userId: getState().user.data._id,
            to: {
                name: destination.droppableId,
                index: destination.index
            },
            from: {
                name: source.droppableId,
                index: source.index
            }
        })

        let from_array = state[source.droppableId]
        let to_array = state[destination.droppableId]

        let resultMove = Actions.move(from_array, to_array, source, destination)

        dispatch(setters[source.droppableId](resultMove[source.droppableId]))
        dispatch(setters[destination.droppableId](resultMove[destination.droppableId]))
    },
   move: (sourceArray, destinationArray, from, to) => {
        const sourceClone = Array.from(sourceArray);
        const destClone = Array.from(destinationArray);

        const [removed] = sourceClone.splice(from.index, 1);
        destClone.splice(to.index, 0, removed);

        const result = {};
        result[from.droppableId] = sourceClone;
        result[to.droppableId] = destClone;

        return result;
    },
    onBeforeDragFromHandsActions: (source) => (dispatch, getState) => {
        let state = getState().battle.hands_actions
        let action = state[source.index]

        for(let enemy_row of action.levels) {
            // eslint-disable-next-line default-case
            switch (enemy_row) {
                case 0:
                    dispatch(Actions.setFirstRowShowBorder(true))
                    dispatch(Actions.setSecondRowShowBorder(true))
                    dispatch(Actions.setThirdRowShowBorder(true))
                break;
                case 1: dispatch(Actions.setFirstEnemyRowShowBorder(true))
                    break;
                case 2: dispatch(Actions.setSecondEnemyRowShowBorder(true))
                    break;
                case 3: dispatch(Actions.setThirdEnemyRowShowBorder(true))
                    break;
            }
        }
    },
    onAfterDragFromHandsActions: action => dispatch => {
        for(let enemy_row of action.levels) {
            // eslint-disable-next-line default-case
            switch (enemy_row) {
                case 0:
                    dispatch(Actions.setFirstRowShowBorder(false))
                    dispatch(Actions.setSecondRowShowBorder(false))
                    dispatch(Actions.setThirdRowShowBorder(false))
                    break;
                case 1: dispatch(Actions.setFirstEnemyRowShowBorder(false))
                    break;
                case 2: dispatch(Actions.setSecondEnemyRowShowBorder(false))
                    break;
                case 3: dispatch(Actions.setThirdEnemyRowShowBorder(false))
                    break;
            }
        }
    },
    setDamage: (damage, destination, setters) => (dispatch, getState) => {
        const row_state = Array.from(getState().battle[destination.name])
        if(row_state[destination.index] !== undefined) {
            row_state[destination.index].damage = damage
            dispatch(setters[destination.name](row_state))
        }
    }
}

export default Actions;