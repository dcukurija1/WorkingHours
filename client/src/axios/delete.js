import axios from "axios";
// can't use 'delete' as name as it's a keyword 
const deleteAxios = async (endpoint) => {
	return await axios.delete(process.env.BASE_URL + endpoint);
};

export default deleteAxios;
