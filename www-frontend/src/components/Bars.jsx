import { Typography, TextField, Autocomplete, Button } from '@mui/material';
import useAxios from 'axios-hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MapComponent from './Maps';

import './Bars.css'

const ShowBars = ({ data, option }) => {
  if (!option) return (
    <ul>
      {data.map(bar => (
        <li key={bar.id}>
          <Link to={`${bar.id}`}>{bar.name}</Link>
        </li>
      ))}
    </ul>
  )

  else if (option) {
    const filteredData = data.filter(bar => option.includes(bar.name))
    
    return (
      <ul>
        {filteredData.map(bar => (
          <li key={bar.id}>
            <Link to={`${bar.id}`}>{bar.name}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

const Bar = () => {
  const apiUrl = 'http://localhost:3001/api/v1/bars'

  const [{ data, loading, error }] = useAxios(apiUrl);
  const [ selectedOption, setSelectedOption ] = useState('');
  const [ map, setMap ] = useState(false);
  
  if (loading) return <div className='axios-state-message' id='loading-message'>Loading...</div>;
  if (error) return <div className='axios-state-message' id='loading-message'>Error loading data.</div>;

  const barNames = data.bars.map((item) => item.name);

  const handleMap = () => {
    setMap(!map)
  }

  return (
    <div className='bars-container'>
      <div className="bars-title">
        <Typography variant="h1" color="#C58100" component="div">
          Bars
        </Typography>
      </div>
      <Button onClick={handleMap}>View {map ? 'list' : 'map'}</Button>
      <div className="bars-content">
        {map? (
          <MapComponent />
        ) : (
          <div className='bars-list-container'>
            <Autocomplete
              value={selectedOption}
              onChange={(event, newValue) => { setSelectedOption(newValue) }}
              options={barNames}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Search" placeholder="Bar name" />
              )}
              sx={{ width: '100%' }}
            />
            <ShowBars data={data.bars} option={selectedOption} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Bar;