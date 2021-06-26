import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';
import paths from './paths';

function Routes() {
  return (
    <Router>
      <Switch>
        {paths.map(({ path, isPrivate, exact, component }) =>
          React.createElement(
            isPrivate ? PrivateRoute : Route,
            { exact, path, key: path },
            component,
          ),
        )}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

/* React.createElement is equivalent to 
    isPrivate ? (
    <PrivateRoute key={path} exact={exact} path={path}>
      {component}
    </PrivateRoute>
  ) : (
    <Route key={path} exact={exact} path={path}>
      {component}
    </Route>
  ), 
*/

export default Routes;
