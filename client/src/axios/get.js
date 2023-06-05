import axios from 'axios'

const get = async (endpoint) => {
	return await axios.get(process.env.BASE_URL + endpoint)
}

export default get