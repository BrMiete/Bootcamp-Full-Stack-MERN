import React, {useState, useEffect} from 'react';
import CreateProduct from '../../components/CreateProduct/CreateProduct.component';
import ListProduct from '../../components/ListProduct/ListProduct.component';
import axios from 'axios';
import './MainPage.style.css';

const MainPage = (props) => {
    const[products, setProducts] = useState([]);
    
    const getProducts = () => {
        axios.get("http://localhost:8000/product/")
            .then((response) => {
                setProducts(response.data.products);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const createProduct = (data) => {
        axios.post("http://localhost:8000/product/", data)
            .then((response) => {
                console.log(response.data)
                getProducts();
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    useEffect(() => {
        getProducts();
    }, [])

    return(
        <div className='main-page'>
            <h1>Product Manager</h1>
            <div>
                <CreateProduct createProduct = {createProduct}/>
            </div>
            <div>
                <ListProduct products = {products}/>
            </div>
        </div>
    );
}

export default MainPage;