import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import './DetailPage.style.css';

const DetailPage = (props) => {
    const [product, setProduct] = useState({});
    const {id} = useParams();

    

    useEffect(() => {
        axios.get("http://localhost:8000/product/" + id +"/")
            .then((response) => {
                setProduct(response.data.product)
                console.log(response.data.product)
            })
    }, [id])

    return(
        <div>
            <div>
                <h2>Product Detailing</h2>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Title:</th>
                        <td>{product.title}</td>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <td>{product.price}</td>
                    </tr>
                    <tr>
                        <th>Description:</th>
                        <td>{product.description}</td>
                    </tr>
                </tbody>
            </table>
            <Link to={"/product/"}>Go to Main</Link>
        </div>
    );
}

export default DetailPage;