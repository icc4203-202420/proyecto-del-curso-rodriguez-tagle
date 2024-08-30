import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { PersonSearch, Campaign, Storefront, Menu, Search, SportsBar, Home } from '@mui/icons-material'

import Bars from './components/Bars';
import Beers from './components/Beers';
import Events from './components/Events';
import Users from './components/Users';
import HomePage from './components/Home';

function App() {
  const openDrawer = () => {
    /* 
    - Profile
    - Settings
    */    
  }
  const handleSearch = () => {}

  return (
    <>
      <AppBar id='top-app-bar' position='fixed' color='primary'>
        <Toolbar>
          <IconButton color='inherit' aria-label="drawer" onClick={openDrawer}>
            <Menu /* style={{ fill: 'rgba(255, 255, 255, 0.75' }}  *//>
          </IconButton>
          <IconButton color='inherit' aria-label="search" onClick={handleSearch}>
            <Search /* style={{ fill: 'rgba(255, 255, 255, 0.75' }} */ />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <AppBar id='bot-app-bar' position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" component={Link} to='/'>
            <Home style={{ fill: 'rgba(255, 255, 255, 0.75' }} />
          </IconButton>
          <IconButton color="inherit" component={Link} to='/beers'>
            <SportsBar style={{ fill: 'rgba(255, 255, 255, 0.75' }} />
          </IconButton>
          <IconButton color="inherit" component={Link} to='/bars'>
            <Storefront style={{ fill: 'rgba(255, 255, 255, 0.75' }} />
          </IconButton>
          <IconButton color="inherit" component={Link} to='/events'>
            <Campaign style={{ fill: 'rgba(255, 255, 255, 0.75' }} />
          </IconButton>
          <IconButton color="inherit" component={Link} to='/users'>
            <PersonSearch style={{ fill: 'rgba(255, 255, 255, 0.75' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bars" element={<Bars />} />
        <Route path="/beers" element={<Beers />} />
        {/* No estoy seguro de la de abajo */}
        <Route path="/bars/events" element={<Events />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default App;
