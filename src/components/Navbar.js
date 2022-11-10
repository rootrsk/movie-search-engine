
import {Link} from 'react-router-dom'
import {useState, useEffect, React} from 'react'
import {fetchMovieByName} from '../utils/tmdbApi'
import {FaUserAlt} from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown';
import MovieListModal from './MovieListModal'

import './Navbar.css'

const Navbar = (props)=>{

    // {movie},{setMovie},{fetchHomeMovies},{setMovies}
    const [username,setUsername] = useState("");
    const [modalShow,setModalShow] = useState(false);

    const searchMovie = async()=>{
        const data = await fetchMovieByName(props.movie)
        props.setMovies(data.results)
        console.log(data)
    }
    useEffect(()=>{
        const user = localStorage.getItem('username');
        setUsername(user);
    },[username])
    // username = window.localStorage.getItem('username');

    const loginHandler = ()=>{
        //navigate to register page
        console.log("working fine")

    }
    const logoutHandler = ()=>{
        localStorage.clear();
        setUsername('');
        console.log(window.location.reload(false))
    }

    const openModal = ()=>{

    }

    // const rough = ()=>{
    //     console.log("page link is",window.location.href)
    //     console.log("page hostname is ",window.location.hostname)
    //     console.log("pathname is ",window.location.pathname)
    //     console.log("protocol is: ",window.location.protocol)
        
    // }
    return (
        <div className='header'>
                <h1>LookOut</h1>
                <div className='search-and-user'>
                    
                    <div className='search-box-container'>
                        <input 
                            type="text" 
                            className='search-input'
                            placeholder='Enter Movie Name' 
                            onChange={(e)=>{
                                props.setMovie(e.target.value)
                                if(!e.target.value){
                                    props.fetchHomeMovies()
                                }
                            }}
                            onKeyPress={(e)=>{
                                if (e.code==="Enter") searchMovie()
                            }}
                        />
                        <button className='search-button' onClick={searchMovie}>Search</button>
                    </div>
                    
                    <Dropdown className='account'>

                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <FaUserAlt/>
                        </Dropdown.Toggle>
                        {(username)?
                            (<Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">{username}</Dropdown.Item>
                                <Dropdown.Item onClick={() => setModalShow(true)}>Movie List</Dropdown.Item>
                                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                            </Dropdown.Menu>):
                            (
                                <Dropdown.Menu>
                                    <Dropdown.Item><Link to="/register" className='loginLink'>Login / Signup</Link></Dropdown.Item>
                                </Dropdown.Menu>
                            )
                        }
                        
                    
                    </Dropdown>
                    <MovieListModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    {/* <button onClick={rough}>click</button> */}

                </div>
                
            </div>
    )
}

export default Navbar