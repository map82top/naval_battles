import { packsApi } from 'utils/api';
import { userActions } from "redux/actions";
import {openNotification} from "utils/helpers";

const Actions = {
    setMain: pack => ({
        type: 'CHANGE_PACK:SET_MAIN',
        payload: pack,
    }),
    setReserve: pack => ({
        type: 'CHANGE_PACK:SET_RESERVE',
        payload: pack,
    }),
    setCost: cost => ({
        type: "CHANGE_PACK:SET_COST",
        payload: cost,
    }),
    setName: name => ({
        type: "CHANGE_PACK:SET_NAME",
        payload: name,
    }),
    setId: id => ({
        type: 'CHANGE_PACK:SET_ID',
        payload: id,
    }),
    setCountry: country => ({
        type: 'CHANGE_PACK:SET_COUNTRY',
        payload: country,
    }),
    resetState: () => ({
        type: 'CHANGE_PACK:RESET_STATE',
        payload: "",
    }),
    setNameIsValid: isValid => ({
            type: 'CHANGE_PACK:SET_NAME_IS_VALID',
            payload: isValid,
    }),
    setCostIsValid: isValid => ({
            type: 'CHANGE_PACK:SET_COST_IS_VALID',
            payload: isValid,
    }),
    setAndValidatePackName: name => dispatch => {
        dispatch(Actions.setName(name))
        let isValid = name.length >= 5
        dispatch(Actions.setNameIsValid(isValid))
    },
    setAndValidatePackCost: cost => dispatch => {
        dispatch(Actions.setCost(cost))
        let isValid = cost <= 25 && cost > 20
        dispatch(Actions.setCostIsValid(isValid))
    },
    fetchChangePack: packDescription => dispatch => {
        packsApi
            .getPack(packDescription)
            .then((response) => {
                const {data} = response;
                data.main ? dispatch(Actions.setMain(data.main)) : Actions.doNothing()
                data.reserve ? dispatch(Actions.setReserve(data.reserve)) : Actions.doNothing()
                data.cost ? dispatch(Actions.setAndValidatePackCost(data.cost)) : Actions.doNothing()
                data.name ? dispatch(Actions.setAndValidatePackName(data.name)) : Actions.doNothing()
                packDescription._id ? dispatch(Actions.setId(packDescription._id)) : Actions.doNothing()
                packDescription.country ? dispatch(Actions.setCountry(packDescription.country)) : Actions.doNothing()
                return response;
            })
            .catch(err => {
                console.log(err)
                if (err.response.status && err.response.status === 403) {
                    dispatch(userActions.setIsAuth(false));
                    delete window.axios.defaults.headers.common.token;
                    delete window.localStorage.token;
                }

                return err;
            });
    },
    savePack: () => (dispatch, getState ) => {
        const change_pack = getState().change_pack
        const postData = {
            main: change_pack.main,
            reserve: change_pack.reserve,
            cost: change_pack.cost,
            name: change_pack.name,
            _id: change_pack._id,
            country: change_pack.country,
        }

        dispatch(Actions.sendPackUpdatedData(postData))
            .then((response) => {
                openNotification({
                    title: 'Отлично!',
                    text: response.data.description ? response.data.description : 'Колода сохранена!',
                    type: 'success',
                });
            })
            .catch((error) => {
                openNotification({
                    title: 'Ошибка!',
                    text: 'Не удалось сохранить колоду',
                    type: 'error',
                });
            })

    },
    sendPackUpdatedData: postData => dispatch => {
        return packsApi
            .savePack(postData)
            .catch(err => {
                if (err.response.status && err.response.status === 403) {
                    dispatch(userActions.setIsAuth(false));
                    delete window.axios.defaults.headers.common.token;
                    delete window.localStorage.token;
                }
                return err;
            })
    },
    moveCards: result => (dispatch, getState) => {
        const { source, destination } = result;
        const change_pack = getState().change_pack
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            const items = Actions.reorder (
                change_pack[source.droppableId],
                source.index,
                destination.index
            );
            source.droppableId === 'main' ? dispatch(Actions.setMain(items)) : dispatch(Actions.setReserve(items))

        } else {
            const drop_items = Actions.move (
                change_pack[source.droppableId],
                change_pack[destination.droppableId],
                source,
                destination
            );

            let new_cost =  change_pack.cost + (destination.droppableId === 'main' ?  drop_items.droped.cost : - drop_items.droped.cost);

            dispatch(Actions.setAndValidatePackCost(new_cost))
            dispatch(Actions.setMain(drop_items.main))
            dispatch(Actions.setReserve(drop_items.reserve))
        }

    },
   reorder: (list, startIndex, endIndex) => {
        const result = Array.from(list ? list : []);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    },
    move: (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source ? source : []);
        const destClone = Array.from(destination ? destination : []);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        result.droped = removed;

        return result;
    },
    doNothing: () => {}
}

export default Actions;