import Button from "./component/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { getDrivers } from "./datas/drivers";
import { getCars } from "./datas/cars";
import { getCustomers } from "./datas/customer";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

async function updateBooking(id, bookingForm) {
    return axios.put("http://127.0.0.1:8000/booking/api/" + id + "/", bookingForm).then(response=>response.data);
}

function EditBooking() {
    const navigate = useNavigate();
    const state = useLocation().state;
    const { selectedData } = state ? state : {};
    console.log(selectedData);
    var selectedBooking = selectedData && selectedData[0];
    const [inputs, setInputs] = useState((selectedBooking ? selectedBooking : {}));

    const [carList, setCarList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    
    useEffect(() => {
      let mounted = true;
      setCarList([]);
          if(mounted) {
              getCars().then(data => {
                  setCarList(data);
               });
              getCustomers().then(data => {
                  setCustomerList(data);
              });
          }
      return () => mounted = false;
  }, []);
  
    if (state === null) {
      return <Navigate replace to="/booking" />
    }

    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
  
    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("pick_up_date", inputs.pick_up_date);
        formData.append("return_date", inputs.return_date);
        formData.append("booked_car", inputs.booked_car);
        formData.append("customer", inputs.customer);
        formData.append("status", inputs.status);
        updateBooking(selectedBooking.id, formData).then(response => {
            navigate("/booking");
        });
    }
    return <div>
    <div className="main-content">
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">
          <h1 className="mb-0">Edit Booking</h1>
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
                    <h3 className="mb-0">Booking</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">

                <form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Booking information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-pickup-date">Pickup date</label>
                          <input type="date" id="input-pickup-date" className="form-control form-control-alternative" name="pickupdate" onChange={handleChange} value={inputs.pick_up_date} required/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-return-date">Return date</label>
                          <input type="date" id="input-return-date" className="form-control form-control-alternative" name="return_date" onChange={handleChange} value={inputs.return_date} required/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group focused">
                                <label className="form-control-label" htmlFor="input-car">Car</label>
                                <select className="form-control form-control-alternative" id="input-car" name="booked_car" onChange={handleChange} value={inputs.booked_car} required>
                                    <option value="">Select a car</option>
                                    {carList.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                                </select>
                            </div>
                        </div>

                         <div className="col-lg-6">
                            <div className="form-group focused">
                                <label className="form-control-label" htmlFor="input-customer">Customer</label>
                                <select className="form-control form-control-alternative" id="input-customer" name="customer" onChange={handleChange} value={inputs.customer} required>
                                    <option value="">Select a customer</option>
                                    {customerList.map((e, i) => (<option key={i} value={e.id}>{e.first_name + " " + e.last_name}</option>))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                         <div className="col-lg-6">
                            <div className="form-group focused">
                                <label className="form-control-label" htmlFor="input-status">Status</label>
                                <select className="form-control form-control-alternative" id="input-status" name="status" onChange={handleChange} value={inputs.status} required>
                                    <option value="">Select a status</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="RETURNED">Completed</option>    
                                </select>
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

export default EditBooking;