import React, { useState } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import HoursModal from "./modal/HoursModal"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const WorkingHoursCalendar = ({ hours }) => {
	moment.locale("en-GB");
	const localizer = momentLocalizer(moment);
	const [isOpen, setIsOpen] = useState(false);
	const [event, setEvent] = useState(null);
	const [slot, setSlot] = useState({});
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
			
		</div>
		
	);
}

export default WorkingHoursCalendar