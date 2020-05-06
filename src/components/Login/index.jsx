import React, { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import {Menu } from "antd";
import "./Login.scss";
import cn from "classnames"
import { userActions } from "redux/actions";
import { connect } from "react-redux";
import { store } from "redux/store";
const { SubMenu, Item } = Menu;


const Login = ( { fetchUserData, data, theme, className } ) => {
    const onExit = () => {
        store.dispatch(userActions.fetchUserLogout());
    }
   return (
       <div className={cn("login", className)}>
           <Menu
               theme={theme}
               className="login__menu"
               mode="inline"
               subMenuCloseDelay={0.1}
           >
               <SubMenu
                   key="login__menu"
                   title={
                       <span>
                       <UserOutlined className="login__menu__icon"/>
                        <span className="login__menu__username">{data && data.username}</span>
                   </span>
                   }
               >
                   <Item key="exit" className="login__menu__item" onClick={onExit}>Выход</Item>
               </SubMenu>
           </Menu>
       </div>
   )
};
export default connect(
    ({user}) => ({data: user.data}),
    userActions
)(Login);
