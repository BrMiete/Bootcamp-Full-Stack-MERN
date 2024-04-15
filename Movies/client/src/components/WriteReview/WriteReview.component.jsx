import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './WriteReview.style.css';

const WriteReview = () => {
    const {id} = useParams();
    const [data, setData] = useState({});
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
        axios.get("http://localhost:8000/movies/" + id, {withCredentials: true})
            .then((response) => {
                setData(response.data.movie)
                setFoundErrors(false);
                console.log(response)
            })
            .catch((error) => {
                setFoundErrors(true);
                console.log(error)
                console.log(error.response.data.error);
                if (error.response.data.error === "Token hasn't been sent") {
                    setErrors(["You are unauthorized to do this"]);
                }
            })
            const name = localStorage.getItem("firstName");
            setNewReview({
                name: name,
                rating: '',
                review: ''
            })
    }, [id])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const updateAMovie = async(updatedMovie) => {
        await axios.put("http://localhost:8000/movies/" + id, updatedMovie, {withCredentials: true})
            .then((response) => {
                setFoundErrors(false);
                console.log(response)
                navigate("/movies/" + id)
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
                setNewReview({
                    name: '',
                    rating: '',
                    review: ''
                })
                console.log(error)
            });
    }

    const goToReviews = (id) => {
        navigate("/movies/" + id)
    }

    //Validaciones del front-end
    const validate = () => {
        let flag = true;
        let error = {};

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
        updateAMovie(updatedMovie);
    }
    
    return(
        <div className="write-component">
            <div className="title">
                <h2>Add a Review for {data.title}</h2>
            </div>
            <form className="write-form" onSubmit={handleSubmit}>
                <div className="write-name">
                    <h4>Your Name:</h4>
                    <input
                        type="text"
                        name="name"
                        value={newReview.name}
                        placeholder="Your name"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="write-rating">
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
                <div className="write-review">
                    <h4>Your Review:</h4>
                    <textarea name="review" rows="10" cols="50" value={newReview.review} onChange={handleInputChange}></textarea>
                </div>
                <div className="write-actions" >
                    <button className="write-submit" type="submit" onClick={(event) => {handleSubmit(event)}}>Submit</button>
                    <button className="write-cancel" onClick={(event) => {goToReviews(id)}}>Cancel</button>
                </div>
                <div className="errors">
                    {/* Validaciones del front-end*/}
                    {foundErrors && errors.map((err, index) =>
                        <p className='name-error' key={index}>*{err}</p>
                    )}
                    {/* Validaciones del back-end */}
                    {validateErrors.name && <p>*{validateErrors.name}</p>}
                    {validateErrors.rating && <p>*{validateErrors.rating}</p>}
                    {validateErrors.review && <p>*{validateErrors.review}</p>}
                </div>
            </form>
        </div>
    );
}

export default WriteReview;