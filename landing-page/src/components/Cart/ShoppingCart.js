import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { updateQuantity, removeFromCart, clearCart } from '../Actions/action';
import './ShoppingCart.css';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();  // Hook for navigation
    const cart = useSelector((state) => state.cart);

    const handleQuantityChange = (id, size, quantity) => {
        if (quantity > 0) {
            dispatch(updateQuantity(id, size, quantity));
        }
    };

    const removeBaseUrl = (imagePath) => {
        const baseUrl = 'http://localhost:5001';
        if (imagePath && imagePath.startsWith(baseUrl)) {
            return imagePath.replace(baseUrl, '');
        }
        return imagePath;
    };

    const handleRemove = (id, size) => {
        dispatch(removeFromCart(id, size));
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear the cart?')) {
            dispatch(clearCart());
        }
    };

    const handleCheckout = () => {
        // Redirect to Checkout page
        navigate('/checkout');
    };

    const totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);

    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            <p>Total items: {cart.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
            {cart.items.length > 0 ? (
                <>
                    {cart.items.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="cart-item">
                            <div className="cart-item-image">
                                <img src={removeBaseUrl(item.img_path)} alt={item.title} />
                            </div>
                            <div className="cart-item-details">
                                <p className="cart-item-title">{item.title}</p>
                            </div>
                            <div className="quantity-controls">
                                <button onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}>+</button>
                            </div>
                            <div className="cart-item-price">
                                <p>${item.totalPrice.toFixed(2)}</p>
                            </div>
                            <button className="cart-item-remove" onClick={() => handleRemove(item.id, item.size)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total amount: ${totalAmount}</h3>
                        <button className="cart-clear" onClick={handleClearCart}>Clear Cart</button>
                        <button className="cart-checkout" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default ShoppingCart;
