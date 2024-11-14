import React, { useState } from 'react';
import Tile from './Catalog_Tile';
import Filter from './Filter';
import './Catalog.css';
import './Catalog_tile.css';

import bug1Image from '../images/bug1.png';
import bug2Image from '../images/bug2.png';
import bug3Image from '../images/bug3.png';
import bug4Image from '../images/bug4.png';

export const catalogItems = [
    { id: 1, title: 'Regular Fly', description: 'A regular fly', price: 100, image: bug1Image },
    { id: 2, title: 'A wasp', description: 'Ooh, a dangerous and mean one!', price: 200, image: bug2Image },
    { id: 3, title: 'A weird bug!', description: 'Thats a burger... again', price: 499, image: bug3Image },
    { id: 4, title: 'A dude', description: 'What?', price: 2415, image: bug4Image },
];

const filtersConfig = [
    { label: 'Price Range', options: ['0-100', '101-500', '501-1000', '1000+'] },
    { label: 'Category', options: ['Fly', 'Wasp', 'Bug', 'Other'] },
];

const Catalog = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const handleFilterChange = (filterIndex, value) => {
        setSelectedFilters((prev) => ({ ...prev, [filterIndex]: value }));
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const filteredItems = catalogItems.filter((item) => {
        const normalizeText = (text) =>
            text.toLowerCase().replace(/[^a-z0-9]/g, '');

        if (searchTerm && !normalizeText(item.title).includes(normalizeText(searchTerm))) {
            return false;
        }

        if (selectedFilters[0]) {
            const price = parseInt(item.price, 10);
            const range = selectedFilters[0];
            if (range.includes('+')) {
                const min = parseInt(range.replace('+', ''), 10);
                if (price < min) {
                    return false;
                }
            } else {
                const [min, max] = range.split('-').map(Number);
                if (price < min || price > max) {
                    return false;
                }
            }
        }

        if (selectedFilters[1] && !item.title.toLowerCase().includes(selectedFilters[1].toLowerCase())) {
            return false;
        }

        return true;
    });

    return (
        <main className="catalog">
            <header className="catalog-header">
                <h1>Catalog Page</h1>
                <Filter
                    filters={filtersConfig}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </header>
            <section className="catalog-grid">
                {filteredItems.map((item) => (
                    <Tile
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </section>
        </main>
    );
};

export default Catalog;
