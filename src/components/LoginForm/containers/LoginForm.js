import LoginForm from "../components/LoginForm";
import {withFormik} from "formik";
import {validate as validateForm} from "validate.js";
import { userActions } from "redux/actions";
import { store } from "redux/store";
import { openNotification } from "utils/helpers";

export default withFormik ({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        password: ""
    }),
    validate: values => {
        return validateForm(values, constraints);
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        store
            .dispatch(userActions.fetchUserLogin(values))
            .then((response) => {
                openNotification({
                    title: 'Отлично!',
                    text: response.data.description ? response.data.description : 'Авторизация прошла успешно!.',
                    type: 'success',
                });

               props.history.push('/home');

                setSubmitting(false);
            })
            .catch((err) => {
                if (err.response.status === 500) {
                    openNotification({
                        title: 'Ошибка',
                        text: err.response.data.description ? err.response.data.description : 'Неверный логин или пароль!',
                        type: 'error',
                        duration: 3
                    });

                    console.log(err.response)
                } else {
                    openNotification({
                        title: 'Ошибка',
                        text: 'Возникла серверная ошибка при попытке войти. Повторите позже.',
                        type: 'error',
                        duration: 3
                    });
                }

                setSubmitting(false);
            });
    },
    displayName: "LoginForm"
})(LoginForm);

const constraints = {
    email: {
        presence: {
            allowEmpty: false,
            message: "^Обязательно для заполнения!"
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^Обязательно для заполнения!"
        }
    }
}