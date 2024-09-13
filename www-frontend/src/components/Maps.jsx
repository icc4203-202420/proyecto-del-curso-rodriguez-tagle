import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../api/axios';

//Material UI
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const MapComponent = () => {
    
    const mapRef = useRef(null);
    const [bars, setBars] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedBar, setSelectedBar] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                },
                (error) => {
                    console.error("Error al obtener la ubicación del usuario:", error);
                }
            );
        } else {
            console.error("Geolocalización no soportada por el navegador.");
        }
    }, []);
    
    useEffect(() => {
        axiosInstance.get('/bars')
            .then((res) => {
                setBars(res.data.bars);
            })
            .catch((error) => {
                console.error('Error loading bars data:', error);
            });
    }, []);

    const barsMarkers = bars.map((bar) => {
        return { "name": bar.name, "lat": bar.latitude, "lng": bar.longitude };
    });

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        const loader = new Loader({
            apiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
            version: 'weekly',
        });
        loader
            .importLibrary('maps')
            .then((lib) => {
                const { Map } = lib;
                const map = new Map(mapRef.current, {
                    mapId: 'DEMO_MAP_ID',
                    center: selectedBar || userLocation || { lat: -33.45694, lng: -70.64827 },
                    zoom: userLocation ? 14 : 4,
            });
            return map;
        })
        .then((map) => {
            loader.importLibrary('marker').then((lib) => {
                const { AdvancedMarkerElement, PinElement } = lib;
                const markers = barsMarkers.map(({ lat, lng }, i) => {
                    const label = labels[i % labels.length];
                    const pin = new PinElement({
                            glyph: label,
                            background: "#C58100", 
                            borderColor: "#F1DCA7",
                            glyphColor: "#F1DCA7",
                        });
                    const position = { lat, lng };
                    return new AdvancedMarkerElement({
                        position,
                        content: pin.element,
                    });
                });
                new MarkerClusterer({ map, markers });

                if (userLocation) { 
                    new AdvancedMarkerElement({
                        position: userLocation,
                        map,
                        title: "Your location",
                    });
                }
            });

        });
    }, [userLocation, barsMarkers, selectedBar]); 

    const handleSelectBar = (event, value) => {
        const selectedBar = barsMarkers.find(bar => bar.name === value);
        if (selectedBar) {
            setSelectedBar(selectedBar);
        }
    };

    function FreeSolo() {
        return (
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    id="bars-list"
                    freeSolo
                    options={barsMarkers.map((option) => option.name)}
                    renderInput={(params) => (<TextField {...params} label="Search Bars" />)}
                    onInputChange={handleSelectBar}
                />
            </Stack>
        );
    };

    return(
    <>
        <FreeSolo />
        <div ref={mapRef} style={{ width: '50vw', height: '80vh' }} />
    </>
    );
};

export default MapComponent;