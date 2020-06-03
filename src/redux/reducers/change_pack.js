const initialState = {
    main: [],
    reserve: [],
    cost: 0,
    name: "",
    _id: "",
    country: "",
    nameIsValid: false,
    costIsValid: false
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
        case "CHANGE_PACK:SET_NAME_IS_VALID":
            return  {
                ...state,
                nameIsValid: payload
            };
        case "CHANGE_PACK:SET_COST_IS_VALID":
            return  {
                ...state,
                costIsValid: payload
            };
        case "CHANGE_PACK:RESET_STATE":
            return  {
                ...initialState
            };
        default:
            return state;
    }

};