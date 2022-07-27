import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function MovieCard({movie}) {
    const imageBaseUri = 'https://image.tmdb.org/t/p/original'
    const imageBaseUri2 ='https://image.tmdb.org/t/p/w500'
    const navigate  = useNavigate()
    const title = movie.title? movie.title.length > 40? movie.title.substring(0,40)+'...':movie.title  :'No title'
    return (
        <div className='movie_card'>
            <p style={{paddingBottom:'5px'}}>{title}</p>
            <img 
                src={imageBaseUri2+movie.poster_path} 
                alt="poster" 
                className='poster' 
                onClick={()=>navigate(`/movie/${movie.id}`)}
            />
        </div>
    )
}

export default MovieCard