import React from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import {Auth, Home, Packs, SelectPack, Wait, CreatePack, Test, Battle} from "pages";

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
                  path="/wait"
                  render={() => (isAuth ? <Wait /> : <Redirect to="/signin" /> )}
              />
              {/*<PrivateRoute*/}
              {/*    path="/home"*/}
              {/*    component={Home}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*    path="/packs"*/}
              {/*    component={Packs}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*    path="/select_pack"*/}
              {/*    component={SelectPack}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*    path="/create_pack"*/}
              {/*    component={ CreatePack }*/}
              {/*/>*/}
              {/*<Route*/}
              {/*    path="/test"*/}
              {/*    component={ Test }*/}
              {/*/>*/}
              <Route
                  path="/battle"
                  component={ Battle }
              />
          </Switch>
      </div>
  )
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
