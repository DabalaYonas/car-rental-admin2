import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import VehicleForm from "./component/VehicleForm";


async function updateCar(id, carItem) {
    return axios.put("http://127.0.0.1:8000/cars/api/" + id + "/", carItem, {headers: {'content-type': 'multipart/form-data'}}).then(response=>response.data);
}

function EditVehicle() {
    const navigate = useNavigate();
    const state = useLocation().state;
    let { selectedCar } = state;
    selectedCar = selectedCar[0];
    const currentImage = selectedCar.images;
    const [inputs, setInputs] = useState(selectedCar);
    const [imageInput, setImageInput] = useState(selectedCar.images);
  
    function handlerChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        if(name === "image") {
            setImageInput(e.target.files[0]);
        } else {
            setInputs(values => ({...values, [name]: value}));
        }
        console.log(selectedCar);
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
        if(typeof(imageInput) !== "string") {
            formData.append("images", imageInput, imageInput.name);
        }
        formData.append("price_per_day", inputs.price_per_day);

        updateCar(selectedCar.id, formData).then(response => {
            navigate("/vehicles");
        });
    }
  
    return <div>
    <h3 className="pd-v-2 pd-h-1">Edit Car</h3>
        <div className="myCard">
            <h3 className="pd-v-2 pd-h-1">Edit a Car</h3>
            <VehicleForm handleSubmit={handleSubmit} handlerChange={handlerChange} inputs={inputs} imageInput={currentImage} button="Update car"></VehicleForm>
            
        </div>
    </div>
}

export default EditVehicle;