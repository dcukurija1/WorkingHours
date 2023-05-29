import React from 'react'
import WorkingHoursTable from '../components/WorkingHoursTable';

import '../index.css'
import { Button } from '@mui/material';
const Home = ({ user, hours }) => {
	
	const addNewEntry = () => {
		console.log('Adding a new entry');
	}
	return (
		<div className='home'>
			<h1>Working hours</h1>
			<h2>Welcome back {user.name}</h2>
			<WorkingHoursTable hours={hours} />
			<Button
				color='primary'
				variant='contained'
				size='small'
				onClick={addNewEntry}
			>
				add new entry +
			</Button>
		</div>
	);
}


export default Home