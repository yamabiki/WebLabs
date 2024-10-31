// src/components/Hero.js
import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <h2>Welcome to Our Service</h2>
            <p>The button below literally does nothing</p>
            <button className="cta-button">
                Get Nothing
            </button>
        </section>
    );
}

export default Hero;
