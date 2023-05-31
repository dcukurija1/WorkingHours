import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import dayjs from 'dayjs';
import Auth from './pages/Auth';
import { useCookies } from "react-cookie";


const App = () => {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const authToken = cookies.AuthToken;
	const userEmail = cookies.Email;
	const userId = cookies.UserId;
	const userName = cookies.UserName;
	const [hours, setHours] = useState([]);
	const [error, setError] = useState(null);

	const getHours = async () => {
		try {
			const res = await fetch('http://localhost:5000/hours/'+userId.toString())
			const data = await res.json();
			setHours(data);
		} catch (err) {
			setError(err)
		}
	} 

	useEffect(() => {
		getHours()
	},[])
	return (
		<div className='app'>
			{!authToken && <Auth />}
			{authToken && <Home user={{ userId, userEmail, userName }} hours={hours} />}
			{/* {error && <p>{error.map(err => <p>{err}</p>)}</p>} */}
		</div>
	);
}


export default App;
