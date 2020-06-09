import React from 'react';
import { useParams } from 'react-router-dom';

import UsersHeader from './UsersHeader';
import UsersForm from './UsersForm';

function UsersEdit(){
    const { usersId } = useParams();
    const title = `Edição de Usuario ID:${usersId}`;
  
  return (
    <React.Fragment>
      <UsersHeader title={title} />
      <UsersForm usersId={usersId} />
    </React.Fragment>
  );
  }//Final da Função UsersEdit

  export default UsersEdit;