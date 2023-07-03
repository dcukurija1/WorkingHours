import React, { useState } from 'react'
import WorkingHoursCalendar from '../components/calendar/WorkingHoursCalendar';
import WorkingHoursTable from '../components/table/WorkingHoursTable';
import { useCookies } from 'react-cookie';
import '../index.css'
import AddModal from '../components/table/modal/AddModal'
import { Box, Button, Typography } from '@mui/material';


const Home = ({ user, hours, handleDelete, handleAdd }) => {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const [tableView, setTableView] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	
	const signOut = () => {
		removeCookie("Email");
		removeCookie("AuthToken");
		removeCookie("UserId");
		removeCookie("UserName")
		window.location.reload();
	};
	return (
		<Box
			sx={{
				m: 10,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<Typography variant="h3" align="center">
				Working hours
			</Typography>
			<Box
				sx={{
					width:"100%",
					m:3,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h6">Welcome back {user.userName}</Typography>
				<Button
					sx={{m:3}}
					color="success"
					variant="outlined"
					onClick={() => { setTableView(!tableView) }}
				>
					{tableView ? "Calendar" : "Table"}
				</Button>
				<Button
					sx={{m:3}}
					color="secondary"
					variant="outlined"
					onClick={signOut}
				>
					Sign out
				</Button>
			</Box>
			<Button
				variant="outlined"
				sx={{ ml: "83%", mb:3}}
				onClick={() => {
					setIsOpen(true)
				}}
			>
				Add +
			</Button>
			{isOpen && <AddModal isOpen={isOpen} setIsOpen={setIsOpen} handleAdd={handleAdd} />}
			{tableView && !isOpen && <WorkingHoursTable hours={hours}  handleDelete={handleDelete} />}
			{ !tableView && !isOpen && <WorkingHoursCalendar hours={hours} /> }
		</Box>
	);
}


export default Home