import axios from "axios";


console.log('**',process.env.API_URL)
const instance = axios.create({
  baseURL:process.env.API_URL,
  timeout:1000  
})

export default instance;