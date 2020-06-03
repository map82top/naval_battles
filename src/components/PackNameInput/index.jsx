import React from "react";
import {Form, Input} from "antd";
import {connect} from "react-redux";
import {changePack} from "../../redux/actions";
import "./PackNameInput.scss"
import {withRouter} from "react-router-dom";

const PackNameInput = ({ placeholder, name, nameIsValid, setAndValidatePackName}) => {
    const changeName = (e) => {
        setAndValidatePackName(e.target.value)
    }

    return (
        <Form.Item
            className="pack_name_input"
            validateStatus={nameIsValid ? "success" : "error"}
            help={"Поле обязательно для заполнения"}
            hasFeedback
        >
            <Input
                id="name"
                name="name"
                placeholder= {placeholder ? placeholder : "Название колоды"}
                value={name}
                onChange={changeName}
            />
        </Form.Item>
    )}
export default withRouter(connect(({change_pack}) => ({
    name: change_pack.name,
    nameIsValid: change_pack.nameIsValid
}), changePack)(PackNameInput))
