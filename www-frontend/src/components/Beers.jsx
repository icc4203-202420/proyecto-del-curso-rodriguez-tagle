import { Typography, TextField, Autocomplete } from '@mui/material';
import useAxios from 'axios-hooks';
import { useState } from 'react';

const ShowBeers = ({ data, options }) => {
  if (!options) return

  const filteredData = data.filter(beer => options.includes(beer.name))

  return (
    <ul>
      {filteredData.map(beer => (
        <li key={beer.id} style={{ fontSize: 25 }}>{beer.name}, {beer.hop}</li>
      ))}
    </ul>
  )
}

const Beer = () => {
  const apiUrl = 'http://localhost:3001/api/v1/beers'

  const [{ data, loading, error }] = useAxios(apiUrl);
  const [selectedOptions, setSelectedOptions] = useState([])
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>

  const beerNames = data.beers.map((item) => item.name);
  const uniqueBeerNames = Array.from(new Set(beerNames));

  console.log(selectedOptions)

  return (
    <>
      <Typography variant="h1" color="#C58100" component="div">
        Beers
      </Typography>
      <Autocomplete
        multiple
        limitTags={2}
        value={selectedOptions}
        onChange={(event, newValue) => { setSelectedOptions(newValue) }}
        options={uniqueBeerNames}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Search" placeholder="Beer name" />
        )}
        sx={{ width: '100%' }}
      />
      <ShowBeers data={data.beers} options={selectedOptions} />
    </>
  );
}

export default Beer;