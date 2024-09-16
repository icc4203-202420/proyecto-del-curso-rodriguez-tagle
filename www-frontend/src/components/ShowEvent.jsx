import axiosInstance from '../api/axios';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

function ShowEvent() {

    const { id } = useParams();
    const [event, setEvent] = useState([]);
    const [attendants, setAttendants] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/events/${id}`)
            .then((res) => {
                console.log(res.data.event);
                setEvent(res.data.event);
            })
            .catch((error) => {
                console.error('Error loading event data:', error);
            });
    }, [id]);



    return (
        <Fragment>
            <h1>{event.name}</h1>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <p>{event.bar_id}</p>
        </Fragment>
    );
}

export default ShowEvent;