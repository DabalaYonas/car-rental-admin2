import Button from "./Button";
import InputSelectView from "./InputSelectView";
import InputView from "./InputView";


function VehicleForm(props) {
  
    return <div>
            <form onSubmit={props.handleSubmit} >
                <div className="row">
                    <div className="col-3">
                        <InputView 
                            type="text" 
                            lable="Car Name *" 
                            placeholder="Car Name"
                            name="name"
                            onChange={props.handlerChange}
                            value={props.inputs.name}/>
                    </div>
                    <div className="col-3">
                        <InputView 
                            type="text" 
                            lable="Car Brand *" 
                            placeholder="Car Brand" 
                            name="brand"
                            onChange={props.handlerChange}
                            value={props.inputs.brand}/>
                    </div>
                    <div className="col-3">
                        <InputView 
                            type="text" 
                            lable="Model Year *" 
                            placeholder="Model Year"
                            name="model_year"
                            onChange={props.handlerChange}
                            value={props.inputs.model_year}/>
                    </div>
                    

                    <div className="col-3">
                        <InputView 
                            type="text" 
                            lable="Plate Number *" 
                            placeholder="Plate Number"
                            name="plate_number"
                            onChange={props.handlerChange}
                            value={props.inputs.plate_number}/>
                    </div>
                    <div className="col-3">
                        <InputView 
                            type="number" 
                            lable="Seat Number *" 
                            placeholder="Seat Number" 
                            name="seat_number"
                            onChange={props.handlerChange}
                            value={props.inputs.seat_number}/>
                    </div>
                    <div className="col-3">

                    <InputSelectView 
                            lable="Category *" 
                            name="category"
                            onChange={props.handlerChange}
                            value={props.inputs.category}>
                                <option value="">Select a car category</option>
                                <option value="SMALL">Small</option>
                                <option value="MIDSIZE">Midsize</option>
                                <option value="PREMIUM">Premium</option>
                                <option value="SUV">SUV</option>
                                <option value="VAN">Van</option>
                        </InputSelectView>
                    </div>
                    

                    <div className="col-3">
                        <InputSelectView 
                            lable="Engine Type *" 
                            name="engine_type"
                            onChange={props.handlerChange}
                            value={props.inputs.engine_type}>
                                <option value="">Engine Type</option>
                                <option value="DIESEL">Diesel</option>
                                <option value="PETROL">Petrol</option>
                                <option value="HYBRID">Hybrid</option>
                                <option value="ELECTRIC">Electric</option>
                        </InputSelectView>
                    </div>
                    <div className="col-3">
                        <InputSelectView 
                            lable="Transmission Type *" 
                            name="transmission_type"
                            onChange={props.handlerChange}
                            value={props.inputs.transmission_type}>
                                <option value="">Transmission Type</option>
                                <option value="AUTOMATIC">Automatic</option>
                                <option value="MANUAL">Manual</option>
                        </InputSelectView>

                    </div>
                    <div className="col-3">
                        <InputView 
                            type="number" 
                            lable="Price Per Day *" 
                            placeholder="Price Per Day"
                            name="price_per_day"
                            onChange={props.handlerChange}
                            value={props.inputs.price_per_day}/>
                    </div>
                    {props.imageInput != null && <div className="col-12">
                        <h5>Current Car Image: </h5>
                        <img width={300} src={props.imageInput} />
                    </div>}
                    <div className="col-12">
                        <h5>New Car Image: <input id="img" className="form-group" type="file" accept="image/*" name="image" onChange={props.handlerChange} /></h5>
                       
                    </div>
                    
                    <div className="col-12">
                        <Button value={props.button}></Button>
                    </div>
                </div>
            </form>
            
    </div>
}

export default VehicleForm;