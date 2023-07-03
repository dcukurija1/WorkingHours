import axios from 'axios'

const get = async (endpoint) => {
	return await axios.get(process.env.REACT_APP_BASE_URL + endpoint)
}

export default get