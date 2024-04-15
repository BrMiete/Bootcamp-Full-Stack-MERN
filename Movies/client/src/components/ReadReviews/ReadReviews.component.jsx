import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './ReadReviews.style.css';

const ReadReviews = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState([]);
    const [newReviews, setNewReviews] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/movies/" + id, {withCredentials: true})
            .then((response) => {
                    setMovie(response.data.movie)
                    setReviews(response.data.movie.reviews)
                    console.log(response.data.movie.reviews)
            })
            .catch((error) => { 
                console.log(error)
                console.log(error.response.data.error)
                if (error.response.data.error === "Token hasn't been sent") {
                    setErrors(["You are unauthorized to see this"]);
                }
            })
    }, [id, newReviews])

    const updateReviews = () => {
        const name = localStorage.getItem("firstName");
        let j = 0;
        let array = [];
        for (let i=0; i<reviews.length; i++){
            if (name !== reviews[i].name){
                array[j] = reviews[i];
                j++
            }
        }
        if (array.length === 0) {
            deleteAMovie(id);
        }
        else {
            setNewReviews(newReviews => [...newReviews, ...array]);
            const updatedReviews = [...newReviews, ...array];
            const updatedMovie = {...movie, reviews: [...updatedReviews]};
            updateAMovie(updatedMovie);
        }
        
    }

    const deleteAMovie = async(id) => {
        await axios.delete("http://localhost:8000/movies/delete/" + id, {withCredentials: true})
            .then((response) => {
                console.log(response)
                goToMain();
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const updateAMovie = async(updatedMovie) => {
        await axios.put("http://localhost:8000/movies/" + id, updatedMovie, {withCredentials: true})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                //Validaciones del back-end
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
                console.log(error)
            });
    }

    const goToMain = () => {
        navigate("/movies/")
    }
    
    return(
        <div className="read-component">
            <div className="title">
                <h2>Reviews for {movie.title}</h2>
            </div>
            <div>
                <table className="read-table">
                    <caption>
                        Movie Reviews 2024
                    </caption>
                    <thead>
                        <tr className="table-titles">
                            <th scope="col">Reviewer</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => 
                            <tr key={index}>
                                <th scope="row">{review.name}</th>
                                <td>{review.rating}</td>
                                <td>{review.review}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="read-actions">
                    <button className="home-btn" onClick={(event) => {goToMain()}}>Home</button>
                    <button className="delete-btn" onClick={(event) => {updateReviews()}}>Delete Movie</button>
                </div>
                <div className="errors">
                    {errors && errors.map((err, index) =>
                        <p key={index}>*{err}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReadReviews;