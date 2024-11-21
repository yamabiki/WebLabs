import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItemById } from './Api'; // Імпорт функції
import './Item.css';
import LoadingSpinner from './LoadingSpinner';

const Item = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getItem = async () => {
            setLoading(true);
            try {
                const data = await fetchItemById(id);
                setItem(data);
            } catch (err) {
                setError('Failed to fetch item');
            } finally {
                setLoading(false);
            }
        };

        getItem();
    }, [id]);

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
