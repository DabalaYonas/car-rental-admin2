import axios from "axios";

export async function getCustomer() {
    return axios.get('http://localhost:8000/booking/customer/api/').then(response => response.data);
}