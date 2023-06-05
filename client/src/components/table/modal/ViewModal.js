import React, { useState } from "react";
import Modal from "react-modal";
import { Box, Button, Typography } from "@mui/material";
import moment from 'moment'
import './viewmodal.css'
const ViewModal = ({ isOpen,handleCancel, data }) => {
	const date = moment(data.date).format("dddd ll");
	return (
		<Modal
			isOpen={isOpen} // Pass isOpen state to determine if the modal should be open or closed
			onRequestClose={handleCancel} // Call handleCancel when the user tries to close the modal
			contentLabel={"New entry"}
			id="viewModal"
		>
			<Typography variant="h5">{date}</Typography>
			<Box
				sx={{
					display: "flex",
					m: 3,
					flexDirection: "column",
					width: "50%",
				}}
			>
				<Typography sx={{ m:1 }}>Duration: {data.duration}h</Typography>
				<Typography sx={{ m:1 }}>Report: <br/>{data.report}</Typography>
			</Box>
			<Box>
				<Button onClick={handleCancel} variant="contained" sx={{ m: 5 }}>
					Cancel
				</Button>
			</Box>
		</Modal>
	);
};

export default ViewModal;
