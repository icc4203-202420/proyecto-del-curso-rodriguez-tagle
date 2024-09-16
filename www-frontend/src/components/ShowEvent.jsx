import axiosInstance from '../api/axios';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

function ShowEvent() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [friends, setFriends] = useState([]);
    const [attendants, setAttendants] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [friendNames, setFriendNames] = useState([]);
    const [otherAttendees, setOtherAttendees] = useState([]);

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorage.getItem('Tapp/token').replace(/['"]+/g, '').replace('Bearer ', '');

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

    return (
        <Fragment>
            <h1>{event.name}</h1>
            <p>{event.date}</p>
            <p>{event.description}</p>
            {friendNames.length > 0 && (
                <div>
                    <h2>Friends Attending:</h2>
                    <ul>
                        {friendNames.map(friend => (
                            <li key={friend.id}>{friend.first_name} {friend.last_name} - @{friend.handle}</li>
                        ))}
                    </ul>
                </div>
            )}
            {otherAttendees.length > 0 && (
                <div>
                    <h2>Other People Attending:</h2>
                    <ul>
                        {otherAttendees.map(person => (
                            <li key={person.id}>{person.first_name} {person.last_name} - @{person.handle}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Fragment>
    );
}

export default ShowEvent;