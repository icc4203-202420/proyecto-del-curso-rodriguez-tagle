import axiosInstance from '../api/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ShowBeer() {
    const { id } = useParams();
    const [beer, setBeer] = useState({});
    const [brand, setBrand] = useState({});
    const [brewery, setBrewery] = useState({});

    useEffect(() => {
        axiosInstance.get(`/beers/${id}`)
        .then((res) => {
            setBeer(res.data.beer);
        })
        .catch((error_beers) => {
            console.error(error_beers);
        })
    }, [id]);

    useEffect(() => {        
        axiosInstance.get(`/brands/${beer.brand_id}`)
        .then((res) => {
            setBrand(res.data.brand)
        })
        .catch((error_brands) => {
            console.error(error_brands)
        })
    }, [beer])

    useEffect(() => {
        axiosInstance.get(`/breweries/${brand.brewery_id}`)
        .then((res) => {
            setBrewery(res.data.brewery)
        })
        .catch((error_breweries) => {
            console.error(error_breweries)
        })
    }, [brand])

    return(
        <>
            <Link to={'reviews'}>
                <h1>{beer.name}</h1>
            </Link>
            <h3>{brand.name}</h3>
            <p>Beer Type: {beer.beer_type}</p>
            <p>Style: {beer.style}</p>
            <p>Hop: {beer.hop}</p>
            <p>Yeast: {beer.yeast}</p>
            <p>Malts: {beer.malts}</p>
            <p>IBU: {beer.ibu}</p>
            <p>Alcohol: {beer.alcohol}</p>
            <p>BLG: {beer.blg}</p>
            <p>Average Rating: {beer.avg_rating}</p>
            <p>Brewery: {brewery.name}</p>
        </>
    )
}

export default ShowBeer;