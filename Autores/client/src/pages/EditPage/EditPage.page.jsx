import React from 'react';
import {Link} from 'react-router-dom';
import EditAuthor from '../../components/EditAuthor/EditAuthor.component';
import './EditPage.style.css';

const EditPage = () => {
    return(
        <div className='edit-page'>
            <div>
                <h2>Favorite Authors</h2>
            </div>
            <Link to={"/authors/"}>Home</Link>
            <EditAuthor/>
        </div>
    );
}

export default EditPage;