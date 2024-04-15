import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './CreateAuthor.style.css';


const CreateAuthor = () => {
    const [data, setData] = useState({
        name: ''
    })
    const [errors, setErrors] = useState([]);
    const [foundErrors, setFoundErrors] = useState(false);
    const home = useNavigate();
    
    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const createAnAuthor = async(data) => {
        await axios.post("http://localhost:8000/authors/new", data)
            .then((response) => {
                setFoundErrors(false);
                setData({
                    name: ''
                })
                goToHome();
                console.log(response.data)
            })
            .catch((error) => {
                setFoundErrors(true);
                const errorResponse = error.response.data.error.errors;
                const errorArray = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArray.push(errorResponse[key].message)
                }
                setErrors(errorArray);
                console.log(error)
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createAnAuthor(data);
    }

    const goToHome = () => {
        home("/authors/");
    }

    return(
        <div className='create-component'>
            <div>
                <h2>Add a new author:</h2>
            </div>
            <form className='create-form' onSubmit={handleSubmit}>
                <div>
                    <span>Name:</span><br/>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        placeholder="Author's name"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button onClick={goToHome}>Cancel</button>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
                {foundErrors && errors.map((err, index) =>
                    <p className='name-error' key={index}>*{err}</p>
                )}
            </form>
        </div>
    );
}

export default CreateAuthor;