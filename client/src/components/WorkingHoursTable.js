import React, { useState } from 'react'
import { DataGrid, getGridDateOperators, getGridStringOperators } from "@mui/x-data-grid";
import './table.css';
import dayjs from 'dayjs'
import quantityOnlyOperators from "../utils/filter";

const WorkingHoursTable = ({ hours }) => {
	
	const columns = [
		{
			field: "date",
			headerName: "Date",
			
			width: 350,
			filterOperators: quantityOnlyOperators,
			renderCell: (params) => {
				const date = params.value
				return dayjs(date).format('dddd ll');
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