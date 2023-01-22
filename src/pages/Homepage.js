import React, { useContext, useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

import { MovieContext, UserContext } from '../App'
import Slider from '../components/Slider'

function Homepage() {
    // const [movies,setMovies] = useState(null);
    const movies = useContext(MovieContext)
    


    // useEffect(()=>{
    //     console.log("xyz :  ",movies)
    //     console.log("dfsdf",typeof(movies))
    // },[])

    return (
        <div > 
            <div>
                <Slider/>
            </div>
            <div className='movies-container'>
                {
                    movies.map((movie)=>{
                        // console.log(movie.title)
                        return <MovieCard movie={movie} key={movie.id}/>
                        // return <Movie key={index} ele={ele}/>
                    })
                }
            </div>
        </div>
    )
}

export default Homepage