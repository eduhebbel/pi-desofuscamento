import React from 'react';

import UsersHeader from './UsersHeader';
import UsersFileUploadForm from './UsersFileUploadForm';

function UsersFileUpload (){
    return(
        <React.Fragment>
            <UsersHeader title="Desofuscador"/>
            <UsersFileUploadForm />
        </React.Fragment>
    )
}

export default UsersFileUpload;