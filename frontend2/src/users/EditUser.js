import React from 'react';
import { useParams } from 'react-router-dom';

function EditUser() {
    const { userId } = useParams();
    return(<h1> EditUser {userId} </h1>)
  }
  
  export default EditUser;