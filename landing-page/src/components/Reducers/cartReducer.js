const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            // Find the index of the item with the same ID and size
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id && item.size === action.payload.size
            );

            if (existingItemIndex >= 0) {
                // Clone the items array immutably
                const updatedItems = state.items.map((item, index) => {
                    if (index === existingItemIndex) {
                        // Create a new item object with updated quantity and total price
                        return {
                            ...item,
                            quantity: item.quantity + action.payload.quantity,
                            totalPrice: item.totalPrice + action.payload.totalPrice,
                        };
                    }
                    return item; // Leave other items unchanged
                });

                return {
                    ...state,
                    items: updatedItems,
                };
            }

            // Add a new item if it doesn't already exist
            return {
                ...state,
                items: [...state.items, { ...action.payload }],
            };
        }

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id && item.size === action.payload.size
                        ? { ...item, quantity: action.payload.quantity, totalPrice: item.price * action.payload.quantity }
                        : item
                ),
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(
                    (item) => !(item.id === action.payload.id && item.size === action.payload.size)
                ),
            };

        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
            };

        default:
            return state;
    }
};

export default cartReducer;