import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
//Inicio Componentes-Importados do ./componentes
import UsersHome from './components/UsersHome';
import UsersNew from './components/UsersNew';
import UsersEdit from './components/UsersEdit';
import UsersLayout from './components/UsersLayout';
import UsersFileUpload from './components/UsersFileUpload';
import About from './components/About';
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
//Fim Componentes-Importados do ./componentes
import { isAuth } from './utils/auth';

function App() {
  return (
    <>
      <NavigationBar />
      <UsersLayout>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/new">
              <UsersNew />
            </Route>
            <Route path="/edit/:usersId">
              {isAuth() ? (
                <UsersEdit />
              ) : (
                  <Login />
                )}
            </Route>
            <Route path="/desofuscamento">
              {isAuth() ? (
                <UsersFileUpload />
              ) : (
                  <Login />
                )}
            </Route>
            <Route path="/sobre">
              {isAuth() ? (
                <About />
              ) : (
                  <Login />
                )}
            </Route>
            <Route path="/home">
              {isAuth() ? (
                <UsersHome />
              ) : (
                  <Login />
                )}
            </Route>
            <Route path="/">
              <Login />
            </Route>
            {/* pagina de 404? */}
          </Switch>
        </Router>
      </UsersLayout>
    </>
  );
}//Final da Função App

export default App;
