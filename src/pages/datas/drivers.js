
import axios from "axios";

export async function getDrivers() {
    return axios.get('http://localhost:8000/booking/driver/api/').then(response => response.data);
}