import axiosInstance from '../api/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './ShowEvent.css'

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { day: 'numeric' });
    const month = date.toLocaleDateString('en-US', { month: 'long'});
    const hours = date.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false});
    const minutes = date.toLocaleTimeString('en-US', { minute: '2-digit'});
    return `${month} ${day}, ${hours}:${minutes}`
  }
  else {
    return 'Loading...'
  }
};

function ShowEvent() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [friends, setFriends] = useState([]);
    const [attendants, setAttendants] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [friendNames, setFriendNames] = useState([]);
    const [otherAttendees, setOtherAttendees] = useState([]);

    const user = JSON.parse(localStorage.getItem('Tapp/Session/currentUser'));
    const token = localStorage.getItem('Tapp/Session/token').replace(/['"]+/g, '').replace('Bearer ', '');

    useEffect(() => {
        axiosInstance.get(`/users`)
            .then(res => setAllUsers(res.data.users))
            .catch(error => console.error('Error loading users data:', error));
    }, [])

    useEffect(() => {
        axiosInstance.get(`/events/${id}`)
            .then(res => setEvent(res.data.event))
            .catch(error => console.error('Error loading event data:', error));
    }, [id]);

    useEffect(() => {
        axiosInstance.get(`/attendances/${id}`)
            .then(res => setAttendants(res.data.attendance))
            .catch(error => console.error('Error loading attendances data:', error));
    }, [id]);

    useEffect(() => {
        axiosInstance.get(`/users/${user.id}/friendships`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setFriends(res.data.friendships.map(friend => friend.friend_id));
        })
        .catch(error => {
            console.error('Error loading friends data:', error);
        });

    }, [token, user.id]);

    useEffect(() => {

        const friendIds = new Set(friends);
        const attendingUserIds = new Set(attendants.map(attendant => attendant.user_id));

        const filteredFriends = allUsers.filter(user => friendIds.has(user.id) && attendingUserIds.has(user.id));
        setFriendNames(filteredFriends);

        const otherAttendees = allUsers.filter(user => !friendIds.has(user.id) && attendingUserIds.has(user.id));
        setOtherAttendees(otherAttendees);

    }, [allUsers, friends, attendants]);

    const date = formatDate(event.date)

    return (
      <div className='show-event-container'>
        <div className='show-event-name'>
          {event.name}
        </div>
        <div className='show-event-date'>
          {date}
        </div>
        <div className='show-event-desc'>
          {event.description}
        </div>
        <div className="show-event-attendees">
          {friendNames.length > 0 && (
            <div className='show-event-friends'>
              <div className='show-event-friends-header'>Friends Attending:</div>
              <div className="show-event-friends-list">
                <ul>
                  {friendNames.map(friend => (
                    <li key={friend.id}>{friend.first_name} {friend.last_name} - @{friend.handle}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {otherAttendees.length > 0 && (
            <div className="show-event-other">
              <div className='show-event-other-header'>People Attending:</div>
              <div className='show-event-other-list'>
                <ul>
                    {otherAttendees.map(person => (
                      <li key={person.id}>{person.first_name} {person.last_name} - @{person.handle}</li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default ShowEvent;