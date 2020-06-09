import React from 'react';
import { useParams } from 'react-router-dom';

import UsersHeader from './UsersHeader';
import UsersForm from './UsersForm';

function UsersEdit(){
    const { id } = useParams();
    const title = `Edição de Usuario ID:${id}`;
  
  return (
    <React.Fragment>
      <UsersHeader title={title} />
      <UsersForm id={id} />
    </React.Fragment>
  );
  }//Final da Função UsersEdit

  export default UsersEdit;