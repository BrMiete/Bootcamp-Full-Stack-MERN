import React from 'react';
import CreateAuthor from '../../components/CreateAuthor/CreateAuthor.component';
import {Link} from 'react-router-dom';
import './CreatePage.style.css';

const CreatePage = () => {
    return(
        <div className='create-page'>
            <div>
                <h2>Favorite Authors</h2>
            </div>
            <Link to={"/authors/"}>Home</Link>
            <CreateAuthor/>
        </div>
    );
}

export default CreatePage;