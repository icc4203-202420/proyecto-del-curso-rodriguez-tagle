/* eslint-disable react/prop-types */
import { Typography, TextField, Autocomplete } from '@mui/material';
import useAxios from 'axios-hooks';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ShowBeers = ({ data, options }) => {
  if (!options) return

  const filteredData = data.filter(beer => options.includes(beer.name))

  return (
    <ul>
      {filteredData.map(beer => (
        <li key={beer.id} style={{ fontSize: 25 }}>
          <Link to={`${beer.id}`}>{beer.name}, {beer.hop}</Link>
        </li>
      ))}
    </ul>
  )
}

const Beer = () => {
  const apiUrl = 'http://localhost:3001/api/v1/beers'

  const [{ data, loading, error }] = useAxios(apiUrl);
  const [selectedOption, setSelectedOptions] = useState('')
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>

  const beerNames = data.beers.map((item) => item.name);
  const uniqueBeerNames = Array.from(new Set(beerNames));

  return (
    <>
      <Typography variant="h1" color="#C58100" component="div">
        Beers
      </Typography>
      <Autocomplete
        value={selectedOption}
        onChange={(event, newValue) => { setSelectedOptions(newValue) }}
        options={uniqueBeerNames}
        getOptionLabel={(option) =>  option}
        renderInput={(params) => (
          <TextField {...params} label="Search" placeholder="Beer name" />
        )}
        sx={{ width: '100%' }}
      />
      <ShowBeers data={data.beers} options={selectedOption} />
    </>
  );
}

export default Beer;