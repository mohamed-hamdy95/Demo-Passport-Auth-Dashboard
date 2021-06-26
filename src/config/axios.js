import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
export default axios;
