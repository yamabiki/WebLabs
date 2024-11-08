import React from 'react';
import './Catalog_Tile';

const Tile = ({ title, description, price, image }) => (
    <div className="tile">
        <div className="image-placeholder">
            <img src={image} alt={title} className="bug-image" />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="price">Price: <strong>${price}</strong></p>
        <button className="view-more">View</button>
    </div>
);

export default Tile;