import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Replace useHistory with useNavigate
import '../Checkout/Checkout.css';

const Success = () => {
    const navigate = useNavigate();  // Use useNavigate hook for navigation

    // Redirect back to the home page or catalog after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');  // Navigate to the home page (or catalog) after 3 seconds
        }, 3000);

        // Cleanup the timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="success">
            <h2>Success!</h2>
            <p>Your order has been placed successfully.</p>
            <p>You will be redirected to the home page shortly...</p>
        </div>
    );
};

export default Success;
