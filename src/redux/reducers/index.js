import { combineReducers } from "redux";

const reducers = ["user", "packs", "change_pack", "battle"];

export default combineReducers(
    reducers.reduce((initial, name) => {
        initial[name] = require(`./${name}`).default;
        return initial;
    }, {})
);