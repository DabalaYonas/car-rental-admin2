import "./EditDriver.css";
import Button from "./component/Button";
import UploadView from "./component/UploadView/UploadView";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

async function updateDriver(id, driverInfo) {
    return axios.put("http://127.0.0.1:8000/booking/driver/api/" + id + "/", driverInfo, {headers: {'content-type': 'multipart/form-data'}}).then(response=>response.data);
}

function EditDriver() {
    const navigate = useNavigate();
    const state = useLocation().state;
    let { selectedDriver } = state ? state : {};
    selectedDriver = selectedDriver && selectedDriver[0];
    const driverLicense = selectedDriver ? selectedDriver.driver_license : {
        
    };
    const [inputs, setInputs] = useState((selectedDriver ? selectedDriver : {}));
    const [imageInput, setImageInput] = useState(driverLicense);
  
    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        if(name === "image") {
            setImageInput(e.target.files[0]);
        } else {
            setInputs(values => ({...values, [name]: value}));
        }
        console.log(selectedDriver);
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
        updateDriver(selectedDriver.id, formData).then(response => {
            navigate("/drivers");
        });
    }
    return <div>
    <div class="main-content">
      <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div class="container-fluid">
          <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" target="_blank">Driver profile</a>
        </div>
      </nav>
      
      <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: "200px", backgroundImage: "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)", backgroundSize: "cover", backgroundPosition: "center top"}}>
        <span class="mask bg-gradient-default opacity-8"></span>
      </div>
      
      <div class="container-fluid mt--7">
        <div class="row">
          <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div class="card card-profile shadow">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image">
                    <a href="#">
                      <img src="https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg" class="rounded-circle" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                
              </div>
              <div class="card-body ">
                <div className="row mt-md-5">
                    <h3>Driver Details: </h3>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-person mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Name <h4 className="text-muted">Dabala Yonas</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i class="bi bi-envelope mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Email: <h4 className="text-muted">dabo.yonasl@gmail.com</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i class="bi bi-phone mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Mobile: <h4 className="text-muted">+2519 102 7023</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i class="bi bi-calendar2-event mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Age: <h4 className="text-muted">20</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-person mr-2 mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Gender: <h4 className="text-muted">Male</h4></h3>
                        </div>
                    </div>
                        
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-8 order-xl-1">
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

export default EditDriver