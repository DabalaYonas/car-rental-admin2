import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VehicleForm from "./component/VehicleForm";


async function addCar(carItem) {
    return axios.post("http://127.0.0.1:8000/cars/api/", carItem, {headers: {'content-type': 'multipart/form-data'}}).then(response=>response.data);
}

function AddVehicle() {
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
        formData.append("name", inputs.name);
        formData.append("model_year", inputs.model_year,);
        formData.append("brand", inputs.brand,);
        formData.append("plate_number", inputs.plate_number);
        formData.append("category", inputs.category);
        formData.append("seat_number", inputs.seat_number);
        formData.append("engine_type", inputs.engine_type);
        formData.append("transmission_type", inputs.transmission_type);
        formData.append("images", imageInput, imageInput.name);
        formData.append("price_per_day", inputs.price_per_day);

        addCar(formData).then(response => {
            navigate("/vehicles");
        });
        
    }
  
    return <div>
    <h3 className="pd-v-2 pd-h-1">Add Car</h3>
        <div className="myCard">
            <h3 className="pd-v-2 pd-h-1">Add a New Car</h3>
            <VehicleForm handleSubmit={handleSubmit} handlerChange={handlerChange} inputs={inputs} button="Add car"></VehicleForm>
            
        </div>
    </div>
}

export default AddVehicle;