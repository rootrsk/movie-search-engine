import React, { useEffect } from 'react'
import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import { getApi } from '../utils/tmdbApi'
import Navbar from '../components/Navbar'

function Homepage() {

    const [movies,setMovies] = useState([])
    const [movie,setMovie] = useState('');

    const fetchHomeMovies = async ()=>{
        const data = await getApi('/')
        setMovies(data)
        console.log(data)
    }
    
    useEffect(()=>{
        fetchHomeMovies()
    },[])

    return (
        <div >
            <Navbar movie={movie} setMovie={setMovie} 
                    fetchHomeMovies={fetchHomeMovies}
                    setMovies={setMovies}/>
            
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