import React from 'react';

import UsersHeader from './UsersHeader';
import UsersForm from './UsersForm';

function UsersNew(){
    return (
      <React.Fragment>
        <UsersHeader title='Novo Usuario!' />
        <UsersForm />
      </React.Fragment>
    );
  }//Final da função UsersNew
  
export default UsersNew;