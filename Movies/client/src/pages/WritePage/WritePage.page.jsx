import React from 'react';
import WriteReview from '../../components/WriteReview/WriteReview.component'; 
import LogoutButton from '../../components/LogoutButton/LogoutButton.component';
import './WritePage.style.css';

const WritePage = () => {
    return(
        <div className='write-page'>
            <div className='header'>
                <h2>Moldy Tomatoes</h2>
                <LogoutButton/>
            </div>
            <WriteReview/>
        </div>
    );
}

export default WritePage;