import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './CreateMovie.style.css';

const CreateMovie = () => {
    const [data, setData] = useState({
        title: '',
        reviews: []
    })

    const [newReview, setNewReview] = useState({
        name: '',
        rating: '',
        review: ''
    });
    const [errors, setErrors] = useState([]);
    const [foundErrors, setFoundErrors] = useState(false);
    const [validateErrors, setValidateErrors] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        const name = localStorage.getItem("firstName");
        setNewReview({
            name: name,
            rating: '',
            review: ''
        })
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "name" || name === "rating" || name === "review") {
            setNewReview({ ...newReview, [name]: value });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const createAMovie = async(data) => {
        await axios.post("http://localhost:8000/movies/new", data, {withCredentials: true})
            .then((response) => {
                setFoundErrors(false);
                console.log(response.data)
                goToMain();
            })
            .catch((error) => {
                //Validaciones del back-end
                setFoundErrors(true);
                console.log(error.response.data.error)
                if (error.response.data.error === "Token hasn't been sent") {
                    setErrors(["You are unauthorized to do this"]);
                }
                else {
                    const errorResponse = error.response.data.error.errors;
                    const errorArray = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArray.push(errorResponse[key].message)
                    }
                    setErrors(errorArray);
                }
                setData({
                    title: '',
                    reviews: []
                })
                setNewReview({
                    name: '',
                    rating: '',
                    review: ''
                })
                console.log(error)
            });
    }

    const goToMain = () => {
        navigate("/movies/");
    }
    //Validaciones del front-end
    const validate = () => {
        let flag = true;
        let error = {};

        if (data.title.length <= 2){
            error.title = "The movie's title must be at least 3 characters long"
            flag = false;
        }

        if (newReview.name.length <= 2){
            error.name = "Your name must be at least 3 characters long"
            flag = false;
        }

        if (newReview.rating > 5){
            error.rating = "The movie's rating is more than maximum allowed value (5)"
            flag = false;
        }

        if (newReview.rating < 1){
            error.rating = "The movie's rating is less than minimum allowed value (1)"
            flag = false;
        }

        if (newReview.review.length > 300){
            error.review = "The movie's review must be a maximum of 300 characters long"
            flag = false;
        }

        if (newReview.review.length === 0){
            error.review = "The movie's review is required"
            flag = false;
        }

        setValidateErrors(error);
        console.log(error);

        setData({
            title: '',
            reviews: []
        })
        setNewReview({
            name: '',
            rating: '',
            review: ''
        })

        return flag
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validate()){
            return
        }
        
        const updatedMovie = {...data, reviews: [...data.reviews, newReview]};
        console.log(data)
        console.log(newReview)
        console.log(updatedMovie)
        createAMovie(updatedMovie);
    }

    return(
        <div className='create-component'>
            <div className='title'>
                <h2>Submit a Movie and a Review</h2>
            </div>
            <form className='create-form' onSubmit={handleSubmit}>
                <div className='movie-title'>
                    <h4>Movie Title:</h4>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        placeholder="Movie's title"
                        onChange={handleInputChange}
                    />
                </div>
                <div className='create-name'>
                    <h4>Your Name:</h4>
                    <input
                        type="text"
                        name="name"
                        value={newReview.name}
                        placeholder="Your name"
                        onChange={handleInputChange}
                    />
                </div>
                <div className='create-rating'>
                    <h4>Rating:</h4>
                    <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        step="1"
                        value={newReview.rating}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='create-review'>
                    <h4>Your Review:</h4>
                    <textarea name="review" rows="10" cols="50" value={newReview.review} onChange={handleInputChange}></textarea>
                </div>
                <div className='create-actions'>
                    <button className='create-submit' type="submit" onClick={handleSubmit}>Submit</button>
                    <button className='create-cancel' onClick={goToMain}>Cancel</button>
                </div>
                <div className='errors'>
                    {/* Validaciones del front-end*/}
                    {foundErrors && errors.map((err, index) =>
                        <p className='name-error' key={index}>*{err}</p>
                    )}
                    {/* Validaciones del back-end */}
                    {validateErrors.title && <p>*{validateErrors.title}</p>}
                    {validateErrors.name && <p>*{validateErrors.name}</p>}
                    {validateErrors.rating && <p>*{validateErrors.rating}</p>}
                    {validateErrors.review && <p>*{validateErrors.review}</p>}
                </div>
            </form>
        </div>
    );
}

export default CreateMovie;