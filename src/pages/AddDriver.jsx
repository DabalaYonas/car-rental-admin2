import { useState } from "react";
import DriverForm from "./component/DriverForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";


async function addDriver(carItem) {
    return axios.post("http://127.0.0.1:8000/booking/api/", carItem, {headers: {'content-type': 'multipart/form-data'}}).then(response=>response.data);
}

function AddDriver() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [imageInput, setImageInput] = useState();
  
    function handlerChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        if(name === "image") {
            setImageInput(e.target.files[0]);
        } else {
            setInputs(values => ({...values, [name]: value}));
        }
    }
  
    function handleSubmit(e) {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append("first_name", inputs.first_name);
        formData.append("last_name", inputs.last_name);
        formData.append("email", inputs.email);
        formData.append("phone_number", inputs.phone_number);
        formData.append("age", inputs.age);

        addDriver(formData).then(response => {
            navigate("/drivers");
        });
    }

    return <div>
    <h3 className="pd-v-2 pd-h-1">Add Driver</h3>
        <div className="myCard">
            <h3 className="pd-v-2 pd-h-1">Add a New Driver</h3>
            <DriverForm handleSubmit={handleSubmit} handlerChange={handlerChange} inputs={inputs} button="Add driver"></DriverForm>
        </div>
    </div>
}

export default AddDriver;