import React from 'react'

const Home = () => {
  return (
		<div>
			<h1>Working hours</h1>
			<label>Input date: </label>
			<input type="date" />
			<label>Input working hours: </label>

			<label>From: </label>
			<input type="time" />
			<label>To: </label>
			<input type="time" />
			<label>Input short daily report</label>
			<input type="text-area" />
		</div>
	);
}

export default Home