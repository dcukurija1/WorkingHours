import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import dayjs from 'dayjs';
import Auth from './pages/Auth';
import { useCookies } from "react-cookie";
import { Alert } from '@mui/material';


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
			
			const res = await fetch('http://localhost:5000/hours/14'/*+userId.toString()*/)
			const data = await res.json();
			data.map(v => {
				const newValue = {title: v.title || "Title", start: new Date(v.start_time), end: new Date(v.end_time), report: v.report}
				console.log("getHours: ",{newValue})
				setHours([...hours, newValue])
			})
			// throw new Error("something") 
		} catch (err) {

			setError(err.message)
		}
	} 

	useEffect(() => {
		getHours()
		console.log("useEffect", {hours})
	},[])
	return (
		<div className="app">
			{error && (
				<Alert color="error" severity="error" variant='filled'>
					{error}
				</Alert>
			)}
			{!authToken && <Auth />}
			{authToken && (
				<Home user={{ userId, userEmail, userName }} hours={hours} />
			)}
		</div>
	);
}


export default App;
