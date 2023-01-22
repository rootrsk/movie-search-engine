import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState, useEffect, createContext} from 'react'

import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register"
import Profile from "./pages/Profile";
import { getLikedMovies } from './utils/movieInDB'
import { fetchTrendingMovies, getApi } from './utils/tmdbApi'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
// import {getLikedMovies} from './utils/movieInDB';

export const MovieContext = createContext()
export const UserContext = createContext()
export const LikedMovieContext = createContext()

function App() {

	const [user,setUser] = useState(null)
	const [movies,setMovies] = useState([])
	const [trendingMovies,setTrendingMovies] = useState([]);
	const [likedMovie,setLikedMovie] = useState([])

	// const fetchHomeMovies = async ()=>{
    //     const data = await getApi()
    //     setMovies(data)
	// 	console.log(movies)

	// 	console.log(movies.length)
    // }
	const setTrends = ()=>{
		console.log("funcrtion called mov len ", movies.length)
		for(var x = 0;x<movies.length;x++){
			console.log("in the loop");
            if(movies[x].title){
				console.log("in the logic");
                x += 1;
                setTrendingMovies([...trendingMovies, movies[x] ]);
            }
            if(trendingMovies.length >= 4){
                break;
            }
        }
	}

	useEffect(()=>{
		async function fetchHomeMovies(){
			const data = await getApi()
			setMovies(data)
			console.log(movies)
	
			console.log(movies.length)
		}
		fetchHomeMovies()
		setTrends()		
		console.log("trending movies", typeof(trendingMovies)," ", trendingMovies)
		const user = localStorage.getItem('user');
		setUser(JSON.parse(user))
	},[])
	// useEffect(()=>{
    //     console.log('likedxmovies',likedMovie)
    // },[likedMovie])
	useEffect(()=>{
		console.log('user_changed',user)
		if(user){
			getLikedMovies(setLikedMovie)
			console.log('userfound')
			return
		}
		setLikedMovie([])
		console.log('user not found')
	},[user])
    return (
		<UserContext.Provider value={user}>
			<MovieContext.Provider value={movies}>
				<LikedMovieContext.Provider value={likedMovie}>
					<BrowserRouter>
						<Navbar setUser={setUser} setMovies={setMovies} />
						<Routes>
							<Route path="/" element={<Homepage  setLikedMovie={setLikedMovie}/>} />
							<Route path='/register' element={<Register setUser={setUser}/>}/>
							<Route path='/movie/:id' element={<MovieDetails />} />
							<Route path='/user/:username'  element={<Profile/>}/>
						</Routes>
						<Footer/>
					</BrowserRouter>
				</LikedMovieContext.Provider>	
			</MovieContext.Provider>
			
		</UserContext.Provider>
    )
}
export default App;
