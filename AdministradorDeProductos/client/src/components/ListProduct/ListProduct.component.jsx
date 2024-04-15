import { Link } from 'react-router-dom';
import './ListProduct.style.css';

const ListProduct = (props) => {
    return(
        <div className='list-component'>
            <div>
                <h2>Product Listing</h2>
            </div>
            <div>
                <table>
                    <caption>
                        Product Listing 2024
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Price [Gs.]</th>
                            <th scope="col">Description</th>
                            <th scope="col">Link</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.products.map((product, index) => 
                            <tr key={index}>
                                <th scope="row">{product.title}</th>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td><Link to={"/product/"+ product._id}>Product Detailing</Link></td>
                                <td><Link to={"/product/"+ product._id +"/edit"}>Edit Product</Link></td>
                                <td><Link to={"/product/"+ product._id +"/delete"}>Delete Product</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListProduct;