import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './EditAuthor.style.css';

const EditAuthor = () => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const home = useNavigate();
    const [errors, setErrors] = useState([]);
    const [foundErrors, setFoundErrors] = useState(false);
    const [foundAuthor, setFoundAuthor] = useState(false);
    
    useEffect(() => {
        axios.get("http://localhost:8000/authors/" + id)
            .then((response) => {
                setName(response.data.author.name)
                setFoundAuthor(true);
                console.log(response.data.author)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])
    
    const updateAnAuthor = async() => {
        await axios.put("http://localhost:8000/authors/edit/" + id, {name})
            .then((response) => {
                goToHome();
                console.log(response)
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
        updateAnAuthor();
    }

    const goToHome = () => {
        home("/authors/")
    }

    return(
        <div className='edit-component'>
            {foundAuthor && <div>
                <div>
                    <h2>Edit this author:</h2>
                </div>
                <form className='edit-form' onSubmit={handleSubmit}>
                    <div>
                        <span>Name:</span>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(event) => {setName(event.target.value)}}
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
            </div>}
            {!foundAuthor && <div>
                <h3>Author not found</h3>
                <p>We're sorry, but we couldn't find the author you're looking for.</p>
                <p>Do you want to add this author to our database?</p>
                <Link to={"/authors/new"}>Add an author</Link>
            </div>}
        </div>
    );
}

export default EditAuthor;