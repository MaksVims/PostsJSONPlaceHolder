import React, {Fragment, useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  const {isAuth, isAuthLoading} = useContext(AuthContext)

  if (isAuthLoading) {
    return <div className="loader__wrapper"><Loader/></div>
  }

  return (
    <Fragment>
      {isAuth
        ?
        <Switch>
          {privateRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
          <Redirect to='/posts'/>
        </Switch>
        :
        <Switch>
          {publicRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
          <Redirect to='/login'/>
        </Switch>
      }
    </Fragment>
  );
};

export default AppRouter;
