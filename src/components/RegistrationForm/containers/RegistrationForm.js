import RegistrationForm from "../components/RegistrationForm";
import { withFormik } from "formik";
import { validate as validateForm } from "validate.js";
import get from "lodash/get"
import { store } from 'redux/store';
import { userActions} from "redux/actions";
import { openNotification} from "utils/helpers";

export default withFormik ({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    }),
    validate: values => {
       return validateForm(values, constraints, {format: "grouped", fullMessages: false});
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        const postData = {
            username: values.username,
            email: values.email,
            password: values.password
        }

        store
            .dispatch(userActions.fetchUserRegister(postData))
            .then((response) => {
                if(response.status === "success") {
                    openNotification({
                        title: 'Отлично',
                        text: response.description ? response.description: 'Аккаунт создан!',
                        type: 'success',
                        duration: 3
                    });

                } else if(response.status !== "success") {
                    openNotification({
                        title: 'Ошибка',
                        text: 'Возникла серверная ошибка при регистрации. Повторите позже.',
                        type: 'error',
                        duration: 5
                    });

                }
                setSubmitting(false);
                props.history.push('/signin');
            })
            .catch((response) => {
                console.log(response)
                if (get(response, 'response.data.description.errmsg', '').indexOf('dup') >= 0) {
                    openNotification({
                        title: 'Ошибка',
                        text: 'Аккаунт с такой почтой уже создан.',
                        type: 'error',
                        duration: 5
                    });
                } else {
                    openNotification({
                        title: 'Ошибка',
                        text: 'Возникла серверная ошибка при регистрации. Повторите позже.',
                        type: 'error',
                        duration: 5
                    });
                }

                setSubmitting(false);
            });
    },
    displayName: "RegistrationForm"
})(RegistrationForm);

const constraints = {
    username: {
        presence: {
            allowEmpty: false,
            message: "^Обязательно для заполнения!"
        },
        length: {
            minimum: 5,
            tooShort: `^Имя должено иметь длинну не менее %{count} символов`
        },
        format: {
            pattern: "[A-z0-9]+",
            flags: "i",
            message: "^Имя может содержать только цифры и латинские буквы"
        }
    },
    email: {
        presence: {
            allowEmpty: false,
            message: "^Обязательно для заполнения!"
        },
        email: {
            message: "^Не соответстует формату электронного почтового адреса"
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^Обязательно для заполнения!"
        },
        length: {
            minimum: 6,
            tooShort: "^Пароль должен быть не менее %{count} символов"
        },
        format: {
            pattern: "(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{6,}",
            flag: "g",
            message: "Пароль должен иметь хотя бы одну цифру, специальный знак и заглавную латинскую букву"
        }
    },
    confirm_password: {
        presence: {
            allowEmpty: false,
            message: "^Обязательно для заполнения"
        },
        equality: {
            attribute: "password",
            message: "^Нет совпадения"
        },

    }
}