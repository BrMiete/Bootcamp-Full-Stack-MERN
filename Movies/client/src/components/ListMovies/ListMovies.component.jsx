import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './ListMovies.style.css';

const ListMovies = () => {
    const [movies, setMovies] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/movies/", {withCredentials: true})
            .then((response) => {
                setMovies(response.data.movies);
            })
            .catch((error) => {
                console.log(error.response.data.error);
                if (error.response.data.error === "Token hasn't been sent") {
                    setErrors(["You are unauthorized to see this"]);
                }
            })
    }, [])

    const calculateAverage = (reviews) => {
        let sum = 0;
        for (let i=0; i<reviews.length; i++) {
            sum += reviews[i].rating;
        }
        return (sum / reviews.length).toFixed(2);
    }

    const goToReviews = (id) => {
        navigate("/movies/" + id);
    }

    const goToWrite = (id) => {
        navigate("/movies/" + id + "/review")
    }

    const goToCreateMovie = () => {
        navigate("/movies/new");
    }
    
    return(
        <div className="list-component">
            <div className="title">
                <h2>Movie List</h2>
                <button className="create-btn" onClick={(event) => {goToCreateMovie()}}>Add a New Movie</button>
            </div>
            <div>
                <table className="list-table">
                    <caption>
                        Movie Reviews 2024
                    </caption>
                    <thead>
                        <tr className="table-titles">
                            <th scope="col">Movie Title</th>
                            <th scope="col">Avg. Rating</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie, index) => 
                            <tr key={index}>
                                <th scope="row">{movie.title}</th>
                                <td>{calculateAverage(movie.reviews)}</td>
                                <td className="list-actions">
                                    <button className="read-btn" onClick={(event) => {goToReviews(movie._id)}}>Read Reviews</button>
                                    <button className="write-btn" onClick={(event) => {goToWrite(movie._id)}}>Write a Review</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="errors">
                    {errors && errors.map((err, index) =>
                        <p key={index}>*{err}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListMovies;