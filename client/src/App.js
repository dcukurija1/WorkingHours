import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

const users = [
	{
		id: 1,
		email: "jskeen0@goo.ne.jp",
		password: "uFWoPo",
		name: "Judah Skeen",
	},
	{
		id: 2,
		email: "mprout1@gmpg.org",
		password: "aQ4fl3J5XP",
		name: "Mellicent Prout",
	},
	{
		id: 3,
		email: "agersam2@shop-pro.jp",
		password: "UYVKpUb",
		name: "Alano Gersam",
	},
	{
		id: 4,
		email: "kaxten3@vinaora.com",
		password: "WLfW8bNr",
		name: "Kaye Axten",
	},
	{
		id: 5,
		email: "lrogeon4@linkedin.com",
		password: "6dV0T6WY4m",
		name: "Lanie Rogeon",
	},
	{
		id: 6,
		email: "ahooks5@redcross.org",
		password: "OBGl5Xe7",
		name: "Adelaida Hooks",
	},
	{ id: 7, email: "eferri6@de.vu", password: "MudArw", name: "Edita Ferri" },
	{
		id: 8,
		email: "tmacnamara7@issuu.com",
		password: "7FExUgzVvus",
		name: "Tomi MacNamara",
	},
	{
		id: 9,
		email: "ebatt8@answers.com",
		password: "siHgZGQAsJ8E",
		name: "Ermanno Batt",
	},
	{
		id: 10,
		email: "yfinn9@squarespace.com",
		password: "q54A8EtHt",
		name: "Yolane Finn",
	},
];
const hours = [
	{
		id: 1,
		date: "2/8/2022",
		duration: 4,
		report:
			"erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac",
	},
	{
		id: 2,
		date: "4/3/2023",
		duration: 3,
		report: "vivamus in felis eu sapien cursus vestibulum proin eu mi",
	},
	{
		id: 3,
		date: "12/31/2022",
		duration: 2,
		report:
			"a pede posuere nonummy integer non velit donec diam neque vestibulum",
	},
	{
		id: 4,
		date: "11/1/2022",
		duration: 6,
		report: "at velit eu est congue elementum in hac habitasse platea dictumst",
	},
	{
		id: 5,
		date: "1/15/2023",
		duration: 8,
		report:
			"neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in",
	},
	{
		id: 6,
		date: "1/3/2022",
		duration: 8,
		report:
			"erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede",
	},
	{
		id: 7,
		date: "3/16/2022",
		duration: 2,
		report:
			"ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam",
	},
	{
		id: 8,
		date: "4/5/2023",
		duration: 6,
		report:
			"malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor",
	},
	{
		id: 9,
		date: "10/3/2022",
		duration: 9,
		report:
			"ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus",
	},
	{
		id: 10,
		date: "3/19/2022",
		duration: 8,
		report:
			"vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium",
	},
];
const App = () => {
	return (
		<div className='app'>
			<Home user={users[0]} hours={hours} />
		</div>
		// <Router>
		//  	<Routes>
		//  		<Route exact path="/register" element={<Register />}/>
		//  		<Route exact path="/login" element={<Login />} />
		//  		<Route exact path="/" element={<Home />} />
		//  	</Routes>
		// </Router>
	);
}


export default App;
