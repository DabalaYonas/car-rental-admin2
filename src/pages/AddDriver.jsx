import "./EditDriver.css";
import Button from "./component/Button";
import UploadView from "./component/UploadView/UploadView";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

async function addDriver(driverInfo) {
    return axios.post("http://127.0.0.1:8000/booking/driver/api/", driverInfo, {headers: {'content-type': 'multipart/form-data'}}).then(response=>response.data);
}

function AddDriver() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [imageInput, setImageInput] = useState();
  
    function handleChange(e) {
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
        formData.append("gender", inputs.gender);
        formData.append("age", inputs.age);
        if(typeof(imageInput) !== "string") {
            formData.append("driver_license", imageInput, imageInput.name);
        }
        formData.forEach(item => {
        console.log(item);

        })
        addDriver(formData).then(response => {
            navigate("/drivers");
        });
    }
    return <div>
    <div class="main-content">
      <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div class="container-fluid">
          <h1 class="mb-0">Add Driver</h1>
        </div>
      </nav>
      
      <div class="header pb-8 pt-5  d-flex align-items-center" style={{minHeight: "100px"}}>
      </div>
      
      <div class="container-fluid mt--7">
        <div class="row">
          <div class="col-xl-1 order-xl-1">
            <div class="card bg-secondary shadow">
              <div class="card-header bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Driver</h3>
                  </div>
                </div>
              </div>
              <div class="card-body">

                <form onSubmit={handleSubmit}>
                  <h6 class="heading-small text-muted mb-4">Driver information</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-first-name">First name</label>
                          <input type="text" id="input-first-name" class="form-control form-control-alternative" placeholder="First name" name="first_name" onChange={handleChange} value={inputs.first_name} required/>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-last-name">Last name</label>
                          <input type="text" id="input-last-name" class="form-control form-control-alternative" placeholder="Last name" name="last_name" onChange={handleChange} value={inputs.last_name} required/>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-phone-number">Phone number</label>
                          <input type="text" id="input-phone-number" class="form-control form-control-alternative" placeholder="Phone number" name="phone_number" onChange={handleChange} value={inputs.phone_number} required/>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group">
                            <label class="form-control-label" for="input-email">Email address</label>
                            <input type="email" id="input-email" class="form-control form-control-alternative" placeholder="dabo@example.com" name="email" onChange={handleChange} value={inputs.email} required/>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-gender">Gender</label>
                          <select class="form-control form-control-alternative" id="input-gender" name="gender" onChange={handleChange} value={inputs.gender} required>
                            <option value="">Select a gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group">
                            <label class="form-control-label" for="input-age">Age</label>
                            <input type="number" id="input-age" class="form-control form-control-alternative" placeholder="Age" name="age" onChange={handleChange} value={inputs.age} required/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group" >
                                <label class="form-control-label" for="input-driving-license">Driving License</label>
                                
                                <UploadView setImageInput={setImageInput}></UploadView>
                            </div>
                        </div>
                    </div> 
                    
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group" >
                                <Button value="Submit" onClick={() => {}}></Button>
                            </div>
                        </div>
                    </div>
                    
                  </div>
                  {/* <hr class="my-4" /> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
}

export default AddDriver