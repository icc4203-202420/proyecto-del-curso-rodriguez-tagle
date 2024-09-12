import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../api/axios';

const MapComponent = () => {
    
    const mapRef = useRef(null);
    const [bars, setBars] = useState([]);
    
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
                    center: { lat: 3.345191017812354, lng: 64.78278535070194 },
                    zoom: 1 ,
            });
            return map;
        })
        .then((map) => {
            loader.importLibrary('marker')
            .then((lib) => {
                const { AdvancedMarkerElement, PinElement } = lib;
                const markers = barsMarkers.map(( { lat, lng }, i ) => {
                    const label = labels[i % labels.length];
                    const pin = new PinElement({ glyph: label });
                    const position = { lat, lng };
                    return new AdvancedMarkerElement({
                        position,
                        content: pin.element
                    });
                });
                new MarkerClusterer({ map, markers });
            });
        });
    }, [barsMarkers]); 

    return(
    <>
        <div ref={mapRef} style={{ width: '50vw', height: '80vh' }} />
    </>
    );
};

export default MapComponent;