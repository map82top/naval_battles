import React, { useEffect } from "react";
import { Button, Login, PacksContainer, Background, Glass } from "components";
import "./PacksForm.scss"
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { imageApi } from "utils/api";
import { packsActions } from "redux/actions";
import { withRouter } from 'react-router-dom'


const Packs = ({isSelect, name, description, packs, fetchAllUserPacks}) => {
    const history =  useHistory();
    const onBack = () => {
        history.push("/home");
    }
    useEffect(() => {
        fetchAllUserPacks();
    }, [])

    return (
        <Background
            className="packs"
            image={imageApi.getImage("pack_background.jpg")}
        >
                <div className="packs__top">
                    <Login
                        theme="dark"
                    />
                </div>
                <Glass
                    className="packs__content"
                    backgroundImage={imageApi.getImage("pack_background.jpg")}
                >
                    <PacksContainer
                        isSelect={isSelect}
                        name={name}
                        description={description}
                        packs={packs}
                    />
                </Glass>
                <div className="packs__bottom">
                    <Button
                        href="/home"
                        title="Выход"
                        onClick={onBack}
                    />
                </div>
        </Background>
    );
};

export default withRouter(connect(
    ({packs}) => ({packs: packs.all_user_packs}),
    packsActions
)(Packs));