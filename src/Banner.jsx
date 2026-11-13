import { useState, useEffect } from 'react';
import axios from './axios';
import requests from './Requests';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]
            );
            return request;
        }
        fetchData();
    }, []);


    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }

    return (
    <header
        className="banner"
        style={{
            backgroundImage: movie?.backdrop_path
                ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
                : undefined,
        }}
    >
        <div className="banner__contents">
            <h1 className="banner__title">{movie?.name || movie?.original_name || movie?.title}</h1>
            <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>

            <p className="banner__description">
                {truncate(movie?.overview, 150)}
            </p>
        </div>

    </header>
  )
}

export default Banner