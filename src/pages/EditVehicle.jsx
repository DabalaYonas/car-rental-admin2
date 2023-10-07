import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import VehicleForm from "./component/VehicleForm";
import { getBrands, getCategories, getColors, getEngines, getModels, getTransmissions } from "./datas/lookup";
import { getDrivers } from "./datas/drivers";


async function updateCar(id, carItem) {
    return axios.put("http://127.0.0.1:8000/cars/api/" + id + "/", carItem, {headers: {'content-type': 'multipart/form-data'}}).then(response=>response.data);
}

function EditVehicle() {
    const navigate = useNavigate();
    const state = useLocation().state;
    const { selectedData } = state ? state : {};
    var selectedCar = selectedData;
    selectedCar = selectedCar[0];
    const currentImage = selectedCar.images;
    const [inputs, setInputs] = useState(selectedCar);
    const [imageInput, setImageInput] = useState(selectedCar.images);
    
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [engines, setEngines] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [driverList, setDriverList] = useState([]);
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getBrands().then(data => {
                setBrands([]);
                setBrands(data);
            });
            
            getEngines().then(data => {
                setEngines([]);
                setEngines(data);
            });
            
            getCategories().then(data => {
                setCategories([]);
                setCategories(data);
            });

            getTransmissions().then(data => {
                setTransmissions([]);
                setTransmissions(data);
            }); 

            getDrivers().then(data => {
                setDriverList(data);
            });

            getModels().then(data => {
                setModels(data);
            });

            getColors().then(data => {
                setColors(data);
            });
        }
        return () => mounted = false;
    }, []);
  
    if (state === null) {
      return <Navigate replace to="/vehicles" />
    }
  
  
    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        if (name === "with_driver" || name === "is_available") {
            value = e.target.checked;   
        }
        
        setInputs(values => ({...values, [name]: value}));
        
    }
  
    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("name", inputs.name);
        formData.append("model_year", inputs.model_year,);
        formData.append("brand", inputs.brand);
        formData.append("model", inputs.model);
        formData.append("color", inputs.color);
        formData.append("plate_number", inputs.plate_number);
        formData.append("category", inputs.category);
        formData.append("seat_number", inputs.seat_number);
        formData.append("engine_type", inputs.engine_type);
        formData.append("transmission_type", inputs.transmission_type);
        formData.append("with_driver", inputs.with_driver);
        formData.append("is_available", inputs.is_available);
        if (inputs.with_driver) { 
            formData.append("driver", inputs.driver);   
        }
        if(typeof(imageInput) !== "string") {
            formData.append("images", imageInput, imageInput.name);
        }
        formData.append("price_per_day", inputs.price_per_day);

        updateCar(selectedCar.id, formData).then(response => {
            navigate("/cars");
        });
    }
  
    return <div>
            <VehicleForm 
            title="Edit Vehicale"
            handleSubmit={handleSubmit} 
            handleChange={handleChange} 
            inputs={inputs} 
            imageInput={setImageInput} 
            currentImage={currentImage} 
            brands={brands}
            models={models}
            colors={colors}
            categories={categories}
            engines={engines}
            transmissions={transmissions}
            drivers={driverList}
            button="Add car"></VehicleForm>

            {/* <VehicleForm handleSubmit={handleSubmit} handlerChange={handlerChange} inputs={inputs} imageInput={currentImage} button="Update car"></VehicleForm> */}
            
    </div>
}

export default EditVehicle;