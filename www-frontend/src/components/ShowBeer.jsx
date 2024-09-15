import axiosInstance from '../api/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Review';

import { Card, CardContent, Typography, Grid2, Box, CircularProgress, Alert, Divider } from '@mui/material';

function ShowBeer() {
    const { id } = useParams();
    const [beer, setBeer] = useState({});
    const [brand, setBrand] = useState({});
    const [brewery, setBrewery] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/beers/${id}`)
            .then((res) => {
                setBeer(res.data.beer);
                setLoading(false);
            })
            .catch((error_beers) => {
                setError('Error loading beer data');
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {        
        if (beer.brand_id) {
            axiosInstance.get(`/brands/${beer.brand_id}`)
                .then((res) => {
                    setBrand(res.data.brand);
                })
                .catch((error_brands) => {
                    setError('Error loading brand data');
                });
        }
    }, [beer]);

    useEffect(() => {
        if (brand.brewery_id) {
            axiosInstance.get(`/breweries/${brand.brewery_id}`)
                .then((res) => {
                    setBrewery(res.data.brewery);
                })
                .catch((error_breweries) => {
                    setError('Error loading brewery data');
                });
        }
    }, [brand]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Card sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {beer.name}
                </Typography>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    {brand.name}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid2 container spacing={2}>
                    <Grid2 item='true' xs={6}>
                        <Typography variant="body1"><strong>Beer Type:</strong> {beer.beer_type}</Typography>
                        <Typography variant="body1"><strong>Style:</strong> {beer.style}</Typography>
                        <Typography variant="body1"><strong>Hop:</strong> {beer.hop}</Typography>
                        <Typography variant="body1"><strong>Yeast:</strong> {beer.yeast}</Typography>
                        <Typography variant="body1"><strong>Malts:</strong> {beer.malts}</Typography>
                    </Grid2>

                    <Grid2 item='true' xs={6}>
                        <Typography variant="body1"><strong>IBU:</strong> {beer.ibu}</Typography>
                        <Typography variant="body1"><strong>Alcohol:</strong> {beer.alcohol}</Typography>
                        <Typography variant="body1"><strong>BLG:</strong> {beer.blg}</Typography>
                        <Typography variant="body1"><strong>Average Rating:</strong> {beer.avg_rating}</Typography>
                        <Typography variant="body1"><strong>Brewery:</strong> {brewery.name}</Typography>
                    </Grid2>
                </Grid2>

                <Divider sx={{ my: 2 }} />
                <Review beerId={id} />
            </CardContent>
        </Card>
    );
}

export default ShowBeer;
