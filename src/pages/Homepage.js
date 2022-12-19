import React, { useContext, useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

import { MovieContext, UserContext } from '../App'

function Homepage() {
    // const [movies,setMovies] = useState(null);
    const movies = useContext(MovieContext)

    useEffect(()=>{
        console.log("xyz :  ",movies)
    },[])
    return (
        <div > 
            <div className='movies-container'>
                {
                    movies.map((movie)=>{
                        return <MovieCard movie={movie} key={movie.id}/>
                        // return <Movie key={index} ele={ele}/>
                    })
                }
            </div>
        </div>
    )
}

export default Homepage