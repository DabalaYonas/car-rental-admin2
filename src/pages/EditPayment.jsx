import "./EditDriver.css";
import Button from "./component/Button";
import UploadView from "./component/UploadView/UploadView";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

async function updatePyament(id, paymentForm) {
    return axios.put("http://127.0.0.1:8000/booking/payment/api/" + id + "/", paymentForm).then(response=>response.data);
}

function EditPayment() {
    const navigate = useNavigate();
    const state = useLocation().state;
    let { selectedPayment } = state ? state : {};
    selectedPayment = selectedPayment && selectedPayment[0];
    const [inputs, setInputs] = useState((selectedPayment ? selectedPayment : {}));
  
    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
  
    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("amount", inputs.amount);
        formData.append("method", inputs.method);
        formData.append("tnx_id", inputs.tnx_id);
        formData.append("status", inputs.status);
        formData.append("booking", selectedPayment.booking);
        formData.append("discription", inputs.discription);

        updatePyament(selectedPayment.id, formData).then(response => {
            navigate("/payment");
        });
    }
    return <div>
    <div className="main-content">
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">
          <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" target="_blank">Payment profile</a>
        </div>
      </nav>
      
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: "200px", backgroundImage: "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)", backgroundSize: "cover", backgroundPosition: "center top"}}>
        <span className="mask bg-gradient-default opacity-8"></span>
      </div>
      
      <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div className="card card-profile shadow">
              <div className="card-body ">
                <div className="row">
                    <h3>Payment Details: </h3>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-person mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Amount <h4 className="text-muted">{selectedPayment.amount + " ETB"}</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-envelope mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Method: <h4 className="text-muted">{selectedPayment.method}</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-phone mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Transation ID: <h4 className="text-muted">{selectedPayment.tnx_id}</h4></h3>
                        </div>
                    </div>
                    <div className="personal-info input-group-prepend">
                        <div className="personal-icons">
                            <i className="bi bi-calendar2-event mr-2"></i>
                        </div>
                        <div className="personal-views">
                            <h3>Status: <h4 className="text-muted">{selectedPayment.status}</h4></h3>
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
                    <h3 className="mb-0">Payment</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">

                <form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Payment information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-amount">Amount</label>
                          <input type="text" id="input-amount" className="form-control form-control-alternative" placeholder="Amount" name="amount" onChange={handleChange} value={inputs.amount} required/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-method">Method</label>
                          <input type="text" id="input-method" className="form-control form-control-alternative" placeholder="Method" name="method" onChange={handleChange} value={inputs.method} required/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-tnx-id">Transation ID</label>
                          <input type="text" id="input-tnx-id" className="form-control form-control-alternative" placeholder="Transation ID" name="tnx_id" onChange={handleChange} value={inputs.tnx_id} required/>
                            </div>
                        </div>

                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-status">Status</label>
                          <select className="form-control form-control-alternative" id="input-status" name="status" onChange={handleChange} value={inputs.status} required>
                            <option value="">Status</option>
                            <option value="NOT PAID">Not paid</option>
                            <option value="PENDING">Pending</option>
                            <option value="PAID">Paid</option>
                          </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                            <label className="form-control-label" htmlFor="input-discription">Discription</label>
                            <input type="text" id="input-discription" className="form-control form-control-alternative" placeholder="Discription" name="discription" onChange={handleChange} value={inputs.discription}/>
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

export default EditPayment;