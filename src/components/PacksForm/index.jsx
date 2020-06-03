import React, { useEffect } from "react";
import { Button, Login, PacksContainer, Background, Glass, Info } from "components";
import "./PacksForm.scss"
import { connect } from "react-redux";
import { imageApi } from "utils/api";
import { packsActions } from "redux/actions";
import { withRouter } from 'react-router-dom'


const Packs = props => {
    const {
        isSelect,
        name,
        description,
        packs,
        fetchAllUserPacks,
        title_info,
        text_info,
        timeout_info
    } = props

    const onBack = () => {
        props.history.push("/home");
    }
    useEffect(() => {
        fetchAllUserPacks();
    }, [])

    return (
        <Background
            className="packs"
            image={imageApi.getImage("pack_background.jpg")}
        >
            <Info
                className="packs__info"
                direction="RIGHT"
                timeout={timeout_info}
                title={title_info}
                text={text_info} />

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
                        history={props.history}
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