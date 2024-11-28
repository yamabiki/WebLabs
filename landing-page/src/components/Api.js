import axios from 'axios';

export const fetchCatalogItems = async (params = {}) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/catalog`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching catalog items:', error);
        throw error;
    }
};

export const fetchItemById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/catalog/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item:', error);
        throw error;
    }
};
