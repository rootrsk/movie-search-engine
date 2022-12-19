import React, { useContext } from 'react'
import {useState} from 'react';
import './Register.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../App';
import { useEffect } from 'react';

function Register({setUser}) {
    const [userName,setUsername] = useState("");
    const [email,setEmail] = useState("swarnitsinha@gmail.com");
	const [password,setPassword] = useState("12345");
	const [login,setLogin] = useState(true);
	const user = useContext(UserContext)
    const navigate = useNavigate();
    const navigateToHome = () => navigate(`/`)

    // const uri = process.env.REACT_APP_BACKEND_URL 
	const uri = "https://movie-search-engine-backend.vercel.app";
	const logHandler = async(e)=>{
		e.preventDefault();
		if(!email || !password) return;
		if(login){
			const result = await axios.post(uri+"/login",{email,password})
			if(!result.data.error){
				const user = {email,...result.data}
				localStorage.setItem("user",JSON.stringify(user));
				setUser(user)
			}
			else{
				alert(result.data.message);
			}
		}
		else{
			if(!userName) return;
			const result = await axios.post(uri+"/signup",{username:userName,email,password})
			// console.log(result.data);
			if(result.data.error){
				alert(result.data.message);
			}
			else{
				alert(result.data.message)
				setLogin(true);
			}
		}
	}
	useEffect(()=>{
		console.log("fetching url " ,uri);
		if(user){
			navigateToHome()
		}
	},[user])
  return (

    <div className='registerContainer'>
		<h1 className='page-heading'>Look out</h1>
		<h1 className='login-heading'>{login?"Login":"SignUp"}</h1>
		<div className='nameForm'>
			{!login && <input
				type="text"
				value={userName}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			
		}
			

			<input
				type="email"

				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>

			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button className='btn btn-primary my-2' type="submit" onClick={logHandler}>{(login)?"Sign In":"Sign Up"}</button>
			
			<button className='btn btn-primary my-2' onClick={()=>setLogin(!login)}>{login?"New User? Register here":"Already have an account?"}</button>
			{/* <div>
				<a onClick={forgotPassword}>Forgot your password?</a>
			</div> */}
		</div>
		
		{/* <div>
			<Link to={"/"}>
			<button className='btn btn-dark mt-2'>Homepage</button>
			</Link>
			
		</div> */}
    </div>
  )
}

export default Register