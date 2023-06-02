import React from 'react'
import WorkingHoursTable from '../components/WorkingHoursTable';
import { useCookies } from 'react-cookie';
import '../index.css'
import { Box, Button, Typography } from '@mui/material';
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
		<Box sx={{p:10, display: "flex", flexDirection: "column", justifyContent: "center"}}>
			<Typography variant='h2' align='center'>Working hours</Typography>
			<Box sx={{p:3, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
				<Typography variant='h4'>Welcome back {user.userName}</Typography>
				<Button
					sx={{m: "5%"}}
					color="secondary"
					variant="outlined"
					onClick={signOut}
				>
					Sign out
				</Button>
			</Box>
			<WorkingHoursTable hours={hours} />
		</Box>
	);
}


export default Home