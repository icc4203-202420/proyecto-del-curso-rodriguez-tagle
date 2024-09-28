import { TextField, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Users.css';
import addFriend from '../assets/AddFriend';

const ShowUsers = ({ data, option }) => {
  const filteredData = option
    ? data.filter(user => user.handle.toLowerCase().includes(option.toLowerCase()))
    : data;

  return (
    <ul className='users-list'>
      {filteredData.map(user => (
        <li key={user.id} className='users-item'>
          <div className='users-name'>{user.handle}</div> <div className='addFriend' onClick={() => console.log("Added", `${user.handle}`, "to your friend list")}>{addFriend}</div>
        </li>
      ))}
    </ul>
  );
}

const Users = () => {
  const apiUrl = 'http://localhost:3001/api/v1/users'
  const [{ data, loading, error }] = useAxios(apiUrl);
  const [selectedOption, setSelectedOption] = useState('');
  const [handle, setHandle] = useState('');

  if (loading) return <div className='axios-state-message' id='loading-message'>Loading...</div>;
  if (error) return <div className='axios-state-message' id='loading-message'>Error loading data.</div>;

  const handleInputChange = (e) => {
    setSelectedOption(e.target.value);
  }

  return (
    <div className='users-container'>
      <div className='users-title'>Users</div>

      <div className='users-content'>
        <div className='users-list-container'>
          <input
              type="text"
              className="users-search"
              placeholder="Search a @user"
              value={selectedOption}
              onChange={handleInputChange}
          />
          <ShowUsers data={data?.users || []} option={selectedOption} />
        </div>

      </div>

    </div>
  );
}

export default Users;