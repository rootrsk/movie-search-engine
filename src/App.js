import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState, useEffect, createContext} from 'react'

import About from "./pages/About";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register"
import Profile from "./pages/Profile";
import { getLikedMovies } from './utils/movieInDB'
import { getApi } from './utils/tmdbApi'
import Navbar from "./components/Navbar";
// import {getLikedMovies} from './utils/movieInDB';

export const MovieContext = createContext()
export const UserContext = createContext()
export const LikedMovieContext = createContext()

function App() {

	const [user,setUser] = useState(null)
	const [movies,setMovies] = useState([])
	const [likedMovie,setLikedMovie] = useState([])

	const fetchHomeMovies = async ()=>{
        const data = await getApi()
        setMovies(data)
    }

	useEffect(()=>{
		fetchHomeMovies()
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
							<Route path="/about" element={<About />} />
							<Route path='/movie/:id' element={<MovieDetails />} />
							<Route path='/user/:username'  element={<Profile/>}/>
						</Routes>
					</BrowserRouter>
				</LikedMovieContext.Provider>	
			</MovieContext.Provider>
			
		</UserContext.Provider>
    )
}
export default App;
