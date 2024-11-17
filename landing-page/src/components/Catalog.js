import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tile from './Catalog_Tile';
import Filter from './Filter';
import './Catalog.css';
import './Catalog_tile.css';
import "./LoadingSpinner";

const Catalog = () => {
    const [catalogItems, setCatalogItems] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCatalogItems = async () => {
            setLoading(true);
            const params = {};

            if (searchTerm) params.search = searchTerm;
            if (selectedFilters[0]) params.priceRange = selectedFilters[0];
            if (selectedFilters[1]) params.category = selectedFilters[1];

            try {
                const response = await axios.get('http://localhost:5001/api/catalog', { params });
                setCatalogItems(response.data);
            } catch (error) {
                console.error('Error fetching catalog items:', error);
            } finally {
                setLoading(false);
            }
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
                    <div className="loading-spinner"></div>
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
