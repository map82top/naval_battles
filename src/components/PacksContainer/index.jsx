import React, {useState} from "react";
import "./PacksContainer.scss";
import { Pack } from "components";
import { useHistory } from "react-router-dom";
import {Modal} from "antd";
import { Glass, Button } from "components";
import { imageApi  } from "utils/api"
import { Link } from "react-router-dom";

const PacksContainer = ( { isSelect, name, description, packs } ) => {
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const onChoose = () => {
        history.push("/wait");
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = e => {
        setVisible(false);
    };

    return (
        <div className="pack_container">
            <div className="pack_container__title">
                <span className="pack_container__title__name">{name}</span>
                <span className="pack_container__title__description">{description}</span>
            </div>
            <div className="pack_container__content">
                { packs && packs.map(pack => {
                    return (
                        <Link
                            to={isSelect ? {
                                pathname: "/wait"
                            } : {
                                pathname: "/create_pack",
                                state: pack
                            }}
                        >
                            <Pack
                                pack={pack}
                                key={pack._id}
                                onClick={onChoose}
                            />
                        </Link>
                     )
                })}
                { isSelect ? ('') : (
                    <Pack
                        key={"pack_empty"}
                        onClick={showModal}
                    />
                )}
            </div>
            <Modal
                className="pack_container__modal"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                keyboard
                centered
            >
                <Glass
                    className="pack_container__modal__body"
                    backgroundImage="test"
                >
                    <div className="pack_container__modal__body__title">
                        Выберите нацию новой колоды
                    </div>
                    <div className="pack_container__modal__body__nations">
                        <Link
                            to={{
                                pathname: "/create_pack",
                                state: { country: "Japan" }
                            }}
                        >
                            <div id="Japan" className="pack_container__modal__body__nations__item">
                                <img alt="japan_pack_icon" src={imageApi.getImage("symbol_japan.png")}/>
                                <span>Япония</span>

                            </div>
                        </Link>
                        <div id="USA" className="pack_container__modal__body__nations__item">
                            <img alt="usa_pack_icon" src={imageApi.getImage("symbol_usa.png")}/>
                            <span>США</span>
                        </div>
                    </div>
                    <Button
                        className="pack_container__modal__button"
                        onClick={handleCancel}
                        title="Выход"
                    />
                </Glass>
            </Modal>
        </div>
    );
};

export default PacksContainer;