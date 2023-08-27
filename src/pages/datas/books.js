import axios from "axios";

export async function getBooks() {
    return axios.get('http://localhost:8000/booking/api/').then(response => response.data);
}