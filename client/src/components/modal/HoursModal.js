import React, { useEffect, useState } from 'react'
import Modal from "react-modal";
import dayjs from "dayjs"
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Button, TextField, Typography } from '@mui/material';
import TextareaAutosize from "@mui/base/TextareaAutosize";
import "./modal.css"
import { Textarea } from '@mui/joy'
import { TimeGrid } from 'react-big-calendar';

const HoursModal = ({ isOpen, setIsOpen , slot, event, start, end}) => {
	//Modal-FORM FUNCTION FOR CREATE AND EDIT EVENT
	// Add a state for the modal
	const [report, setReport] = useState("");
	useEffect(() => {
		console.log({ slot, event, start, end });
	}, [slot, event, start, end])
	const handleCancel = () => {
		setIsOpen(false); // Close the modal
		console.log({ slot, event, start, end });
	};
	const handleSave = () => {
		console.log({ start, end, report })
		setReport("")
	}
	//ON SELECT EVENT HANDLER FUNCTION
	const onSelecLocalizationProvidertEventHandler = (slotInfo) => {
		console.log("Select event handeler: ", slotInfo);
	};

	//HANDLE FUNCITON ON SELECT EVENT SLOT
	const onSelectEventSlotHandler = (slotInfo) => {
		console.log("Select event slot handler: ", slotInfo);
	};
	
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