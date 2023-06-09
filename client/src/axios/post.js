// import dotenv from "dotenv";
// import path from "path";
import axios from "axios";

const post = async (endpoint, body) => {
	return await axios.post(process.env.REACT_APP_BASE_URL + endpoint, body);
};

export default post;
