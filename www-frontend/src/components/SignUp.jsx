import React from 'react';
import * as yup from 'yup';
import axiosInstance from '../api/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import CustomInput from '../assets/Button'

const waveBack = (
    <svg className='bg-back' id='wave-back' xmlns="http://www.w3.org/2000/svg" width="390" height="588" viewBox="0 0 390 588" preserveAspectRatio='none'>
      <path d="M0 19.2328C0 19.2328 21.1986 11.198 45.5 5.51497C59.4521 2.25218 74.4269 -0.235429 87 0.0177375C127.346 0.830135 147.164 29.3455 187.5 30.7619C226.328 32.1254 246.678 7.34625 285.5 8.98479C307 9.89223 318.555 21.4027 340 19.2328C360.323 17.1765 390 0.0177375 390 0.0177375V588H0V19.2328Z" fill="#EDB854"/>
    </svg>
  )
  
  const waveFront = (
    <svg className='bg-front' id='wave-front' xmlns="http://www.w3.org/2000/svg" width="390" height="588" viewBox="0 -40 390 588" preserveAspectRatio='none'>
      <path d="M0 18.1862C0 18.1862 21.1986 10.5886 45.5 5.21483C59.4521 2.12961 74.4269 -0.222617 87 0.0167722C127.346 0.784957 147.164 27.7484 187.5 29.0878C226.328 30.3771 246.678 6.94646 285.5 8.49582C307 9.35387 318.555 20.2379 340 18.1862C360.323 16.2418 390 0.0167722 390 0.0167722V556H0V18.1862Z" fill="#C58100"/>
    </svg>
  )

const validationSchema = yup.object({
    //REQUERIDOS
    first_name: yup.string().required('* First name is required'),
    last_name: yup.string().required('* Last name is required'),
    email: yup.string().email('Invalid email').required('* Email is required'),
    handle: yup.string().required('* Handle is required'),
    password: yup.string().min(6, 'Password too short').required('* Password is required'),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('* Password is rquired'),
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

function SignUp({ signUpHandler }) {

    return(
        <>  
            <div className='page-title'>Tapp</div>
            <div className='login-container'>
                <div className='header'>
                    Sign Up
                </div>
                <div className="content">
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
                                        signUpHandler();
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    })
                                }

                            }) 
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className='login-form'>
                                <div className="input-fields">
                                    <div className='login-input-fields'>
                                        <Field className='login-form-field' id="first_name" name="first_name" placeholder='First Name *' as={CustomInput} />
                                        <ErrorMessage className='signup-error-message' name="first_name" component="div" />
                                    </div>

                                    <div className='login-input-fields'>
                                        <Field className='login-form-field' id="last_name" name="last_name" placeholder='Last Name *' as={CustomInput} />
                                        <ErrorMessage className='signup-error-message' name="last_name" component="div" />
                                    </div>

                                    <div className='login-input-fields'>
                                        <Field className='login-form-field' id="email" name="email" type="email" placeholder='Email *' as={CustomInput} />
                                        <ErrorMessage className='signup-error-message' name="email" component="div" />
                                    </div>

                                    <div className='login-input-fields'>
                                        <Field className='login-form-field' id="handle" name="handle" placeholder='@handle *' as={CustomInput} />
                                        <ErrorMessage className='signup-error-message' name="handle" component="div" />
                                    </div>

                                    <div className='login-input-fields'>
                                        <Field className='login-form-field' id="password" name="password" type="password" placeholder='Password *' as={CustomInput} />
                                        <ErrorMessage className='signup-error-message' name="password" component="div" />
                                    </div>

                                    <div className='login-input-fields'>
                                        <Field className='login-form-field' id="password_confirmation" name="password_confirmation" type="password" placeholder='Confirm Password *' as={CustomInput} />
                                        <ErrorMessage className='signup-error-message' name="password_confirmation" component="div" />
                                    </div>

                                    <div className='login-input-fields'>
                                        <Field className='login-form-field' id="line1" name="line1" placeholder='Address ine 1' as={CustomInput} />
                                        <ErrorMessage className='signup-error-message' name="line1" component="div" />
                                    </div>

                                    <div className='login-input-fields'>
                                        <Field className='login-form-field' id="line2" name="line2" placeholder='Address ine 2' as={CustomInput} />
                                        <ErrorMessage className='signup-error-message' name="line2" component="div" />
                                    </div>

                                    <div className='login-input-fields'>
                                        <Field className='login-form-field' id="city" name="city" placeholder='City' as={CustomInput} />
                                        <ErrorMessage className='signup-error-message' name="city" component="div" />
                                    </div>
                                </div>

                                <button className='login-submit-button' type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="signup-redirect">
                    Already have an account? <Link onClick={signUpHandler} >Log in</Link>
                </div>
            </div>
            <svg className='bg' viewBox='0 0 390 558' preserveAspectRatio='none'>
                {waveBack}
                {waveFront}
            </svg>
        </>
    );
}

export default SignUp;