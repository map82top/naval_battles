import React from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter  } from "react-router-dom";
import {Auth, Home, Packs, SelectPack, Wait, CreatePack, Battle} from "pages";

const App = props => {
    const { isAuth } = props;
  return (
      <div className="wrapper">
          <Switch>
              <Route
                  path="/home"
                  render={() => (isAuth ? <Home /> : <Redirect to="/signin" /> )}
              />
              <Route
                  path="/packs"
                  render={() => (isAuth ? <Packs /> : <Redirect to="/signin" /> )}
              />
              <Route
                  path="/select_pack"
                  render={() => (isAuth ? <SelectPack /> : <Redirect to="/signin" /> )}
              />
              <Route
                  path="/create_pack"
                  render={() => (isAuth ? <CreatePack /> : <Redirect to="/signin" /> )}
              />
              <Route
                  path={["/signin", "/signup"]}
                  render={() => (!isAuth ? <Auth /> : <Redirect to="/home" /> )}
              />
              <Route
                  path="/queue"
                  render={() => (isAuth ? <Wait /> : <Redirect to="/signin" /> )}
              />
              <Route
                  path="/battle"
                  render={() => (isAuth ? <Battle /> : <Redirect to="/signin" /> )}
              />
              {/*если писать это в начале, то другие path работать не будут*/}
              <Route
                  path="/"
                  render={() => (isAuth ? <Redirect to="/home" /> : <Redirect to="/signin" /> )}
              />
          </Switch>
      </div>
  )
};

export default withRouter(connect(({ user }) => ({ isAuth: user.isAuth }))(App));
