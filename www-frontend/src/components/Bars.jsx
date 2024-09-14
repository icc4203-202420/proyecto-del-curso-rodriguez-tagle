import { Typography, TextField, Autocomplete } from '@mui/material';
import useAxios from 'axios-hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MapComponent from './Maps';

const ShowBars = ({ data, options }) => {
  if (!options) return

  const filteredData = data.filter(bar => options.includes(bar.name))

  return (
    <ul>
      {filteredData.map(bar => (
        <li key={bar.id} style={{ fontSize: 25 }}>
          <Link to={`${bar.id}`}>{bar.name}</Link>
        </li>
      ))}
    </ul>
  )
}

const Bar = () => {
  const apiUrl = 'http://localhost:3001/api/v1/bars'

  const [{ data, loading, error }] = useAxios(apiUrl);
  const [selectedOptions, setSelectedOptions] = useState([])
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>

  const barNames = data.bars.map((item) => item.name);

  return (
    <>
      <Typography variant="h1" color="#C58100" component="div">
        Bars
      </Typography>
      <Autocomplete
        multiple
        limitTags={2}
        value={selectedOptions}
        onChange={(event, newValue) => { setSelectedOptions(newValue) }}
        options={barNames}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Search" placeholder="Bar name" />
        )}
        sx={{ width: '100%' }}
      />
      <ShowBars data={data.bars} options={selectedOptions} />

      <MapComponent />

    </>
  );
}

export default Bar;