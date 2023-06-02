import React, { useState } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import HoursModal from "./modal/HoursModal"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const WorkingHoursTable = ({ hours }) => {
	moment.locale("en-GB");
	const localizer = momentLocalizer(moment);
	const [isOpen, setIsOpen] = useState(false);
	const [event, setEvent] = useState(null);
	const [slot, setSlot] = useState({});
	console.log("From calender: ");

	return (
		<div>	
		<Calendar
				views={["day", "work_week", "month"]}
				selectable
				localizer={localizer}
				defaultDate={new Date()}
				defaultView="month"
				className="calendar"
				events={hours}
				style={{
					height: "100vh",
					width: "90%",
					display: "flex",
					justifyContent: "center",
					opacity: isOpen ? 0.7 : 1
				}}
				onSelectEvent={(event) => {
					setIsOpen(true)
					setEvent(event);
				}}
				onSelectSlot={(slot) => {
					setIsOpen(true)
					setSlot(slot)
				}}

		/>
			{slot && <HoursModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				event={event}
				slot={slot}
				start={slot.start}
				end={slot.end}
			/>}
			
		{/* {openPopupForm()} */}
		</div>
		/*<DataGrid
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
		/>*/
	);
}

export default WorkingHoursTable