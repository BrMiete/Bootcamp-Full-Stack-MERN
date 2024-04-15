import React, { useState } from 'react';
import HTTPClient from '../../utils/HTTPClient.util';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.style.css';

const LogoutButton = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const navigate = useNavigate();
    

    const handleLogout = async() => {
        localStorage.removeItem("firstName");
        
        let client = new HTTPClient();

        client.logout()
            .then((response) => {
                navigate("/login");
            })
            .catch((error) => {
                console.log("No ha funcionado")
                console.log(error)
            })

        setLoggedOut(true);
        if (loggedOut) {
            navigate("/login");
        }
    };
    
    return (
        <button className='logout-btn' onClick={(event) => {handleLogout()}}>Logout</button>
    );
}

export default LogoutButton;