import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { useCookies } from "react-cookie";
import { Alert } from '@mui/material';
import { gridColumnGroupsLookupSelector } from '@mui/x-data-grid';
import post from './axios/post';


const App = () => {
	const [cookies] = useCookies(null);
	const authToken = cookies.AuthToken;
	const userEmail = cookies.Email;
	const userId = cookies.UserId;
	const userName = cookies.UserName;
	const [hours, setHours] = useState([]);
	const [error, setError] = useState(null);

	const getHours = async () => {
		try {
			
			const res = await fetch('http://localhost:5000/hours/'+userId)
			const data = await res.json();
			console.log({ data })
			setHours(data)
		} catch (err) {
			setError(err.message)
		}
	}
	const addHours = async (body) => {
		try {
			const res = await post("hours/" + userId, body)
			console.log(res)
			getHours()
		} catch (err) {
			setError(err.message)
		}
	}
	const deleteHour = async (id) => {
		console.log("uso")
		try {
			const res = await fetch('http://localhost:5000/hours/' + id,
				{
					method: 'DELETE',
					mode: 'cors'
				}
			);
			if (res.error) {
				setError(res.error)
				return
			}
			getHours()
		} catch (err) {
			setError(err.message)
		}
	}
	useEffect(() => {
		if (authToken) {
			getHours()
		}
	},[])
	return (
		<div className="app">
			{error && (
				<Alert color="warning" severity="warning" variant='filled' sx={{width: "fit-content", mt:8}}>
					{error}
				</Alert>
			)}
			{!authToken && <Auth setError={setError} />}
			{authToken && (
				<Home user={{ userId, userEmail, userName }}
					hours={hours}
					handleDelete={deleteHour}
					handleAdd={addHours}
				/>
			)}
		</div>
	);
}


export default App;
