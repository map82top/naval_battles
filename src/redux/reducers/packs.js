const initialState = {
    all_user_packs: [],
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case "PACKS:SET_ALL_PACKS":
            return {
                ...state,
                all_user_packs: payload
            };
        default:
            return state;
    }
};