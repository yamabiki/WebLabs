export const addToCart = (item) => ({
    type: 'ADD_TO_CART',
    payload: item,
});

export const updateQuantity = (id, size, quantity) => ({
    type: 'UPDATE_QUANTITY',
    payload: { id, size, quantity },
});

export const removeFromCart = (id, size) => ({
    type: 'REMOVE_FROM_CART',
    payload: { id, size },
});

export const clearCart = () => ({
    type: 'CLEAR_CART',
});