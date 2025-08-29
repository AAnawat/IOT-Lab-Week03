import axios, {type AxiosInstance} from "axios"

const apiCaller: AxiosInstance = axios.create({
    baseURL: "https://iot-lab-week03.vercel.app/api",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_SECRET}`
    },
})

export default apiCaller