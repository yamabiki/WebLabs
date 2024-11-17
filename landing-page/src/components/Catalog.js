import React, { useState, useEffect } from 'react';
import Tile from './Catalog_Tile';
import Filter from './Filter';
import './Catalog.css';
import './Catalog_tile.css';
import "./LoadingSpinner";

const Catalog = () => {
    const [catalogItems, setCatalogItems] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);  // New state for loading

    useEffect(() => {
        const fetchCatalogItems = async () => {
            setLoading(true);  // Set loading to true before fetching data
            const params = new URLSearchParams();

            if (searchTerm) params.append('search', searchTerm);
            if (selectedFilters[0]) params.append('priceRange', selectedFilters[0]);
            if (selectedFilters[1]) params.append('category', selectedFilters[1]);

            const response = await fetch(`http://localhost:5001/api/catalog?${params}`);
            const data = await response.json();
            setCatalogItems(data);
            setLoading(false);
        };

        fetchCatalogItems();
    }, [selectedFilters, searchTerm]);

    const handleFilterChange = (filterIndex, value) => {
        setSelectedFilters((prev) => ({ ...prev, [filterIndex]: value }));
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    return (
        <main className="catalog">
            <header className="catalog-header">
                <h1>Catalog Page</h1>
                <Filter
                    filters={[
                        { label: 'Price Range', options: ['0-100', '101-500', '501-1000', '1000+'] },
                        { label: 'Category', options: ['Fly', 'Wasp', 'Bug', 'Other'] },
                    ]}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </header>
            <section className="catalog-grid">
                {loading ? (
                    <div className="loading-spinner"></div>  // Display loading circle when loading
                ) : (
                    catalogItems.map((item) => (
                        <Tile
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            image={`http://localhost:5001${item.image}`}
                        />
                    ))
                )}
            </section>
        </main>
    );
};

export default Catalog;
