import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { clearCart } from '../Actions/action';
import './Checkout.css';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook for navigation
    const cart = useSelector((state) => state.cart);

    // Validation schema with Yup
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .max(50, 'First name must be less than or equal to 50 characters')
            .required('First name is required'),
        lastName: Yup.string()
            .max(50, 'Last name must be less than or equal to 50 characters')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phone: Yup.string()
            .matches(/^[0-9]+$/, 'Phone number must be a valid number')
            .min(10, 'Phone number must be at least 10 digits')
            .max(15, 'Phone number can not be longer than 15 digits')
            .required('Phone number is required'),
        address: Yup.string()
            .max(100, 'Address must be less than or equal to 100 characters')
            .required('Address is required'),
    });

    // Submit form handler
    const handleSubmit = (values) => {
        // Clear the cart after successful form submission
        dispatch(clearCart());
        navigate('/success'); // Redirect to the success page
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >

                <Form className="checkout-form">
                    <label htmlFor="firstName">First Name</label>
                    <div className="form-field">

                        <Field type="text" id="firstName" name="firstName"/>
                        <ErrorMessage name="firstName" component="div" className="error-message"/>
                    </div>
                    <label htmlFor="lastName">Last Name</label>
                    <div className="form-field">

                        <Field type="text" id="lastName" name="lastName"/>
                        <ErrorMessage name="lastName" component="div" className="error-message"/>
                    </div>
                    <label htmlFor="email">Email</label>
                    <div className="form-field">

                        <Field type="email" id="email" name="email"/>
                        <ErrorMessage name="email" component="div" className="error-message"/>
                    </div>
                    <label htmlFor="phone">Phone Number</label>
                    <div className="form-field">

                        <Field type="text" id="phone" name="phone"/>
                        <ErrorMessage name="phone" component="div" className="error-message"/>
                    </div>
                    <label htmlFor="address">Address</label>
                    <div className="form-field">
                        <Field type="text" id="address" name="address"/>
                        <ErrorMessage name="address" component="div" className="error-message"/>
                    </div>

                    <div className="form-actions">
                        <button type="submit">Place Order</button>
                    </div>
                </Form>
            </Formik>

            <div className="cart-summary">
            <h3>Order Summary</h3>
                <p>Total items: {cart.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                <p>Total amount: ${cart.items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CheckoutPage;
