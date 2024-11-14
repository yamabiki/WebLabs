import React from 'react';
import './Filter.css';

const Filter = ({ filters, selectedFilters, onFilterChange, onSearchChange }) => {
    return (
        <div className="filters">
            {filters.map((filter, index) => (
                <select
                    key={index}
                    value={selectedFilters[index] || ''}
                    onChange={(e) => onFilterChange(index, e.target.value)}
                >
                    <option value="">Select {filter.label}</option>
                    {filter.options.map((option, idx) => (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ))}
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
            <button className="apply-button">Apply</button>
        </div>
    );
};

export default Filter;
