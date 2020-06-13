import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import NewUser from './users/NewUser';
import ListUsers from './users/ListUsers';
import EditUser from './users/EditUser';

function App() {
  return (
    <Fragment>
      <h1> teste header </h1>
      <Router>
        <Switch>
          <Route path='/'>
            <h3>main page</h3>
          </Route>
          <Route path='/users/'>
            <ListUsers />
          </Route>
          <Route path='/users/new'>
            <NewUser />
          </Route>
          <Route path='/users/edit/:userId'>
            <EditUser />
          </Route>
        </Switch>
      </Router>
      <h1> teste footer </h1>
    </Fragment>
  );
}


export default App;
