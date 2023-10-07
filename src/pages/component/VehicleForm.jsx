import Button from "./Button";
import Toggle from "./Toggle/Toggle";
import UploadView from "./UploadView/UploadView";


function VehicleForm(props) {
    
    return <div>
            
            <div className="main-content">
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">
          <h1 className="mb-0">{props.title}</h1>
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
                    <h3 className="mb-0">Vehicale</h3>
                  </div> 
                  
                  <div className="col-6">
                        <div className="flex-h-end align-center">
                          <label className="form-control-label" style={{marginRight: "10px"}}>Is Available</label>
                          <Toggle name="is_available" onChange={props.handleChange} checked={props.inputs.is_available}></Toggle>
                        </div>
                  </div>
                </div>
              </div>
              <div className="card-body">

                <form onSubmit={props.handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Vehicale information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-car-name">Vehicle Name</label>
                          <input type="text" id="input-car-name" className="form-control form-control-alternative" placeholder="Car name" name="name" onChange={props.handleChange} value={props.inputs.name} required/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-car-brand">Vehicle Maker</label>
                          <select className="form-control form-control-alternative" id="input-car-brand" name="brand" onChange={props.handleChange} value={props.inputs.brand} required>
                            <option value="">Select a Vehicle Maker</option>
                            {props.brands.map((e, i) => (<option key={i} value={e.id}>{e.brand}</option>))}
                          </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-model">Vehicle Model</label>
                          <select className="form-control form-control-alternative" id="input-car-brand" name="model" onChange={props.handleChange} value={props.inputs.model} required>
                            <option value="">Select a Vehicle Model</option>
                            {props.inputs.brand && props.models.filter(model => model.maker == props.inputs.brand).map((e, i) => (<option key={i} value={e.id}>{e.model}</option>))}
                          </select>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-color">Vehicle Color</label>
                              <select className="form-control form-control-alternative" id="input-color" name="color" onChange={props.handleChange} value={props.inputs.color} required>
                                <option value="">Select a Vehicle Color</option>
                                {props.colors.map((e, i) => (<option key={i} value={e.id}>{e.color}</option>))}
                              </select>  
                            </div>
                        </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-model-year">Model Year</label>
                          <input type="text" id="input-model-year" className="form-control form-control-alternative" placeholder="Model year" name="model_year" onChange={props.handleChange} value={props.inputs.model_year} required/>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                            <label className="form-control-label" htmlFor="input-plate-number">Plate Number</label>
                            <input type="text" id="input-plate-number" className="form-control form-control-alternative" placeholder="eg. 573829" name="plate_number" onChange={props.handleChange} value={props.inputs.plate_number} required/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-category">Category</label>
                          <select className="form-control form-control-alternative" id="input-category" name="category" onChange={props.handleChange} value={props.inputs.category} required>
                            <option value="">Select a Category</option>
                            {props.categories.map((e, i) => (<option key={i} value={e.id}>{e.category}</option>))}
                          </select>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                            <label className="form-control-label" htmlFor="input-seat-number">Seat Number</label>
                            <input type="number" id="input-seat-number" className="form-control form-control-alternative" placeholder="eg. 4" name="seat_number" onChange={props.handleChange} value={props.inputs.seat_number} required/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-engine">Engine</label>
                          <select className="form-control form-control-alternative" id="input-engine" name="engine_type" onChange={props.handleChange} value={props.inputs.engine_type} required>
                            <option value="">Select a Engine</option>
                            {props.engines.map((e, i) => (<option key={i} value={e.id}>{e.engine}</option>))}
                          </select>
                            </div>
                        </div>

                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-transmission">Transmission</label>
                          <select className="form-control form-control-alternative" id="input-transmission" name="transmission_type" onChange={props.handleChange} value={props.inputs.transmission_type} required>
                            <option value="">Select a Transmission</option>
                            {props.transmissions.map((e, i) => (<option key={i} value={e.id}>{e.transmission}</option>))}
                          </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                            <label className="form-control-label" htmlFor="input-price-per-day">Price Per Day (ETB)</label>
                            <input type="number" id="input-price-per-day" className="form-control form-control-alternative" placeholder="eg. 2000" name="price_per_day" onChange={props.handleChange} value={props.inputs.price_per_day} required/>
                            </div>
                        </div>
                          
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label className="form-control-label" htmlFor="input-vin">VIN</label>
                            <input type="text" id="input-vin" className="form-control form-control-alternative" placeholder="VIN" name="vin" onChange={props.handleChange} value={props.inputs.vin}/>
                              </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="input-with-driver" style={{marginRight: "10px"}}>With Driver</label>
                                <input type="checkbox" id="input-with-driver" name="with_driver" onChange={props.handleChange} checked={props.inputs.with_driver}/>
                                
                                {props.inputs.with_driver && (<select className="form-control form-control-alternative" id="input-driver" name="driver" onChange={props.handleChange} value={props.inputs.driver} required>
                                    <option value="">Select a Driver</option>
                                    <option value="">ID Name</option>
                                    {props.drivers.map((e, i) => (<option key={i} value={e.id}>{e.id + ". " + e.first_name + " " + e.last_name}</option>))}
                                </select>)}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {props.currentImage != null &&<div className="col-lg-6">
                            <div className="form-group" >
                                <label className="form-control-label" htmlFor="input-driving-license">Old Vehicale Image</label>
                                <img width="100%" alt="Current car image" src={props.currentImage} />
                              
                            </div>
                        </div>}
                        <div className="col-lg-6">
                            <div className="form-group" >
                                <label className="form-control-label" htmlFor="input-driving-license">Vehicale Image</label>
                                <UploadView setImageInput={props.imageInput}>Select a car image</UploadView>
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
}

export default VehicleForm;