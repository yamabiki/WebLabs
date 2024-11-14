import React from 'react';
import './Catalog_tile.css';
import { Link } from 'react-router-dom';

const Tile = ({ id, title, description, price, image }) => (
    <div className="tile">
        <div className="image-placeholder">
            <img src={image} alt={title} className="bug-image" />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="price">Price: <strong>${price}</strong></p>
        <Link to={`/catalog/${id}`}>
            <button className="view-more">View more</button>
        </Link>
    </div>
);

export default Tile;
