const initialState = {
    main: [],
    reserve: [],
    cost: 0,
    name: "",
    _id: "",
    country: ""
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case "CHANGE_PACK:SET_MAIN":
            return  {
                ...state,
                main: payload
            };
        case "CHANGE_PACK:SET_RESERVE":
            return  {
                ...state,
                reserve: payload
            };
        case "CHANGE_PACK:SET_COST":
            return  {
                ...state,
                cost: payload
            };
        case "CHANGE_PACK:SET_NAME":
            return  {
                ...state,
                name: payload
            };
        case "CHANGE_PACK:SET_ID":
            return  {
                ...state,
                _id: payload
            };
        case "CHANGE_PACK:SET_COUNTRY":
            return  {
                ...state,
                country: payload
            };
        case "CHANGE_PACK:RESET_STATE":
            return  {
                ...initialState
            };
        default:
            return state;
    }

};