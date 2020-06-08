import React from 'react';
import { useParams } from 'react-router-dom';

import UsersHeader from './UsersHeader';

function UsersEdit(){
    const { usersId } = useParams();
    const title = `Edição de Usuario ID:${usersId}`;
  
  return (
    <UsersHeader title={title} />
  );
  }//Final da Função UsersEdit

  export default UsersEdit;