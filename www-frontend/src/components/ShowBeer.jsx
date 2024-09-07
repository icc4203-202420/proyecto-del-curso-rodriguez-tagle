import axiosInstance from '../api/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function ShowBeer() {
    const { id } = useParams();
    const [beer, setBeer] = useState({});

    useEffect(() => {
        axiosInstance.get(`/beers/${id}`)
            .then((res) => {
                setBeer(res.data.beer);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [id]);
    console.log(beer);
    return(
        <>
            <h1>{beer.name}</h1>
            <p>Beer Type: {beer.beer_type}</p>
            <p>Style: {beer.style}</p>
            <p>Hop: {beer.hop}</p>
            <p>Yeast: {beer.yeast}</p>
            <p>Malts: {beer.malts}</p>
            <p>IBU: {beer.ibu}</p>
            <p>Alcohol: {beer.alcohol}</p>
            <p>BLG: {beer.blg}</p>
            <p>Average Rating: {beer.avg_rating}</p>
        </>
    )
}

export default ShowBeer;