import Button from "./Button";
import InputView from "./InputView";


function DriverForm(props) {
  
    return <div>
            <form onSubmit={props.handleSubmit} >
                <div className="row">
                    <div className="col-3">
                        <InputView 
                            type="text" 
                            lable="First Name *" 
                            placeholder="First Name"
                            name="first_name"
                            onChange={props.handlerChange}
                            value={props.inputs.first_name}/>
                    </div>
                    <div className="col-3">
                        <InputView 
                            type="text" 
                            lable="Last Name *" 
                            placeholder="Last Name" 
                            name="last_name"
                            onChange={props.handlerChange}
                            value={props.inputs.last_name}/>
                    </div>
                    <div className="col-3">
                        <InputView 
                            type="email" 
                            lable="Email *" 
                            placeholder="Email"
                            name="email"
                            onChange={props.handlerChange}
                            value={props.inputs.email}/>
                    </div>


                    <div className="col-3">
                        <InputView 
                            type="text" 
                            lable="Phone Number *" 
                            placeholder="Phone Number"
                            name="phone_number"
                            onChange={props.handlerChange}
                            value={props.inputs.phone_number}/>
                    </div>
                    <div className="col-3">
                        <InputView 
                            type="number" 
                            lable="Age *" 
                            placeholder="Age" 
                            name="age"
                            onChange={props.handlerChange}
                            value={props.inputs.age}/>
                    </div>
                    
                    <div className="col-12">
                        <Button value={props.button}></Button>
                    </div>
                </div>
            </form>
            
    </div>
}

export default DriverForm;