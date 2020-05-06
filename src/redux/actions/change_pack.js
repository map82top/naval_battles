import { packsApi } from 'utils/api';
import { userActions} from "redux/actions";

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
    fetchChangePack: packDescription => dispatch => {
        console.log(packDescription);
        packsApi
            .getPack(packDescription)
            .then((response) => {
                const {data} = response;
                data.main ? dispatch(Actions.setMain(data.main)) : Actions.doNothing()
                data.reserve ? dispatch(Actions.setReserve(data.reserve)) : Actions.doNothing()
                data.cost ? dispatch(Actions.setCost(data.cost)) : Actions.doNothing()
                data.name ? dispatch(Actions.setName(data.name)) : Actions.doNothing()
                packDescription._id ? dispatch(Actions.setId(packDescription._id)) : Actions.doNothing()
                packDescription.country ? dispatch(Actions.setCountry(packDescription.country)) : Actions.doNothing()
                return response;
            })
            .catch(err => {
                if (err.response.status && err.response.status === 403) {
                    dispatch(userActions.setIsAuth(false));
                    delete window.axios.defaults.headers.common.token;
                    delete window.localStorage.token;
                }

                return err;
            });
    },
    saveChangedPack: postData => dispatch => {
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
    doNothing: () => {}
}

export default Actions;