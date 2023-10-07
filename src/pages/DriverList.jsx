import { useEffect, useState } from "react";
import { getDrivers } from "./datas/drivers";
import ListView from "./component/ListView";
import { useNavigate } from "react-router-dom";


function DriversList() {
    const navigate = useNavigate();
    var [driversList, setDriversList] = useState([]);
    
    const listHeader = ["ID", "Name", "Email", "Phone number", "Age", "Gender"];
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        let mounted = true;
        setListItems([]);
        setDriversList([]);
        getDrivers().then(data => {
            if(mounted) {
                setDriversList(data);
                data.forEach(e => {
                    setListItems(prev => ([...prev, [e.id, e.first_name + " " + e.last_name, e.email, e.phone_number, e.age, e.gender]]));
                });
            }
        });
        return () => mounted = false;
    }, []);


    function handleClick(id) {
        const selectedDriver = driversList.filter(driver => driver.id == id);
        navigate("/edit-driver", {state: {"selectedDriver": selectedDriver}});
    }

    return <div>
        <h2 className="pd-v-2 pd-h-1">Drivers</h2>
            <div className="myCard">
                <h3 className="pd-v-2 pd-h-1">Drivers List</h3>
                <ListView listHeader={listHeader} listItems={listItems} data={driversList} url={"driver"} handleClick={handleClick}></ListView>
            </div>
        </div>
}

export default DriversList;