import {useState} from "react";
import './CreateProduct.style.css';

const CreateProduct = (props) => {
    const [data, setData] = useState({
        title: '',
        price: '',
        description: ''
    })

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createProduct(data);
        setData({
            title: '',
            price: '',
            description: ''
        });
    }
    
    return(
        <div className="product-component">
            <div>
                <h2>Create Product</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="title-product">
                    <span>Title</span>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="price-product">
                    <span>Price</span>
                    <input
                        type="number"
                        name="price"
                        value={data.price}
                        step="500"
                        min="0"
                        pattern="[0-9]*[.,]?[0-9]*"
                        onChange={handleChange}
                    />
                </div>
                <div className="description-product">
                    <span>Description</span>
                    <input
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button className="create-btn" type="submit" onClick={handleSubmit}>Create</button>
                </div>
            </form>
        </div>
    );
}

export default CreateProduct;