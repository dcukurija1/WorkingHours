import React, { useState } from 'react'
import { DataGrid, getGridDateOperators, getGridStringOperators } from "@mui/x-data-grid";
import './table.css';
import dayjs from 'dayjs'
import quantityOnlyOperators from "../utils/filter";
import { border, borderColor } from '@mui/system';
import { Box, Button } from '@mui/material';

const WorkingHoursTable = ({ hours }) => {


	const handleEdit = (e, value) => {
		e.preventDefault()
		console.log("edit: ", value);
	}

	const handleDelete = (e, value) => {
		e.preventDefault()
		console.log("delete: ", value)
	}
	const columns = [
		{
			field: "date",
			headerName: "Date",
			
			width: 250,
			filterOperators: quantityOnlyOperators,
			renderCell: (params) => {
				const date = params.value
				return dayjs(date).format('dddd ll');
			}
		},
		{
			field: "duration", headerName: "Hours", width: 100, align: 'center',
			renderCell: (params) => {
				return params.value+'h'
			}
		},
		{ field: "report", headerName: "Report", width: 500, sortable: false },
		{	field:"none",
			headerName: "Actions", width: 300, sortable: false, editable: false,
			renderCell: (params) => {
				return <Box sx={{
					display: 'flex',
					justifyContent: 'center',
					border: 'none'
				}}>
					<Button
						size="small"
						variant='outlined'
						color='primary'
						sx={{ m: "5%" }}
						onClick={(e)=>handleEdit(e,params.row)}
					>
						Edit
					</Button>
					<Button
						size="small"
						variant='outlined'
						color='secondary'
						sx={{ m: "5%" }}
						onClick={(e) => handleDelete(e,params.row)}
					>
						Delete
					</Button>
				</Box>
			}
		},
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
			sx={{
				borderColor: "primary.light",
				"& .MuiDataGrid-withBorderColor": {
					borderColor: "primary.main",
				},
				"& .MuiDataGrid-columnHeader--withRightBorder": {
					borderColor: "primary.dark",
				},
				"& .MuiDataGrid-row--withBorderColor": {
					borderColor: "primary.main",
				},
				"& .MuiDataGrid-columnHeaders": {
					bgcolor: "primary.light",
					height: 16,
				},
				"& .MuiDataGrid-footerContainer": {
					bgcolor: "primary.light",
					height: 10,
				},
				height: "500px",
			}}
			showColumnVerticalBorder
			getRowHeight={() => "auto"}
			// density="comfortable"
			getEstimatedRowHeight={() => 10}
			pageSizeOptions={[5, 10, 15]}
			disableRowSelectionOnClick
		/>
	);
}

export default WorkingHoursTable