import { useEffect, useState } from "react";
import { getCars } from "./datas/cars";
import ListView from "./component/ListView";
import { useNavigate } from "react-router-dom";

function VehiclesList() {
    const navigate = useNavigate();
    const listHeader = ["ID", "Car Name", "Model Year", "Price Per Day", "Is Available"];
    const [listItems, setListItems] = useState([]);
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        let mounted = true;
        setListItems([]);
        setCarList([]);
        getCars().then(data => {
            if(mounted) {
                setCarList(data);
                data.forEach(e => {
                    setListItems(prev => ([...prev, [e.id, e.name, e.model_year, e.price_per_day + " ETB", e.is_available]]));
                });
            }
        });
        return () => mounted = false;
    }, []);

    function handleClick(id) {
        const selectedCar = carList.filter(car => car.id == id);
        console.log(selectedCar);
        navigate("/edit-car", {state: {"selectedData": selectedCar}});
    }

    return <div>
        <h2 className="pd-v-2 pd-h-1">Cars</h2>
            <div className="myCard">
                <h3 className="pd-v-2 pd-h-1">Car List</h3>
                <ListView listHeader={listHeader} listItems={listItems} data={carList} url={"car"} handleClick={handleClick} isAvailableAction="true"></ListView>
            </div>
        </div>
}

export default VehiclesList;