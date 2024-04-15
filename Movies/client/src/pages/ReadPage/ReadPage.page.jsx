import React from 'react';
import ReadReviews from '../../components/ReadReviews/ReadReviews.component';
import LogoutButton from '../../components/LogoutButton/LogoutButton.component';
import './ReadPage.style.css';

const ReadPage = () => {
    return(
        <div className='read-page'>
            <div className='header'>
                <h2>Moldy Tomatoes</h2>
                <LogoutButton/>
            </div>
            <ReadReviews/>
        </div>
    );
}

export default ReadPage;