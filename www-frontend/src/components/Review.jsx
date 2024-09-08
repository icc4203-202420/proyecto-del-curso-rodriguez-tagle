import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosInstance from "../api/axios";

const validationSchema = yup.object({
  // REQUERIDOS
  rating: yup.number().min(1).max(5).required('Rating is required'),
  text: yup.string().min(15).required('Review is required')
});

function ReviewForm () {
  const { beerId } = useParams();
  const apiUrl = `http://localhost:3001/api/v1/beers/${beerId}/reviews`;

  const [{ data, loading, error }] = useAxios(apiUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>

  return (
    <>
      <Formik
        initialValues={{ rating: '', text: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { validateForm }) => {
          validateForm().then(errors => {
            if (Object.keys(errors).length) {
              alert("Please fill out all required fields")
            } else {
              axiosInstance.post(`/beers/${beerId}/reviews`, { "review": values })
              .then((res) => {
                console.log(res);
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
            <label htmlFor="rating">Rating:</label>
            <Field id="rating" name="rating" type="number" />
            <ErrorMessage name="rating" component="div" />

            <label htmlFor="text">Review:</label>
            <Field id="text" name="text" />
            <ErrorMessage name="text" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <ReviewList />
    </>
  )
}

function ReviewList () {
  const { beerId } = useParams();
  const apiUrl = `http://localhost:3001/api/v1/beers/${beerId}/reviews`;

  const [{ data, loading, error }] = useAxios(apiUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>

  return (
    <ul>
      {data.reviews.map((review) => (
        <li key={review.id}>
          <p>Rating: {review.rating}</p>
          <p>Review: {review.text}</p>
        </li>
      ))}
    </ul>
  )
}

function Review () {
  return (
    <>
      <h1>Reviews</h1>
      <ReviewForm />
    </>
  )
}

export default Review;