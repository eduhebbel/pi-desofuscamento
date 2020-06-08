import React from 'react';

import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';



function UsersHome(){
    return (
      <React.Fragment>
      <UsersHeader title="Home" />
      <UsersTable />
      </React.Fragment>
    );
  }//Final da Função UsersHome

  export default UsersHome;