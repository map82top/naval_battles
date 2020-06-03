import React, {useState} from "react";
import "./Pack.scss";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons/lib/icons";
import { store } from "redux/store";
import {Button } from "antd";
import cn from "classnames";
import { imageApi  } from "utils/api";
import { packsActions } from "redux/actions";
import {openNotification} from "utils/helpers";

export const EMPTY = "empty"
export const SELECT = "select"
export const EDIT = "edit"

const Pack = ({pack, type, onClick, history}) => {
    const [statePack, setPack] = useState(pack ? pack : {})

    const notEmpty = () => {
        return type !== EMPTY
    }

    const isSelect = () => {
        return type === SELECT
    }
    const isEdit = () => {
        return type === EDIT
    }

    const handlerClick = () => {
        onClick && onClick()

        if(isSelect()) {
            history.push({
                pathname: "/queue",
                state: statePack
            })
        } else if(isEdit()) {
            history.replace({
                pathname: "/create_pack",
                state: statePack
            })
        }
    }

    const onDelete = e => {
        store
            .dispatch(packsActions.deletePack({_id: statePack._id}))
            .then((response) => {
                openNotification({
                    title: 'Отлично!',
                    text: response.data.description ? response.data.description : 'Колода удалена!',
                    type: 'success',
                });
            })
            .catch((error) => {
                console.log(error)
                openNotification({
                    title: 'Ошибка!',
                    text: 'Не удалось удалить колоду!',
                    type: 'error',
                });
            })
    }
    return (
            <div className="pack">
                <div
                    onClick={handlerClick}
                    className={cn("pack__content", { "pack__content--filled": (notEmpty()), "pack__content--not_filled": !notEmpty() })}
                    style={{backgroundImage: `url(${mapCountry(statePack.country)}`}}
                >
                    { notEmpty() ? (
                        <span className="pack__content__name">{statePack.name}</span>
                    ) : (
                        <PlusOutlined className="pack__content__empty"/>
                    )}
                </div>
                <div className="pack__footer">
                    { notEmpty() ? ('') : (
                            <span className="pack__footer__description">Нажмите, чтобы создать</span>
                        )
                    }
                    {
                        isEdit() ? (
                            <Button
                                ghost
                                icon={<DeleteOutlined />}
                                size="large"
                                onClick={ onDelete }
                            />
                        ) : ('')
                    }
                </div>
            </div>
    );
};

export default Pack;

const mapCountry = country => {
    if (country === "Japan") {
        return imageApi.getImage("symbol_japan.png");
    } else if (country === "USA") {
        return imageApi.getImage("symbol_usa.png");
    }
}