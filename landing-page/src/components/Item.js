import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { catalogItems } from './Catalog'; // Import catalogItems correctly
import './Item.css';

const Item = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = catalogItems.find((item) => item.id === parseInt(id, 10));

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <main className="product-detail">
            <div className="image-container">
                <div className="product-image">
                    <img src={item.image} alt={item.title}/>
                </div>
            </div>
            <div className="product-info">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p><strong>Price: ${item.price.toFixed(2)}</strong></p>
                <div className="product-actions">
                    <button onClick={() => navigate(-1)} className="go-back">Go back</button>
                    <button className="add-to-cart">Add to cart</button>
                </div>
            </div>
        </main>
    );
};

export default Item;
