import React from 'react';
import Tile from './Catalog_Tile';
import './Catalog.css';

import bug1Image from '../images/bug1.png';
import bug2Image from '../images/bug2.png';
import bug3Image from '../images/bug3.png';
import bug4Image from '../images/bug4.png';

const catalogItems = [
    { id: 1, title: 'Regular Fly', description: 'A regular fly', price: 100, image: bug1Image },
    { id: 2, title: 'A wasp', description: 'Ooh, a dangerous and mean one!', price: 200, image: bug2Image },
    { id: 3, title: 'A weird bug!', description: 'Thats a burger... again', price: 499, image: bug3Image },
    { id: 4, title: 'A dude', description: 'What?', price: 2415, image: bug4Image },
];

const Catalog = () => (
    <main className="catalog">
        <header className="catalog-header">
            <h1>Catalog Page</h1>
            <div className="filters">
                <select><option>Filter 1</option></select>
                <select><option>Filter 2</option></select>
                <select><option>Filter 3</option></select>
                <button className="apply-button">Apply</button>
            </div>
            <input type="text" id="searchInput" placeholder="Search..." className="search-input" />
        </header>

        <section className="catalog-grid">
            {catalogItems.map(item => (
                <Tile key={item.id} title={item.title} description={item.description} price={item.price} image={item.image} />
            ))}
        </section>
    </main>
);

export default Catalog;