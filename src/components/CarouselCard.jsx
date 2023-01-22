import React from 'react'
import './CarouselCard.css'
const  CarouselCard = ({movie}) => {
    const imageBaseUri = 'https://image.tmdb.org/t/p/original'
    return (
        <div className='carousel-card'>
            {console.log(movie.original_title)}
            <h1 className='carousel-title'>{movie.original_name}</h1>
            <img 
                className='slider-img'
                src={imageBaseUri + movie.backdrop_path} />
        
        </div>
    )
}

export default CarouselCard