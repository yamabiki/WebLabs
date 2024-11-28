import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {fetchCatalogItems, fetchItemById} from './Api'; // Імпорт функції
import './Item.css';
import LoadingSpinner from './LoadingSpinner';
import { useDispatch } from 'react-redux';
import { addToCart } from './Actions/action';

const Item = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getItem = async () => {
            setLoading(true);
            try {
                const data = await fetchItemById(id);
                setItem(data);
                setTotalPrice(data.price); // Встановлення початкової ціни
            } catch (err) {
                setError('Failed to fetch item');
            } finally {
                setLoading(false);
            }
        };

        getItem();
    }, [id]);

    useEffect(() => {
        if (item) {
            setTotalPrice(item.price * quantity);
        }
    }, [quantity, item]);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(99, Number(e.target.value)));
        setQuantity(value);
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: item.id,
            title: item.title,
            img_path: item.image,
            price: item.price,
            quantity,
            totalPrice,
        };
        dispatch(addToCart(cartItem));
        alert(`Added ${quantity} of "${item.title}" to the cart. Total: $${totalPrice.toFixed(2)}`);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <main className="product-detail">
            <div className="image-container">
                <div className="product-image">
                    <img src={item.image} alt={item.title} />
                </div>
            </div>
            <div className="product-info">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p><strong>Price: ${totalPrice.toFixed(2)}</strong></p>
                <div className="field">
                    <label>Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        max="99"
                    />
                </div>
                <div className="product-actions">
                    <button onClick={() => navigate(-1)} className="go-back">Go back</button>
                    <button onClick={handleAddToCart} className="add-to-cart">Add to cart</button>
                </div>
            </div>
        </main>
    );
};

export default Item;
