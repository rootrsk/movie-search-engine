import React, { useState } from 'react'
import { useEffect } from 'react';
import CarouselCard from './CarouselCard';
import { MovieContext } from '../App'
import './Slider.css'
import { useContext } from 'react';
import { AcroFormRadioButton } from 'jspdf';

const Slider = ()=> {
	const movies = useContext(MovieContext)

  	const [sliderMovies, setSliderMovies] = useState([]);
  
//   const imageBaseUri2 ='https://image.tmdb.org/t/p/w500'
  
//functions for sliding left and right
	let box = document.querySelector('.slider')
	const leftSlide = ()=>{
		let width = box.clientWidth;
		box.scrollLeft = box.scrollLeft -width;
	}
	const rightSlide = ()=>{
		let width = box.clientWidth;
		box.scrollLeft = box.scrollLeft + width;
	}

  useEffect(()=>{
    console.log(movies);
	// movies.map((mov)=>{
	// 	setSliderMovies(sliderMovies => [mov, ...sliderMovies]);
	// 	console.log(mov.title, sliderMovies);
	// })
    for(let x = 0; x<movies.length; x = x+1){
		if(movies[x].title){
			// setSliderMovies([...sliderMovies, movies[x]]);
			setSliderMovies(sliderMovies => [...sliderMovies,movies[x]]);
			console.log(movies[x] , sliderMovies)
		}
		if(sliderMovies.length == 4) break;
    }
    console.log(sliderMovies)
  },[movies]);

  useEffect(()=>{
	async function test(){
		await setTimeout(console.log("slow",sliderMovies),3000)
	}
	test();
		// console.log(sliderMovies);
  },[movies,sliderMovies]);

  return (
    <div className='slider'>
		<button 
			className='leftArrow'
			onClick={leftSlide}
		>
			<p>&lt;</p>
			{/* {String.fromCharCode(8592)} */}
		</button>
		<button 
			className='rightArrow'
			onClick={rightSlide}
		>
			<p>&gt;</p>
		</button>

		<div className='slider-card'>
			{
				
				sliderMovies.map((sliderMovie)=>{
					return (
						<CarouselCard movie={sliderMovie}/>
					)
				})
			}
		</div>

        
    </div>
  )
}

export default Slider

{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, rerum harum esse blanditiis dignissimos fuga aliquam, possimus tempora porro ea voluptates accusamus asperiores expedita sint quibusdam laudantium! Maxime, ducimus tempore!</p>
		{sliderMovies.length} */}