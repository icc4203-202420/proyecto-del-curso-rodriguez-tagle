import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { AppBar, Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, typographyClasses } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import AddIcon from '@mui/icons-material/Add';
// import bars from './components/Bars.jsx';

function Home() {}
function Bars() {
  return (
    <Typography>
      Hello, World!
    </Typography>
  )
}
function Events() {}
function Users() {}

function App() {
  const [beers, setBeers] = useState('Cervezas');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const beersUrl ='http://localhost:3001/api/v1/beers';

  const fetchBeers = async (url) => {
    const response = await axios.get(url);
    console.log(response.data.beers[0]);
    setBeers(response.data.beers[0].name);
    return response.data.beers[0];
  }

  function onClick() {
    fetchBeers(beersUrl);
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar>
        test
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
        keepMounted: true,
        }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon>
              {/* <HomeIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/bars" onClick={toggleDrawer}>
            <ListItemIcon>
              {/* <HomeIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Bars" />
          </ListItem>
        </List>
      </Drawer>

      <button onClick={toggleDrawer}>
        {beers}
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bars" element={<Bars />} />
        {/* No estoy seguro de la de abajo */}
        <Route path="/bars/events" element={<Events />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default App;
