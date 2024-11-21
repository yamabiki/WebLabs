import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const fetchCatalogItems = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}/catalog`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching catalog items:', error);
        throw error;
    }
};

export const fetchItemById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/catalog/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item:', error);
        throw error;
    }
};
