import axios from "axios";

export async function getBooks() {
    return axios.get('http://localhost:8000/booking/api/').then(response => response.data);
}

export async function getBooking(id) {
    return axios.get('http://localhost:8000/booking/api/' + id).then(response => response.data);
}

export async function getAgreements() {
    return axios.get('http://localhost:8000/booking/agreement/api/').then(response => response.data);
}