import { userApi } from 'utils/api';

const Actions = {
      setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data,
      }),
      setIsAuth: (isAuth) => ({
        type: 'USER:SET_IS_AUTH',
        payload: isAuth,
      }),
      setPacks: packs => ({
        type: 'USER:SET_PACKS',
        payload: packs
      }),
      setLogout: () => ({
        type: 'USER:LOGOUT'
      }),
      fetchUserLogout: () => dispatch => {
        delete window.axios.defaults.headers.common.token;
        delete window.localStorage.token;
        dispatch(Actions.setLogout())
      },
      fetchUserData: () => dispatch => {
        return userApi
          .getUserData()
          .then((response) => {
              const { data } =  response;
              dispatch(Actions.setUserData(data));
              return response;
          })
          .catch(err => {
            if (err.response.status === 403) {
              dispatch(Actions.setIsAuth(false));
              delete window.axios.defaults.headers.common.token;
              delete window.localStorage.token;
            }
            return err;
          });
      },
      fetchUserLogin: postData => dispatch => {
        return userApi
          .signIn(postData)
          .then((response) => {
              const { data } =  response;
            const { token } = data;
            window.axios.defaults.headers.common['token'] = token;
            window.localStorage['token'] = token;
            dispatch(Actions.fetchUserData());
            dispatch(Actions.setIsAuth(true));
            return response;
          })
      },
      fetchUserRegister: postData => () => {
        return userApi.signUp(postData);
      },
};

export default Actions;
