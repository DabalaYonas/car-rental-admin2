import axios from "axios";

export async function getCustomers() {
    return axios.get('http://localhost:8000/booking/customer/api/').then(response => response.data);
}

export async function getCustomer(id) {
    return axios.get('http://localhost:8000/booking/customer/api/' + id).then(response => response.data);
}