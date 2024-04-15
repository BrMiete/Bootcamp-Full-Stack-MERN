import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './ListAuthors.style.css';

const ListAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const sortedAuthors = authors.sort((a, b) => 
        a.name.localeCompare(b.name));
    const editPage = useNavigate();

    const getAuthors = async() => {
        await axios.get("http://localhost:8000/authors/", {
            withCredentials: true
        })
            .then((response) => {
                setAuthors(response.data.authors);
                console.log(response.data.authors)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getAuthors();
    }, [])

    const deleteAnAuthor = async(id) => {
        await axios.delete("http://localhost:8000/authors/delete/" + id)
            .then((response) => {
                console.log(response)
                getAuthors();
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const gotToEditPage = (id) => {
        editPage("/authors/edit/"+ id);
    }
    
    return(
        <div className="list-component">
            <div>
                <h2>We have quotes by:</h2>
            </div>
            <div>
                <table className="list-table">
                    <caption>
                        Authors 2024
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">Author</th>
                            <th scope="col">Actions Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAuthors.map((author, index) => 
                            <tr key={index}>
                                <th scope="row">{author.name}</th>
                                <td>
                                    <button className="edit-btn" onClick={(event) => {gotToEditPage(author._id)}}>Edit</button>
                                    <button className="delete-btn" onClick={(event) => {deleteAnAuthor(author._id)}}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListAuthors;