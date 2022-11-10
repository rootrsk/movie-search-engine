import {React, useState} from 'react'
import { FaHeart } from "react-icons/fa";
import {saveInDb, removeFromDb} from '../utils/movieInDB'
import './Like.css'

const Like= (porps)=>{

    const [liked,setLike] = useState(false);

    const likeHandler = ()=>{
        setLike(p=>!p);

        if(liked){
            saveInDb();
        }
        else{
            removeFromDb();
        }
        //send data to db

    }
    return (
        <FaHeart className={`heart ${(liked)?'liked':'notLiked'}`} onClick={likeHandler}/>
    )
}

export default Like