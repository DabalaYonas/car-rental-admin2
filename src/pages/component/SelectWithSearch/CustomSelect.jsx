import { useState } from "react";

export function CustomSelect(props) {
    var [searchList, setSearchList] = useState(props.itemsList);
    const [inputs, setInputs] = useState({});
    const [visibleClass, setVisibleClass] = useState();
    

    function handleCustomSearch(e) {
        let text = e.target.value;
        setSearchList(props.itemsList.filter(item => item.name.toLowerCase().startsWith(text.toLowerCase())));
    }

    function handleApply(e) {
        e.preventDefault();
        let checkedItems = [];
        Object.entries(inputs).forEach(item => {
            if (item[0] === "from" || item[0] === "to") {
                checkedItems.push(item);
            } else if (item[0]) {
                let checkedID = item[0];
                checkedItems.push(checkedID);
            }
        });
        console.log(checkedItems);
        setVisibleClass();
        props.onApply(checkedItems);
    }

    function handleChange(e) {
        var name = e.target.name;
        var value = e.target.checked;
        if (name === "from" || name === "to") {
            value = e.target.value;
        } 
        setInputs(values => ({...values, [name]: value}));
    }

    
    return <>
        <div className="multipleSelection">
            <div className="selectBox" onClick={(e) => {visibleClass === "visible" ? setVisibleClass() : setVisibleClass("visible");}}>
                <p><i className={props.iconClass + " me-1 select-icon"}></i>Select {props.title}</p>
                <span className="dropdown-icon"><i class="bi bi-chevron-down"></i></span>
            </div>

            <div id="checkBox" className={visibleClass}>
                <form onSubmit={handleApply} >
                    <p className="checkbox-title">{props.title}</p>
                    {props.isDatePicker ?  <>
                        <div class="date-picker">
                            <div class="form-custom cal-icon">
                                <label>From</label>
                                <input type="date" class="form-control datetimepicker" name="from" placeholder="Form" value={inputs.from} onChange={handleChange}/>
                            </div>
                        </div>

                        <div class="date-picker pe-0">
                            <div class="form-custom cal-icon">
                                <label>To</label>
                                <input type="date" class="form-control datetimepicker" name="to" placeholder="To" value={inputs.to} onChange={handleChange} />
                            </div>
                        </div>
                    </> : <>
                    {props.withSearch && <div className="form-custom">
                        <input type="text" className="form-control bg-grey" placeholder={"Enter " + props.title} onChange={handleCustomSearch}/>
                    </div>}   
                    <div className="selectBox-cont">
                        {searchList.map(item => (
                            <label className="custom_check w-100" key={item.id}>
                                <input type="checkbox" name={item.name} className="checkbox" value={inputs} onChange={handleChange}/>
                                <span className="checkmark"></span> {item.name}
                            </label>
                        ))}
                    </div>
                    </>}
                    <button type="submit" className="btn w-100 btn-primary">Apply</button>
                    <button type="reset" className="btn w-100 btn-grey mg-t-1" style={{color: "#1B2559"}}>Reset</button>
                </form>
            </div>
        </div>
    </>
}