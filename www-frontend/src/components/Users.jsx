import { TextField, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { useState, useEffect } from 'react';

/* 
TODO:
Componente(s) para la interfaz que permite buscar usuarios por su handle.
Basta la interfaz para ingresar el string de búsqueda.
No es encesario implementar llamadas a la API aún.
*/

const Users = () => {
  const apiUrl = 'http://localhost:3001/api/v1/users'
  const [{ data, loading, error }] = useAxios(apiUrl);
  const [handle, setHandle] = useState('')
  
  useEffect(() => {
    const userUrl = `http://localhost:3001/api/v1/users/${handle}`
    const fetchUser = async () => {
      const response = await axios.get(userUrl)
      
    }
    fetchUser()
    return
  }, [handle])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>


  return (
    <>
      <Typography variant="h1" color="blue" component="div">
        Users
      </Typography>
      <TextField
        id="search"
        label="User handle"
        variant='outlined'
        // value={handle}
        onChange={value => setHandle(value)}
      />
      {/* <ul>
        {data.users.map(user => (
          <li key={user.id} style={{ fontSize: 25 }}>{`${user.first_name} ${user.last_name}`}</li>
        ))}
      </ul> */}
    </>
  );
}

export default Users;