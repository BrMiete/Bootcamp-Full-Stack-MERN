import React from 'react';
import CreateMovie from '../../components/CreateMovie/CreateMovie.component';
import LogoutButton from '../../components/LogoutButton/LogoutButton.component';
import './CreatePage.style.css';

const CreatePage = () => {
    return(
        <div className='create-page'>
            <div className='header'>
                <h2>Moldy Tomatoes</h2>
                <LogoutButton/>
            </div>
            <CreateMovie/>
        </div>
    );
}

export default CreatePage;