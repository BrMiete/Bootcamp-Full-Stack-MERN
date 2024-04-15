import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EditPage = (props) => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost:8000/product/" + id +"/")
            .then((response) => {
                //setProduct(response.data.product)
                setTitle(response.data.product.title)
                setPrice(response.data.product.price)
                setDescription(response.data.product.description)
            })
    }, [id])

    const updateOneProduct = () => {
        axios.put("http://localhost:8000/product/"+ id +"/edit", {
            title,
            price,
            description
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log({error: error});
            });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        updateOneProduct();
    }

    return(
        <div>
            <h2>Update a Product</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Title:</label><br />
                    <input type="text" 
                    name="title" 
                    value={title} 
                    onChange={(event) => {setTitle(event.target.value)}} />
                </p>
                <p>
                    <label>Price:</label><br />
                    <input type="number"
                    name="price"
                    value={price} 
                    onChange={(event) => {setPrice(event.target.value)}} />
                </p>
                <p>
                    <label>Description:</label><br />
                    <input type="text" 
                    name="description"
                    value={description} 
                    onChange={(event) => {setDescription(event.target.value)}} />
                </p>
                <button type="submit" onClick={handleSubmit}>Edit</button>
            </form>
            <Link to={"/product/"}>Go to Main</Link>
        </div>
    );
}

export default EditPage;