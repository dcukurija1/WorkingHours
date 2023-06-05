import React, { useState } from 'react'
import moment from "moment"
import { DataGrid } from "@mui/x-data-grid";
import quantityOnlyOperators from "../../utils/filter";
import { Box, Button } from '@mui/material';
import "./table.css"
import ViewModal from './modal/ViewModal';
const WorkingHoursTable = ({ hours, handleDelete }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState({})
	const handleCancel = () => {
		setIsOpen(false)
		setData({})
	}
	const handleView = (data) => {
		setData(data)
		setIsOpen(true)
	}
	const columns = [
		{
			field: "date",
			headerName: "Date",
			width: 200,
			filterOperators: quantityOnlyOperators,
			renderCell: (params) => {
				const date = params?.value;
				return moment(date).format("dddd ll");
			},
		},
		{ field: "duration", headerName: "Hours", width: 100 },
		{ field: "report", headerName: "Report", width: 300, sortable: false },
		{
			field: "",
			headerName: "Actions",
			width: 200,
			sortable: false,
			editable: false,
			filetarle: false,
			disableColumnMenu: true,
			renderCell: (params) => (

				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						m: 2,
					}}
				>
					<Button size="small" variant="outlined" sx={{ mr: 2 }}
						color='success'
						onClick={()=>handleView(params.row)}
					>
						View
					</Button>
					<Button size="small" variant="outlined" color='secondary'
						onClick={()=>handleDelete(params.row.id)}
					>
						Delete
					</Button>
				</Box>
			),
		},
	];
	return (
		<div>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: 500
				}}
			>
				<DataGrid
					columns={columns}
					rows={hours}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					
					sx={{
						width: "fit-content",
						"& .MuiDataGrid-row:hover": {
							bgcolor: "#cfd7c7",
						},
						"& .MuiDataGrid-row": {
							bgcolor: "white",
						},
						"& .MuiDataGrid-columnHeader": {
							bgcolor: "#84c0c6",
						},
						"& .MuiDataGrid-footerCell": {
							bgcolor: "#84c0c6",
						},
						"& .MuiDataGrid-footerContainer": {
							bgcolor: "#84c0c6",
						},
					}}
					getRowHeight={() => "auto"}
					density="comfortable"
					pageSizeOptions={[5, 10, 15]}
					disableRowSelectionOnClick
				/>
			</Box>
			{isOpen && <ViewModal isOpen={isOpen} handleCancel={handleCancel} data={data}/>}
		</div>
	);
}

export default WorkingHoursTable