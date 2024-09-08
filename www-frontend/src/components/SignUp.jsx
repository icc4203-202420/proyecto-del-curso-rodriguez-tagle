import React from 'react';
import * as yup from 'yup';
import axiosInstance from '../api/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

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

const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    handle: '',
    password: '',
    password_confirmation: '',
    line1: '',
    line2: '',
    city: ''
};

function SignUp() {
    const navigation = useNavigate;

    return(
        <>  
            <h1>Sign Up</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, {validateForm}) => {
                    validateForm().then(errors => {
                        if(Object.keys(errors).length) {
                            alert("Please fill out all required fields")
                        } else {
                            axiosInstance.post('/signup', {"user": values})
                            .then((res) => {
                                console.log(res);
                                alert("User created successfully")
                                navigation('/login')
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                        }

                    }) 
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="first_name">First Name:</label>
                            <Field id="first_name" name="first_name" />
                            <ErrorMessage name="first_name" component="div" />
                        </div>

                        <div>
                            <label htmlFor="last_name">Last Name:</label>
                            <Field id="last_name" name="last_name" />
                            <ErrorMessage name="last_name" component="div" />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field id="email" name="email" type="email" />
                            <ErrorMessage name="email" component="div" />
                        </div>

                        <div>
                            <label htmlFor="handle">Handle:</label>
                            <Field id="handle" name="handle" />
                            <ErrorMessage name="handle" component="div" />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <Field id="password" name="password" type="password" />
                            <ErrorMessage name="password" component="div" />
                        </div>

                        <div>
                            <label htmlFor="password_confirmation">Confirm Password:</label>
                            <Field id="password_confirmation" name="password_confirmation" type="password" />
                            <ErrorMessage name="password_confirmation" component="div" />
                        </div>

                        <div>
                            <label htmlFor="line1">Address Line 1:</label>
                            <Field id="line1" name="line1" />
                            <ErrorMessage name="line1" component="div" />
                        </div>

                        <div>
                            <label htmlFor="line2">Address Line 2:</label>
                            <Field id="line2" name="line2" />
                            <ErrorMessage name="line2" component="div" />
                        </div>

                        <div>
                            <label htmlFor="city">City:</label>
                            <Field id="city" name="city" />
                            <ErrorMessage name="city" component="div" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default SignUp;