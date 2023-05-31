import React from 'react'
import WorkingHoursTable from '../components/WorkingHoursTable';
import { useCookies } from 'react-cookie';
import '../index.css'
import { Button, Typography } from '@mui/material';
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
			<Typography variant='h2' align='center'>Working hours</Typography>
			<div className='user-div'>
				<Typography variant='h4'>Welcome back {user.userName}</Typography>
				<Button
					sx={{
						// bgcolor: "rgb(150,0,0,0.8)",
						m: "5%",
						// "&:hover": {
						// 	color: "black",
						// 	backgroundColor: "#ccc",
						// },
					}}
					color="secondary"
					variant="outlined"
					//size="small"
					onClick={signOut}
				>
					Sign out
				</Button>
			</div>
			<WorkingHoursTable hours={hours} />
			<Button
				sx={{
					m: "5%",
				}}
				color="primary"
				variant="outlined"
				//size="small"
				onClick={addNewEntry}
			>
				Add New +
			</Button>
		</div>
	);
}


export default Home