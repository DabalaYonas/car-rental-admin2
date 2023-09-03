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
    <div className="main-content">
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">
          <h1 className="mb-0">Add Driver</h1>
        </div>
      </nav>
      
      <div className="header pb-8 pt-5  d-flex align-items-center" style={{minHeight: "100px"}}>
      </div>
      
      <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-1 order-xl-1">
            <div className="card bg-secondary shadow">
              <div className="card-header bg-white border-0">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">Driver</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">

                <form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Driver information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-first-name">First name</label>
                          <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" name="first_name" onChange={handleChange} value={inputs.first_name} required/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-last-name">Last name</label>
                          <input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" name="last_name" onChange={handleChange} value={inputs.last_name} required/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-phone-number">Phone number</label>
                          <input type="text" id="input-phone-number" className="form-control form-control-alternative" placeholder="Phone number" name="phone_number" onChange={handleChange} value={inputs.phone_number} required/>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Email address</label>
                            <input type="email" id="input-email" className="form-control form-control-alternative" placeholder="dabo@example.com" name="email" onChange={handleChange} value={inputs.email} required/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-gender">Gender</label>
                          <select className="form-control form-control-alternative" id="input-gender" name="gender" onChange={handleChange} value={inputs.gender} required>
                            <option value="">Select a gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                            <label className="form-control-label" htmlFor="input-age">Age</label>
                            <input type="number" id="input-age" className="form-control form-control-alternative" placeholder="Age" name="age" onChange={handleChange} value={inputs.age} required/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group" >
                                <label className="form-control-label" htmlFor="input-driving-license">Driving License</label>
                                
                                <UploadView setImageInput={setImageInput}></UploadView>
                            </div>
                        </div>
                    </div> 
                    
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group" >
                                <Button value="Submit" onClick={() => {}}></Button>
                            </div>
                        </div>
                    </div>
                    
                  </div>
                  {/* <hr className="my-4" /> */}
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