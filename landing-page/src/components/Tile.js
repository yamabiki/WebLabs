import React from 'react';
import './Tile.css';

const Tile = ({ title, description, image }) => (
    <div className="tile">
        <div className="image-placeholder">
            <img src={image} alt={title} className="bug-image" />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
);

export default Tile;