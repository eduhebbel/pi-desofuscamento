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
//Fim Componentes-Importados do ./componentes
function App() {
  return (
    <UsersLayout>
      <Router>
        <Switch>
          <Route path="/new">
            <UsersNew />
          </Route>
          <Route path="/edit/:usersId">
            <UsersEdit />
          </Route>
          <Route path="/upload">
            <UsersFileUpload />
          </Route>
          <Route path="/">
            <UsersHome />
          </Route>
         
        </Switch>
      </Router>
    </UsersLayout>
  );
}//Final da Função App

export default App;
