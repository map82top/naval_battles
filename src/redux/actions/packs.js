import { packsApi } from 'utils/api';
import { userActions} from "redux/actions";
const Actions = {
    setAllPacks: packs => ({
        type: 'PACKS:SET_ALL_PACKS',
        payload: packs,
    }),
    fetchAllUserPacks: () => dispatch => {
        packsApi
            .getAllUserPacks()
            .then((response) => {
                const {data} = response;
                dispatch(Actions.setAllPacks(data));
                return response
            })
            .catch(err => {
                if (err.response.status === 403) {
                    dispatch(userActions.setIsAuth(false));
                    delete window.axios.defaults.headers.common.token;
                    delete window.localStorage.token;
                }
                return err;
            });
    },
    deletePack: postData => dispatch => {
        return packsApi
            .deletePack(postData)
            .then((response) => {
                dispatch(Actions.fetchAllUserPacks())
                return response;
            })
            .catch(err => {
                if (err.response.status && err.response.status === 403) {
                    dispatch(userActions.setIsAuth(false));
                    delete window.axios.defaults.headers.common.token;
                    delete window.localStorage.token;
                }
                return err;
            })
    },
}

export default Actions;