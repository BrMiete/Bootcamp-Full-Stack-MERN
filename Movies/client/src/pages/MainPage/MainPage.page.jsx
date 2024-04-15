import React from 'react';
import ListMovies from '../../components/ListMovies/ListMovies.component'; 
import LogoutButton from '../../components/LogoutButton/LogoutButton.component';
import './MainPage.style.css';

const MainPage = () => {
    return(
        <div className='main-page'>
            <div className='header'>
                <h2>Moldy Tomatoes</h2>
                <LogoutButton/>
            </div>
            <ListMovies/>
        </div>
    );
}

export default MainPage;