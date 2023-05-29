import React, { useState } from 'react'
import { DataGrid, getGridDateOperators, getGridStringOperators } from "@mui/x-data-grid";
import { TextField } from '@mui/material';
import './table.css';
import quantityOnlyOperators from "../utils/filter";

const WorkingHoursTable = ({ hours }) => {
	
	const columns = [
		{
			field: "date",
			headerName: "Date",
			
			width: 350,
			filterOperators: quantityOnlyOperators,
			renderCell: (params) => {
				var options = {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				};
				return params.value.format('dddd ll');
			}
		},
		{ field: "duration", headerName: "Hours", width: 100 },
		{ field: "report", headerName: "Report", width: 500, sortable: false },
	];

	
	return (
		<DataGrid
			columns={columns}
			rows={hours}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			rowHeight={80}
			pageSizeOptions={[5, 10, 15]}
			disableRowSelectionOnClick
		/>
	);
}

export default WorkingHoursTable