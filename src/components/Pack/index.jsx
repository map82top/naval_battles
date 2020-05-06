import React, {useState} from "react";
import "./Pack.scss";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons/lib/icons";
import { IconButton } from "components";
import { store } from "redux/store";
import {Button, Modal} from "antd";
import cn from "classnames";
import { imageApi  } from "utils/api";
import { packsActions } from "redux/actions";
import {openNotification} from "utils/helpers";

const Pack = ({pack, onClick}) => {
    const [statePack, setPack] = useState(pack ? pack : {})
    const notEmpty = () =>{
        return statePack.country && statePack.name
    }
    const onDelete = e => {
        store
            .dispatch(packsActions.deletePack({_id: statePack._id}))
            .then((response) => {
                console.log(response)
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
                    onClick={onClick}
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
                    { notEmpty() ? (
                            <Button
                                ghost
                                icon={<DeleteOutlined />}
                                size="large"
                                onClick={ onDelete }
                            />
                        ) : (
                            <span className="pack__footer__description">Нажмите, чтобы создать</span>
                        )
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