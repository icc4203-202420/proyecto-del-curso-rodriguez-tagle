import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import { Link } from 'react-router-dom';
import MapComponent from './Maps';
import './Bars.css';
import { Autocomplete } from '@mui/material'; // Usaremos Autocomplete de Material UI
import TextField from '@mui/material/TextField'; // Usaremos TextField para el input

const ShowBars = ({ data, option }) => {
  const filteredData = option
    ? data.filter(bar => bar.name.includes(option))
    : data;

  return (
    <ul className="bars-list">
      {filteredData.map(bar => (
        <li key={bar.id} className="bars-item">
          <Link to={`${bar.id}`} className="bars-link">{bar.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const Bar = () => {
  const apiUrl = 'http://localhost:3001/api/v1/bars';
  const [{ data, loading, error }] = useAxios(apiUrl);
  const [selectedOption, setSelectedOption] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false);

  if (loading) return <div className="axios-state-message">Loading...</div>;
  if (error) return <div className="axios-state-message">Error loading data.</div>;

  const barNames = data?.bars?.map(item => item.name) || [];

  const toggleMap = () => {
    setIsMapVisible(!isMapVisible);
  };

  return (
    <div className="bars-container">
      <div className="bars-title">Bars</div>
      <button onClick={toggleMap} className="bars-toggle-button">
        View {isMapVisible ? 'list' : 'map'}
      </button>

      <div className="bars-content">
        {isMapVisible ? (
          <MapComponent />
        ) : (
          <div className="bars-list-container">
            <Autocomplete
              freeSolo
              options={barNames} // Lista de nombres de bares
              value={selectedOption}
              onInputChange={(event, newInputValue) => setSelectedOption(newInputValue)} // Manejar el cambio de input
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a bar"
                  className="bars-search"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <ShowBars data={data.bars} option={selectedOption} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bar;