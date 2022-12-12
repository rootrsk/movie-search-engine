
import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect, useContext, React} from 'react'

import {fetchMovieByName} from '../utils/tmdbApi'
import {FaUserAlt} from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown';
import MovieListModal from './MovieListModal'

import './Navbar.css'
import { UserContext } from '../App';

const Navbar = ({setUser,setMovies})=>{

    const Navigate = useNavigate();
    const [modalShow,setModalShow] = useState(false);
    const [searchMovie,setSearchMovie] = useState('');
    const user = useContext(UserContext)

    const searchMovies = async()=>{
        console.log(searchMovie);
        const data = await fetchMovieByName(searchMovie)
        setMovies(data)
    }
    
    

    useEffect(()=>{
    },[user])
   
    const openProfile = ()=>{
        Navigate(`/user/:${user.username}`)
    }
    
    const logoutHandler = ()=>{
        localStorage.clear();
        Navigate('/'); 
        setUser(null)
         
    }


    return (
        <div className='header'>
                <h1 className='site-title' onClick={()=>Navigate('/')}>LookOut</h1>
                <div className='search-and-user'>
                    <div className='search-box-container'>
                        <input 
                            type="text" 
                            className='search-input'
                            placeholder='Enter Movie Name' 
                            onChange={(e)=>{
                                setSearchMovie(e.target.value)
                                // if(!e.target.value){
                                //     props.fetchHomeMovies()
                                // }
                            }}
                            onKeyPress={(e)=>{
                                if (e.code==="Enter") searchMovies()
                            }}
                        />
                        <button className='search-button' onClick={searchMovies}>Search</button>
                    </div>
                    <Dropdown className='account'>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <FaUserAlt/>
                        </Dropdown.Toggle>
                        {
                            user?.username?
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>{Navigate('/')}}>Home</Dropdown.Item>
                                <Dropdown.Item onClick={openProfile}>{user?.username}</Dropdown.Item>
                                <Dropdown.Item onClick={() => setModalShow(true)}>Movie List</Dropdown.Item>
                                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                            </Dropdown.Menu>:
                            
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link to="/register" className='loginLink'>Login / Signup</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                            
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