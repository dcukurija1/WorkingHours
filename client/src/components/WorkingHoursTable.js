import React, { useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from '@mui/material';
import './table.css';
const WorkingHoursTable = ({ hours }) => {
	const columns = [
		{ field: "date", headerName: "Date", width: 200 },
		{ field: "duration", headerName: "Hours", width: 100 },
		{ field: "report", headerName: "Report", width: 500 },
	];

	const [displayHours, setDisplayHours] = useState(hours);
	const handleInputChange = (e) => {
		const { id, value } = e.target;
		if (id === "search") {
			filter(value);
		}
	};
	const filter = (searchQuery) => {
		setDisplayHours(
			hours
				.filter(
					(hour) =>
						hour.id
							.toString()
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) ||
						hour.date
							.toString()
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) ||
						hour.length
							.toString()
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) ||
						hour.report
							.toString()
							.toLowerCase()
							.includes(searchQuery.toLowerCase())
				)
				.sort((a, b) => {
					return a.date > b.date;
				})
		);
	};

	
	return (
		<DataGrid
			columns={columns}
			rows={displayHours}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			pageSizeOptions={[5, 10, 15]}
			disableRowSelectionOnClick
		>
			<TextField
				placeholder="Search..."
				onChange={handleInputChange}
				id="search"
			/>
		</DataGrid>
	);
}

export default WorkingHoursTable