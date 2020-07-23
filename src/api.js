import axios from 'axios'

export default axios.create({
    baseURL: window._env_.REACT_APP_API_URL || process.env.REACT_APP_API_URL
})