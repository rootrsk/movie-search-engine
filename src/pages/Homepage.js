import React, { useEffect } from 'react'
import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import { fetchMovieByName, getApi } from '../utils/tmdbApi'

function Homepage() {
    const [movies,setMovies] = useState([])
    const [movie,setMovie] = useState('')

    const fetchHomeMovies = async ()=>{
        const data = await getApi('/')
        setMovies(data)
        console.log(data)
    }
    const searchMovie = async()=>{
        const data = await fetchMovieByName(movie)
        setMovies(data.results)
        console.log(data)
    }
    useEffect(()=>{
        fetchHomeMovies()
    },[])

    return (
        <div >
            <div className='header'>
                <h1>LookOut</h1>
                <div className='search-box-container'>
                    <input 
                        type="text" 
                        className='search-input'
                        placeholder='Enter Movie Name' 
                        onChange={(e)=>{
                            setMovie(e.target.value)
                            if(!e.target.value){
                                fetchHomeMovies()
                            }
                        }}
						onKeyPress={(e)=>{
							if (e.code==="Enter") searchMovie()
						}}
                    />
                    <button className='search-button' onClick={searchMovie}>Search</button>
                </div>
            </div>
            
            <div className='movies-container'>
                {
                    movies.map((movie)=>{
                        return <MovieCard movie={movie} key={movie.id}/>
                    })
                }
            </div>
            
        </div>
    )
}

export default Homepage