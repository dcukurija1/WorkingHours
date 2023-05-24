import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
	return (
		<Router>
		 	<Routes>
		 		<Route exact path="/register" element={<Register />}/>
		 		<Route exact path="/login" element={<Login />} />
		 		<Route exact path="/" element={<Home />} />
		 	</Routes>
		</Router>
	);
}


export default App;
