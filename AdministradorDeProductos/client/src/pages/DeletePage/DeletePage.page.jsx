import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const DeletePage = (props) => {
    const [product, setProduct] = useState({});
    const {id} = useParams();
    const main = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/product/" + id +"/")
            .then((response) => {
                setProduct(response.data.product)
                console.log(response.data.product)
            })
    }, [id])

    const deleteOneProduct = () => {
        axios.delete("http://localhost:8000/product/" + id +"/delete")
            .then((response) => {
                console.log(response)
                main("/product/");
            })
            .catch((error) => {
                console.log({error: error})
            })
    }

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
            <button onClick={deleteOneProduct}>Delete</button><br/>
            <Link to={"/product/"}>Go to Main</Link>
        </div>
    );
}

export default DeletePage;