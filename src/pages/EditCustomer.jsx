import "./EditDriver.css";
import Button from "./component/Button";
import UploadView from "./component/UploadView/UploadView";
import { useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

async function updateCustomer(id, customerForm) {
    return axios.put("http://127.0.0.1:8000/booking/customer/api/" + id + "/", customerForm).then(response=>response.data);
}

function EditCustomer() {
    const navigate = useNavigate();
    const state = useLocation().state;
    const { selectedData } = state ? state : {};
    let selectedCustomer = selectedData;
    selectedCustomer = selectedCustomer && selectedCustomer[0];
    const [inputs, setInputs] = useState((selectedCustomer ? selectedCustomer : {}));
    
    if (state === null) {
      return <Navigate replace to="/customers" />
    }
  
    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
  
    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("first_name", inputs.first_name);
        formData.append("last_name", inputs.last_name);
        formData.append("email", inputs.email);
        formData.append("phone_number", inputs.phone_number);
        formData.append("age", inputs.age);
        formData.append("gender", inputs.gender);

        updateCustomer(selectedCustomer.id, formData).then(response => {
            navigate("/customers");
        });
    }
    return <div>
    <div className="main-content">
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">
          <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" target="_blank">Customer profile</a>
        </div>
      </nav>
      
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: "200px", backgroundImage: "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)", backgroundSize: "cover", backgroundPosition: "center top"}}>
        <span className="mask bg-gradient-default opacity-8"></span>
      </div>
      
      <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div className="card card-profile shadow">
              <div className="row justify-content-center">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    <a href="#">
                      <img src="https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg" className="rounded-circle" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                
              </div>
              <div className="card-body ">
                <div className="row mt-md-5">
                    <h3>Customer Details: </h3>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-person mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Name <h4 className="text-muted">{selectedCustomer.first_name + " " + selectedCustomer.last_name}</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-envelope mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Email: <h4 className="text-muted">{selectedCustomer.email}</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-phone mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Mobile: <h4 className="text-muted">{selectedCustomer.phone_number}</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-calendar2-event mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Age: <h4 className="text-muted">{selectedCustomer.age}</h4></h3>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
              <div className="card-header bg-white border-0">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">Customer</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">

                <form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Customer information</h6>
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
                    
                    <div className="row"><div className="col-lg-6">
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

export default EditCustomer