import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VehicleForm from "./component/VehicleForm";
import { getBrands, getCategories, getColors, getEngines, getModels, getTransmissions } from "./datas/lookup";
import { getDrivers } from "./datas/drivers";
import Button from "./component/Button";
import UploadView from "./component/UploadView/UploadView";
import { Signature } from "./component/Signature";
import { getBooks } from "./datas/books";
import { getCar } from "./datas/cars";
import { getCustomer } from "./datas/customer";

async function addAgreement(agreementInfo) {
  return axios.post("http://127.0.0.1:8000/booking/agreement/api/", agreementInfo, {headers: {'content-type': 'multipart/form-data'}}).then(response=>response.data);
}

function AddAgreement() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [signatureURL, setSignatureURL] = useState();
    
    const [booking, setBooking] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getBooks().then(data => {
                setBooking([]);
                setBooking(data);
            });
            getBrands().then(data => {
                setBrands([]);
                setBrands(data);
            });
            getModels().then(data => {
                setModels([]);
                setModels(data);
            });
            getColors().then(data => {
                setColors([]);
                setColors(data);
            });
        }
        return () => mounted = false;
    }, []);
  
  
    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        if (name === "booking") {
          console.log(value);
          var booked = booking.filter(booking => booking.id == value)[0];
          setInputs(values => ({...values, ["pickupdate"]: booked.pick_up_date}));
          setInputs(values => ({...values, ["return_date"]: booked.return_date}));
          setInputs(values => ({...values, ["deposit"]: inputs.deposit}));
          getCar(booked.booked_car).then(data => {
            setInputs(values => ({...values, ["carName"]: data.name}));
            setInputs(values => ({...values, ["model"]: models.filter(model => model.id == data.model)[0].model}));
            setInputs(values => ({...values, ["color"]: colors.filter(color => color.id == data.brand)[0].color}));
            setInputs(values => ({...values, ["plate_number"]: data.plate_number}));
            setInputs(values => ({...values, ["model_year"]: data.model_year}));
            setInputs(values => ({...values, ["brand"]: brands.filter(make => make.id == data.brand)[0].brand}));
            setInputs(values => ({...values, ["pricePerDay"]: data.price_per_day}));
          });
          getCustomer(booked.customer).then(data => {
            setInputs(values => ({...values, ["fullName"]: data.first_name + " " + data.last_name}));
          });
        }
        setInputs(values => ({...values, [name]: value}));
        
    }
    
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, {type:mime});
      }
  
    function handleSubmit(e) {
        e.preventDefault(); 
        
        let formData = new FormData();
        formData.append("booking", inputs.booking);
        let signatureFileName = "signature_" + inputs.booking + ".png";
        var file = dataURLtoFile(signatureURL, signatureFileName);
        formData.append("deposit", inputs.deposit);
        formData.append("signature", file, file.name);
        addAgreement(formData).then(response => {
          navigate("/agreement-details", {state: {infos: inputs, signatureURL: signatureURL}});
        });
       
    }
  
    return <div>
           <div>
            
            <div className="main-content">
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">
          <h1 className="mb-0">Add Agreement</h1>
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
                <div className="col-6">
                    <h3 className="mb-0">Agreement</h3>
                  </div> 
                </div>
              </div>
              <div className="card-body">

                <form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Agreement informations</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-car-booking">Booking</label>
                          <select className="form-control form-control-alternative" id="input-car-booking" name="booking" onChange={handleChange} value={inputs.booking}>
                            <option value="">Select a Car Booking</option>
                            {booking.map((e, i) => (<option key={i} value={e.id}>{e.id}</option>))}
                          </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-full-name">Customer Full name</label>
                          <input type="text" id="input-full-name" className="form-control form-control-alternative" placeholder="Full name" name="fullName" onChange={handleChange} value={inputs.fullName} required/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-price-per-day">Price Per Day (ETB)</label>
                          <input type="number" id="input-price-per-day" className="form-control form-control-alternative" placeholder="eg. 2000" name="pricePerDay" onChange={handleChange} value={inputs.pricePerDay} required/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-car-name">Car Name</label>
                          <input type="text" id="input-car-name" className="form-control form-control-alternative" placeholder="Car name" name="carName" onChange={handleChange} value={inputs.carName} required/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-car-brand">Brand</label>
                          <select className="form-control form-control-alternative" id="input-car-brand" name="brand" onChange={handleChange} value={inputs.brand} required>
                            <option value="">Select a Car Brand</option>
                            {brands.map((e, i) => (<option key={i} value={e.brand}>{e.brand}</option>))}
                          </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-car-model">Vehicle Model</label>
                          <select className="form-control form-control-alternative" id="input-car-moel" name="model" onChange={handleChange} value={inputs.model} required>
                            <option value="">Select a Vehicle Model</option>
                            {models.map((e, i) => (<option key={i} value={e.model}>{e.model}</option>))}
                          </select>
                            </div>
                        </div>

                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-car-color">Vehicle Color</label>
                          <select className="form-control form-control-alternative" id="input-car-color" name="color" onChange={handleChange} value={inputs.color} required>
                            <option value="">Select a Vehicle Color</option>
                            {colors.map((e, i) => (<option key={i} value={e.color}>{e.color}</option>))}
                          </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-model-year">Model Year</label>
                          <input type="text" id="input-model-year" className="form-control form-control-alternative" placeholder="Model year" name="model_year" onChange={handleChange} value={inputs.model_year} required/>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                            <label className="form-control-label" htmlFor="input-plate-number">Plate Number</label>
                            <input type="text" id="input-plate-number" className="form-control form-control-alternative" placeholder="eg. 573829" name="plate_number" onChange={handleChange} value={inputs.plate_number} required/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-pickup-date">Pickup date</label>
                          <input type="date" id="input-pickup-date" className="form-control form-control-alternative" name="pickupdate" onChange={handleChange} value={inputs.pickupdate} required/>
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
                          <label className="form-control-label" htmlFor="input-vin">VIN</label>
                          <input type="text" id="input-vin" className="form-control form-control-alternative" placeholder="VIN" name="vin" onChange={handleChange} value={inputs.vin}/>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-deposit">Deposit  (ETB)</label>
                          <input type="number" id="input-deposit" className="form-control form-control-alternative" placeholder="Deposit" name="deposit" onChange={handleChange} value={inputs.deposit}/>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group" >
                                <label className="form-control-label" htmlFor="input-driving-license">Signature</label>
                                <Signature setSignatureURL={setSignatureURL}></Signature>
                            </div>
                        </div>
                    </div> 
                    
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group" >
                                <Button value="Submit"></Button>
                            </div>
                        </div>
                    </div>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
}

export default AddAgreement;