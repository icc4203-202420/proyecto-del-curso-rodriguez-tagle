import React from 'react';
import * as yup from 'yup';
import axiosInstance from '../api/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    //REQUERIDOS
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password too short').required('Required'),
});

const initialValues = {
    email: '',
    password: '',
};

function Login({ tokenHandler }) {
  const navigation = useNavigate();

    return(
      <>
        <h1>Login</h1>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {validateForm}) => {
                validateForm().then(errors => {
                    if(Object.keys(errors).length) {
                        alert("Please fill out all required fields")
                    } else {
                      axiosInstance.post('/login', {"user": values})
                      .then((res) => {
                        console.log(res.headers.authorization);
                        tokenHandler(res.headers.authorization);
                        navigation('/');
                      })
                      .catch((error) => {
                        console.error(error);
                        if (err.response && err.response.status === 401) {
                          setServerError('Invalid email or password.');
                        } else {
                          setServerError('Server error. Try again later.');
                        }
                        console.error('Form submition error:', err);
                      })
                    }
                }) 
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                      <label htmlFor="email">Email:</label>
                      <Field id="email" name="email" />
                      <ErrorMessage name="email" component="div" />
                    </div>

                    <div>
                      <label htmlFor="password">Password:</label>
                      <Field id="password" name="password" type="password" />
                      <ErrorMessage name="password" component="div" />
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

export default Login;