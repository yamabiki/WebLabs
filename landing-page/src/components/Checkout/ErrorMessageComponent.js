import React from 'react';
import { useField } from 'formik';

const ErrorMessageComponent = ({ name }) => {
    const [field, meta] = useField(name);

    return meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
    ) : null;
};

export default ErrorMessageComponent;
