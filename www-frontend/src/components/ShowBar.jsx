import axiosInstance from '../api/axios';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import './ShowBar.css';

function ShowBar() {

    const { id } = useParams();
    const [ bar, setBar ] = useState([]);
    const [ events, setEvents ] = useState([]);
    const [ attendances, setAttendances ] = useState([]);
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('Tapp/Session/currentUser')));

    useEffect(() => {
        axiosInstance.get(`/bars/${id}`)
            .then((res) => {
                setBar(res.data.bar);
            })
            .catch((error) => {
                console.error('Error loading bar data:', error);
            });
    }, [id]);

    useEffect(() => {
        axiosInstance.get(`/bars/${id}/events`)
            .then((res) => {
                setEvents(res.data.events);
            })
            .catch((error) => {
                console.error('Error loading events data:', error);
            });
    }, [id, bar]);

    useEffect(() => {
        axiosInstance.get(`/users/${user.id}/attendances`)
            .then((res) => {
                setAttendances(res.data.attendances.map((attendance) => attendance.event_id));
            })
            .catch((error) => {
                console.error('Error loading attendances data:', error);
            });
    }, [user]);

    const handleAssistance = (event, id) => {
        const data = {
            user_id: user.id,
            event_id: id
        }
        axiosInstance.post(`/events/${id}/attendances`, data)
            .then((res) => {

                setAttendances([...attendances, id]);
            })
            .catch((error) => {
                console.error('Error checking in:', error);
            });
    };
    
    const isAttending = (id) => attendances.includes(id);

    function EventsList( {events} ) {
        return (
            <ul>
                {events.map((event) => {
                    <li>
                        {event.name}
                    </li>
                })}
            </ul>
        )
    }

    return(
      <div className='bar-container'>
        <div className='bar-name'>
          {bar.name}
        </div>
        <div className='bar-events-header'>
          Events:
        </div>
        <ul>
          {events.map((event) => {
            return(
              <div className="event-item">
                <li key={event.id}>
                  {event.name}
                  <button
                    onClick={(e) => handleAssistance(e, event.id)}
                    style={{
                      backgroundColor: isAttending(event.id)? '#93DC5C' :  '#FF5C5C',
                      color: 'white',
                      borderRadius: '5px',
                    }}
                  >
                    {isAttending(event.id) ? 'Attending' : 'Check in'}
                  </button>
                </li>
              </div>
            )}
          )};
        </ul>
      </div>
    )

}

export default ShowBar;