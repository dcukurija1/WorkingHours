import React, { useState } from "react";
import Modal from "react-modal";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Button, TextField, Typography } from "@mui/material";
import "./addmodal.css";
import { Textarea } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers";

const AddModal = ({ isOpen, setIsOpen, handleAdd }) => {
	// Add a state for the modal
	const [date, setDate ] = useState(dayjs(new Date()).$d.toISOString())
	const [duration, setDuration] = useState(0);
	const [report, setReport] = useState(""); 
	const handleCancel = () => {
		setDate(null);
		setDuration(0);
		setReport("");
		setIsOpen(false);
	}
	return (
		<Modal
			isOpen={isOpen} // Pass isOpen state to determine if the modal should be open or closed
			onRequestClose={handleCancel} // Call handleCancel when the user tries to close the modal
			contentLabel={"New entry"}
			id="addModal"
		>
			<Typography variant="h4">Add</Typography>
			<Box sx={{ display: "flex", p: 3, flexDirection: "column"}}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						defaultValue={dayjs(new Date())}
						format="MM/DD//YYYY"
						sx={{ m: 3 }}
						onChange={(e) => {
							setDate(e.$d.toISOString());
						}}
						label= "Date mm/dd/yyyy"
					/>
				</LocalizationProvider>
				<TextField
					placeholder="0"
					label="Working hours"
					type="number"
					sx={{ m: 3 }}
					onChange={(e) => setDuration(e.target.value)}
				/>
				<Textarea
					minRows={3}
					label="Report"
					placeholder="Report"
					sx={{ m: 3 }}
					onChange={(e) => setReport(e.target.value)}
				/>
			</Box>
			<Box>
				<Button
					onClick={() => {
						handleAdd({ date, duration, report })
						setIsOpen(false)
					}}
					variant="outlined"
					color="success"
					sx={{ m: 5 }}
				>
					Save
				</Button>
				<Button
					onClick={handleCancel}
					variant="outlined"
					sx={{ m: 5 }}
					color="secondary"
				>
					Cancel
				</Button>
			</Box>
		</Modal>
	);
};

export default AddModal;
