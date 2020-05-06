import React from "react";
import { Glass, Button } from "components";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { validateField, setHelp } from "utils/helpers";
import { imageApi } from "utils/api";
import "./LoginForm.scss";

const LoginForm = ({
                       values,
                       touched,
                       errors,
                       handleSubmit,
                       handleBlur,
                       handleChange,
                       isValid,
                       isSubmitting
}) => {
    return (
            <Glass
                backgroundImage={imageApi.getImage("login_background.jpeg")}
                className={["auth__content", "sign_in_form"]}
            >
                <div className="auth__content__top">
                    <h2>Авторизация</h2>
                    <p>Для входа в игру необходимо авторитизироваться</p>
                </div>
                <Form className="auth__content__form">
                    <Form.Item
                        className="auth__content__form__item"
                        validateStatus={validateField(touched, errors, "email")}
                        help={setHelp(touched, errors, "email")}
                        hasFeedback
                    >
                        <Input
                            id="email"
                            placeholder="Электронная почта"
                            prefix={<MailOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            size="large"
                            max="60"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        className="auth__content__form__item"
                        validateStatus={validateField(touched, errors, "password")}
                        help={setHelp(touched, errors, "password")}
                        hasFeedback
                    >
                        <Input.Password
                            id="password"
                            prefix={<LockOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Пароль"
                            size="large"
                            max="25"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                        { isSubmitting && !isValid && <span>Ошибка!</span> }
                            <Button
                                className="auth__content__button"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                title="Войти"
                            />
                    <Link className="auth__content__link" to="/signup">
                        Зарегистрироваться
                    </Link>
                </Form>
            </Glass>
    );
}

export default LoginForm;