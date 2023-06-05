import React, { useState } from 'react'
import Modal from "react-modal";
import dayjs from "dayjs"
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Button, TextField, Typography } from '@mui/material';
import "./modal.css"
import { Textarea } from '@mui/joy'

const HoursModal = ({ isOpen, setIsOpen , slot, event, start, end}) => {
	//Modal-FORM FUNCTION FOR CREATE AND EDIT EVENT
	// Add a state for the modal
	const [report, setReport] = useState("");

	const handleCancel = () => {
		setIsOpen(false); // Close the modal

	};
	const handleSave = () => {

		setReport("")
	}

	
	return (
		<Modal
			isOpen={isOpen} // Pass isOpen state to determine if the modal should be open or closed
			onRequestClose={handleCancel} // Call handleCancel when the user tries to close the modal
			contentLabel={"New entry"}
		>
			<Typography variant="h4">New Entry</Typography>
			<Box sx={{ display: "flex", p: 3, flexDirection: "column", bg: "red" }}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<label htmlFor="checkIn">Check In: </label>
					<TimePicker
						id="checkIn"
						defaultValue={dayjs(start)}
						format="HH:mm"
						ampm={false}
						sx={{ m: 3 }}
						onChange={(e) => (start = e.$d)}
					/>
					<label htmlFor="checkOut">Check Out: </label>
					<TimePicker
						id="checkOut"
						defaultValue={dayjs(end)}
						format="HH:mm"
						ampm={false}
						sx={{ m: 3 }}
						onChange={(e) => { end = e.$d }}
					/>
				</LocalizationProvider>
				<Textarea
					minRows={3}
					placeholder="report"
					sx={{ m: 3 }}
					onChange={(e) => setReport(e.target.value)}
				/>
			</Box>
			<Box>
				<Button
					onClick={handleSave}
					variant="contained"
					color="success"
					sx={{ m: 5 }}
				>
					Save
				</Button>
				<Button onClick={handleCancel} variant="contained" sx={{ m: 5 }}>
					Cancel
				</Button>
			</Box>
		</Modal>
	);
}

export default HoursModal