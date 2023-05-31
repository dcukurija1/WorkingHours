import React from 'react'
import WorkingHoursTable from '../components/WorkingHoursTable';
import { useCookies } from 'react-cookie';
import '../index.css'
import { Button } from '@mui/material';
const Home = ({ user, hours }) => {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const addNewEntry = () => {
		console.log('Adding a new entry');
	}
	 const signOut = () => {
			console.log("signout");
			removeCookie("Email");
			removeCookie("AuthToken");
			window.location.reload();
		};
	return (
		<div className="home">
			<h1>Working hours</h1>
			<h2>Welcome back {user.name}</h2>
			<Button
				sx={{
					bgcolor: "rgb(150,0,0,0.8)",
					m: "5%",
					"&:hover": {
						color: "black",
						backgroundColor: "#ccc",
					},
				}}
				color="primary"
				variant="contained"
				size="small"
				onClick={signOut}
			>
				Sign out
			</Button>
			<WorkingHoursTable hours={hours} />
			<Button
				sx={{
					bgcolor: "rgb(50,50,50)",
					m: "5%",
					"&:hover": {
						color: "black",
						backgroundColor: "#ccc",
					},
				}}
				color="primary"
				variant="contained"
				size="small"
				onClick={addNewEntry}
			>
				+
			</Button>
		</div>
	);
}


export default Home