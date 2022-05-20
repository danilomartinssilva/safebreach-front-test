import axios from "axios";

console.log(process.env.API_URL)
const instance = axios.create({
  baseURL:"http://192.168.3.15:3339/api/v1",
  timeout:1000  
})

export default instance;