import axiosInstance from '../api/axios';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

function ShowBar() {

    const { id } = useParams();
    const [bar, setBar] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/bars/${id}`)
            .then((res) => {
                console.log(res.data.bar);
                setBar(res.data.bar);
            })
            .catch((error) => {
                console.error('Error loading bar data:', error);
            });
    }, [id]);

    useEffect(() => {
        axiosInstance.get(`/bars/${id}/events`)
            .then((res) => {
                console.log(res.data.events);
                setEvents(res.data.events);
            })
            .catch((error) => {
                console.error('Error loading events data:', error);
            });
    }, [id, bar]);

    return(
        <Fragment>
            <h1>{bar.name}</h1>
            <h2>Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        {event.name}
                        <button>Check in</button>
                    </li>
                ))}
            </ul>
        </Fragment>
    )

}

export default ShowBar;