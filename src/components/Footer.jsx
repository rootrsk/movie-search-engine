import {React} from 'react'
import './Footer.css'
import { FaHeart } from "react-icons/fa";
const Footer = ()=>{
    return (
        <footer>
            <p>Made with {<FaHeart/>} by <a href="https://rootrsk.vercel.app/" target="blank">Rootrsk</a> and <a href="https://swarnitsinha.github.io/myportfolio/" target="blank">Swarnit</a></p>
        </footer>
    )
}
export default Footer;