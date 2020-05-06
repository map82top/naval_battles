import React from "react";
import {Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import { Glass, Button } from "components";
import { Link } from "react-router-dom";
import { validateField, setHelp } from "utils/helpers";
import "./RegistrationForm.scss"
import { imageApi } from "utils/api";

const RegistrationForm = ({
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
          className={["auth__content", "sign_up_form"]}
      >
          <div className="auth__content__top">
              <h2>Регистрация</h2>
              <p>Пожалуйста, заполните форму регистрации</p>
          </div>
              <Form className="auth__form">
                  <Form.Item
                      className="auth__content__form__item"
                      validateStatus={validateField(touched, errors, "username")}
                      help={setHelp(touched, errors, "username")}
                      hasFeedback
                  >
                      <Input
                        id="username"
                        prefix={ <UserOutlined className="site-form-item-icon" style={{color: 'rgba(0, 0, 0, 0.25)'}}/> }
                        size="large"
                        placeholder="Выберите имя в игре"
                        max="16"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                  </Form.Item>
                  <Form.Item
                      className="auth__content__form__item"
                      validateStatus={ validateField(touched, errors, "email") }
                      help={setHelp(touched, errors, "email")}
                      hasFeedback
                  >
                        <Input
                            id="email"
                            prefix={ <MailOutlined className="site-form-item-icon" style={{color: 'rgba(0, 0, 0, 0.25)'}}/> }
                            size="large"
                            placeholder="Email"
                            max="80"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                          size="large"
                          prefix={ <LockOutlined className="site-form-item-icon" style={{color: 'rgba(0, 0, 0, 0.25)'}}/> }
                          placeholder="Придумайте пароль к игре"
                          max="25"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                      />
                  </Form.Item>
                  <Form.Item
                      className="auth__content__form__item"
                      validateStatus={validateField(touched, errors, "confirm_password")}
                      help={setHelp(touched, errors, "confirm_password")}
                      hasFeedback
                  >
                    <Input.Password
                        id="confirm_password"
                        size="large"
                        prefix={ <LockOutlined className="site-form-item-icon" style={{color: 'rgba(0, 0, 0, 0.25)'}}/> }
                        placeholder="Повторите пароль"
                        max="25"
                        value={values.confirm_password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                  </Form.Item>
                      {isSubmitting && !isValid && <span>Ошибка!</span>}
                      <Button
                          className="auth__content__button"
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                          title="Зарегистрироваться"
                      />
                  <Link className="auth__content__link" to="/signin">
                      Войти в аккаунт
                  </Link>
              </Form>
      </Glass>
  );
};

export default RegistrationForm;