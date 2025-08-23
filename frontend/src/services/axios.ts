import axios, {type AxiosInstance} from "axios"

const apiCaller: AxiosInstance = axios.create({
    baseURL: "https://iot-lab-week03-gy9fnsw0u-aunanawats-projects.vercel.app/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_SECRET}`
    },
})

export default apiCaller