import { useEffect, useRef, useState } from 'react'
import './Row.css'
import axios from './axios.js'

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [shows, setShows] = useState([]);
    const postersRef = useRef(null);

    const scrollPosters = (direction) => {
        const posters = postersRef.current;
        if (posters) {
            posters.scrollBy({
                left: direction * posters.clientWidth * 0.8,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setShows(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl]);

    return (
        <div className='row'>
            <h2 className='row__title'>{title}</h2>
            <div className='row__carousel'>
                <button
                    className='row__arrow row__arrow--left'
                    type='button'
                    aria-label={`Scroll ${title} left`}
                    onClick={() => scrollPosters(-1)}
                >
                    &#8249;
                </button>
                <div className='row__posters' ref={postersRef}>
                {shows.map((show) => (
                    isLargeRow && !show.poster_path ? null : !isLargeRow && !show.backdrop_path ? null : (
                    <img 
                        key={show.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`https://image.tmdb.org/t/p/original/${isLargeRow ? show.poster_path : show.backdrop_path}`}
                        alt={show.name || show.title || title}
                    />
                )))}
                </div>
                <button
                    className='row__arrow row__arrow--right'
                    type='button'
                    aria-label={`Scroll ${title} right`}
                    onClick={() => scrollPosters(1)}
                >
                    &#8250;
                </button>
            </div>
        </div>
    )
}

export default Row