import React from 'react';
import * as yup from 'yup';
import axiosInstance from '../api/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validationSchema = yup.object({
    //REQUERIDOS
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    handle: yup.string().required('Handle is required'),
    password: yup.string().min(6, 'Password too short').required('Required'),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
    //OPCIONALES
    line1: yup.string(),
    line2: yup.string(),
    city: yup.string(),
});

function SignUp() {
    return(
        <Formik
            initialValues={{ first_name: '', last_name: '', email: '', handle: '', line1: '', line2: '', city: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, {validateForm}) => {
                validateForm().then(errors => {
                    if(Object.keys(errors).length) {
                        alert("Please fill out all required fields")
                    } else {
                        alert("User created successfully")
                        axiosInstance.post('/signup', {"user": values})
                    }

                }) 
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label htmlFor="first_name">First Name:</label>
                    <Field id="first_name" name="first_name" />
                    <ErrorMessage name="first_name" component="div" />

                    <label htmlFor="last_name">Last Name:</label>
                    <Field id="last_name" name="last_name" />
                    <ErrorMessage name="last_name" component="div" />

                    <label htmlFor="email">Email:</label>
                    <Field id="email" name="email" type="email" />
                    <ErrorMessage name="email" component="div" />

                    <label htmlFor="handle">Handle:</label>
                    <Field id="handle" name="handle" />
                    <ErrorMessage name="handle" component="div" />

                    <label htmlFor="password">Password:</label>
                    <Field id="password" name="password" type="password" />
                    <ErrorMessage name="password" component="div" />

                    <label htmlFor="password_confirmation">Confirm Password:</label>
                    <Field id="password_confirmation" name="password_confirmation" type="password" />
                    <ErrorMessage name="password_confirmation" component="div" />

                    <label htmlFor="line1">Address Line 1:</label>
                    <Field id="line1" name="line1" />
                    <ErrorMessage name="line1" component="div" />

                    <label htmlFor="line2">Address Line 2:</label>
                    <Field id="line2" name="line2" />
                    <ErrorMessage name="line2" component="div" />

                    <label htmlFor="city">City:</label>
                    <Field id="city" name="city" />
                    <ErrorMessage name="city" component="div" />

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default SignUp;