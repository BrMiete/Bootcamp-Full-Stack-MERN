import React from 'react';
import ListAuthors from '../../components/ListAuthors/ListAuthors.component';
import {Link} from 'react-router-dom';
import './HomePage.style.css';

const HomePage = () => {
    return(
        <div className='home-page'>
            <div>
                <h2>Favorite Authors</h2>
            </div>
            <Link to={"/authors/new"}>Add an author</Link>
            <ListAuthors/>
        </div>
    );
}

export default HomePage;