import React from "react";
import {Button} from "components"
import {connect} from "react-redux";
import {changePack} from "../../redux/actions";
import {withRouter} from "react-router-dom";

const ChangePackExitButton = ({className, nameIsValid, costIsValid, history, savePack}) => {
    const isActiveButton = () => {
        return nameIsValid && costIsValid
    }
    const onClickButton = () => {
        if(isActiveButton()) {
            savePack()
        }

        history.replace("/packs")
    }

    return (
        <Button
            className={className}
            title={ isActiveButton() ? "Сохранить" : "Выйти" }
            onClick={onClickButton}
        />
    )
}

export default withRouter(connect(
    ({change_pack}) => ({
        nameIsValid: change_pack.nameIsValid,
        costIsValid: change_pack.costIsValid,
    }), changePack
)(ChangePackExitButton))
