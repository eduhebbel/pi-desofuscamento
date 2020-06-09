import React from 'react';

import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';
import UsersHomeNewButton from './UsersHomeNewButton';



function UsersHome() {
  return (
    <React.Fragment>
      <UsersHeader title="Home" />
      <UsersHomeNewButton />
      <UsersTable />
      <UsersHomeNewButton />
    </React.Fragment>
  );
}//Final da Função UsersHome

export default UsersHome;