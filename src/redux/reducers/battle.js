const initialState = {
    id: null,
    isPlacing: true,
    enemy_hands_actions: [],
    enemy_actions_row: [],
    enemy_placing_ships_row: [],
    enemy_row_1: [],
    enemy_row_2: [],
    enemy_row_3: [],
    hands_actions: [],
    actions_row: [],
    placing_ships_row: [],
    row_1: [],
    firstRowShowBorder: false,
    secondRowShowBorder: false,
    thirdRowShowBorder: false,
    firstEnemyRowShowBorder: false,
    secondEnemyRowShowBorder: false,
    thirdEnemyRowShowBorder: false,
    row_2: [],
    row_3: [],
    time: "02:00",
    battleStarted: false,
    floatingCard: undefined,
    myTurn: true,
    arrows: [],
    elements_colors: {},
    user_points: 0,
    enemy_points: 0,
    end_turn_button_visible: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "BATTLE:SET_MY_TURN":
            return {
                ...state,
                myTurn: payload
            }
        case "BATTLE:SET_ARROWS":
            return {
                ...state,
                arrows: payload
            }
        case "BATTLE:SET_ID":
            return {
                ...state,
                id: payload,
            };
        case "BATTLE:SET_BATTLE_STARTED":
            return {
                ...state,
                battleStarted: payload,
            };
        case "BATTLE:SET_TIME":
            return {
                ...state,
                time: payload,
            };
        case "BATTLE:SET_IS_PLACING":
            return {
                ...state,
                isPlacing: payload
            };
        case "BATTLE:SET_SHIPS_ONE_ROW":
            return  {
                ...state,
                row_1: payload
            };
        case "BATTLE:SET_SHIPS_TWO_ROW":
            return  {
                ...state,
                row_2: payload
            };
        case "BATTLE:SET_SHIPS_THREE_ROW":
            return  {
                ...state,
                row_3: payload
            };
        case "BATTLE:SET_HANDS_ACTIONS":
            return  {
                ...state,
                hands_actions: payload
            };
        case "BATTLE:SET_ACTIONS_ROW":
            return  {
                ...state,
                actions_row: payload
            };
        case "BATTLE:SET_PLACING_SHIPS":
            return {
                ...state,
                placing_ships_row: payload
            };
        case "BATTLE:SET_ENEMY_SHIPS_ONE_ROW":
            return  {
                ...state,
                enemy_row_1: payload
            };
        case "BATTLE:SET_ENEMY_SHIPS_TWO_ROW":
            return  {
                ...state,
                enemy_row_2: payload
            };
        case "BATTLE:SET_ENEMY_SHIPS_THREE_ROW":
            return  {
                ...state,
                enemy_row_3: payload
            };
        case "BATTLE:SET_ENEMY_HANDS_ACTIONS":
            return  {
                ...state,
                enemy_hands_actions: payload
            };
        case "BATTLE:SET_ENEMY_ACTIONS_ROW":
            return  {
                ...state,
                enemy_actions_row: payload
            };
        case "BATTLE:SET_ENEMY_PLACING_SHIPS":
            return {
                ...state,
                enemy_placing_ships_row: payload
            };
        case "BATTLE:SET_FIRST_ROW_SHOW_BORDER":
            return {
                ...state,
                firstRowShowBorder: payload
            };
        case "BATTLE:SET_SECOND_ROW_SHOW_BORDER":
            return {
                ...state,
                secondRowShowBorder: payload
            };
        case "BATTLE:SET_THIRD_ROW_SHOW_BORDER":
            return {
                ...state,
                thirdRowShowBorder: payload
            };
        case "BATTLE:STATE_CLEAR":
            return {
                ...initialState
            };
        case "BATTLE:SET_FIRST_ENEMY_ROW_SHOW_BORDER":
            return {
                ...state,
                firstEnemyRowShowBorder: payload
            };
        case "BATTLE:SET_SECOND_ENEMY_ROW_SHOW_BORDER":
            return {
                ...state,
                secondEnemyRowShowBorder: payload
            };
        case "BATTLE:SET_THIRD_ENEMY_ROW_SHOW_BORDER":
            return {
                ...state,
                thirdEnemyRowShowBorder: payload
            };
        case "BATTLE:SET_FLOATING_CARD":
            return {
                ...state,
                floatingCard: payload
            };
        case "BATTLE:SET_ELEMENTS_COLORS":
            return {
                ...state,
                elements_colors: payload
            };
        case "BATTLE:SET_USER_POINTS":
            return {
                ...state,
                user_points: payload
            };
        case "BATTLE:SET_ENEMY_POINTS":
            return {
                ...state,
                enemy_points: payload
            };
        case "BATTLE:SET_END_TURN_BUTTON_VISIBLE":
            return {
                ...state,
                end_turn_button_visible: payload
            };
        default:
            return state;
    }
};