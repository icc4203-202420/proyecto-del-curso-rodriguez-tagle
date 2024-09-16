import { Typography, TextField, Autocomplete } from '@mui/material';
import useAxios from 'axios-hooks';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Beers.css'
import { Fragment } from 'react';

const ShowBeers = ({ beersData, options }) => {
if (!options) {
    return (
      <ul className='beers-list'>
        {beersData.map(beer => (
          <li className='beers-list-item' key={beer.id}>
            <Link to={`${beer.id}`}>{beer.name}, {beer.brand.name}</Link>
          </li>
        ))}
      </ul>
    )
  }

  const filteredData = beersData.filter(beer => options.includes(beer.name))
  console.log(options);

  return (
    <Fragment>
      <ul className='beers-list'>
        {filteredData.map(beer => (
          <li className='beers-list-item' key={beer.id}>
            <Link to={`${beer.id}`}>{beer.name}, {beer.brand.name}</Link>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

const Beers = () => {
  const beersUrl = 'http://localhost:3001/api/v1/beers'
  const brandsUrl = 'http://localhost:3001/api/v1/brands'

  const [{ data: beersData, loading: beersLoading, error: beersError }] = useAxios(beersUrl);
  const [{ data: brandsData, loading: brandsLoading, error: brandsError }] = useAxios(brandsUrl);
  const [selectedOption, setSelectedOptions] = useState('');
  
  if (beersLoading || brandsLoading) return <div className='axios-state-message' id='loading-message'>Loading...</div>;
  if (beersError || brandsError) return <div className='axios-state-message' id='error-message'>Error loading data.</div>;

  const beersWithBrands = beersData.beers.map(beer => ({
    ...beer,
    brand: brandsData.brands.find(brand => brand.id === beer.brand_id)
  }));

  const beerNames = beersData.beers.map((item) => item.name);
  const uniqueBeerNames = Array.from(new Set(beerNames));

  return (
    <div className='beers-container'>
      <div className='beers-title'>
        <Typography variant="h1" color="#C58100" component="div">
          Beers
        </Typography>
      </div>
      <div>
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
      </div>
      <ShowBeers beersData={beersWithBrands} options={selectedOption} />
    </div>
  );
}

export default Beers;