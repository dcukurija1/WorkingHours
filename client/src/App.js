import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { useCookies } from "react-cookie";
import { Alert } from '@mui/material';
import { gridColumnGroupsLookupSelector } from '@mui/x-data-grid';
import post from './axios/post';
import get from './axios/get'
import deleteAxios from "./axios/delete";
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
			
			const res = await get('hours/'+userId)
			setHours(res.data)
		} catch (err) {
			setError(err.message)
		}
	}
	const addHours = async (body) => {
		try {
			const res = await post("hours/" + userId, body)
			getHours()
		} catch (err) {
			setError(err.message)
		}
	}
	const deleteHour = async (id) => {
		try {
			const res = await deleteAxios('hours/' + id);
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
