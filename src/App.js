import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register"

function App() {
    return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path='/register' element={<Register/>}/>
				<Route path="/about" element={<About />} />
				<Route path='/movie/:id' element={<MovieDetails />} />
			</Routes>
		</BrowserRouter>
    )
}
export default App;
