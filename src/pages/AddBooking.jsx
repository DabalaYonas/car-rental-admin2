import Button from "./component/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { DropDown } from "./component/DropDown/Dropdown";
import { getDrivers } from "./datas/drivers";
import { getCars } from "./datas/cars";
import { getCustomer } from "./datas/customer";
import { useNavigate } from "react-router-dom";

async function addBooking(bookingForm) {
    return axios.post("http://127.0.0.1:8000/booking/api/", bookingForm).then(response=>response.data);
}

function AddBooking() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [carList, setCarList] = useState([]);
    const [driverList, setDriverList] = useState([]);
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        let mounted = true;
        setCarList([]);
        setDriverList([]);
            if(mounted) {
                getCars().then(data => {
                    setCarList(data);
                 });
                getDrivers().then(data => {
                    setDriverList(data);
                });
                getCustomer().then(data => {
                    setCustomerList(data);
                });
            }
        return () => mounted = false;
    }, []);

    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
  
    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("pick_up_date", inputs.pickupdate);
        formData.append("return_date", inputs.return_date);
        formData.append("booked_car", inputs.car);
        formData.append("booked_driver", inputs.driver);
        formData.append("customer", inputs.customer);
        formData.append("status", "PENDING");
        addBooking(formData).then(response => {
            navigate("/booking");
        });
    }
    return <div>
    <div className="main-content">
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">
          <h1 className="mb-0">Add Booking</h1>
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
                          <input type="date" id="input-pickup-date" className="form-control form-control-alternative" name="pickupdate" onChange={handleChange} value={inputs.pickupdate} min={new Date().toLocaleDateString('fr-ca')} required/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-return-date">Return date</label>
                          <input type="date" id="input-return-date" className="form-control form-control-alternative" name="return_date" onChange={handleChange} value={inputs.return_date} min={inputs.pickupdate == null ?  (new Date().toLocaleDateString('fr-ca')) : inputs.pickupdate } required/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group focused">
                                <label className="form-control-label" htmlFor="input-car">Car</label>
                                <select className="form-control form-control-alternative" id="input-car" name="car" onChange={handleChange} value={inputs.car} required>
                                    <option value="">Select a car</option>
                                    {carList.filter(item => item.is_available).map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group focused">
                                <label className="form-control-label" htmlFor="input-driver">Driver</label>
                                <select className="form-control form-control-alternative" id="input-driver" name="driver" onChange={handleChange} value={inputs.driver} required>
                                    <option value="">Select a driver</option>
                                    {driverList.map((e, i) => (<option key={i} value={e.id}>{e.first_name + " " + e.last_name}</option>))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
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

export default AddBooking;