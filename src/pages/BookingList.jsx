import { useEffect, useState } from "react";
import { getBooks } from "./datas/books";
import ListView from "./component/ListView";
import { useNavigate } from "react-router-dom";
import { getCars } from "./datas/cars";
import { getDrivers } from "./datas/drivers";

function BookingList() {
    const navigate = useNavigate();
    const listHeader = ["ID", "Booked Car", "Booked Driver", "Pickup Date", "Return Date", "Status"];
    const [listItems, setListItems] = useState([]);
    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        let mounted = true;
        getBooks().then(data => {
            if(mounted) {
                setBookingList(data);
                data.forEach(e => {
                    var bookedCarName = 0;
                    var driverName = e.booked_driver;
                    getCars().then(r1 => {
                        getDrivers().then(r2 => {
                            
                            bookedCarName = r1.filter(car => car.id == e.booked_car)[0].name;
                            let booking_driver = r2.filter(car => car.id == e.booked_driver)[0];
                            driverName = booking_driver.first_name + " " + booking_driver.last_name;


                            setListItems(prev => ([...prev, [e.id, bookedCarName, driverName, e.pick_up_date, e.return_date, e.status]]));
                        });
                        
                    });
                    
                    
                });
            }
        });
        return () => mounted = false;
    }, []);

    function handleClick(id) {
        const selectedCar = bookingList.filter(car => car.id == id);
        navigate("/edit-booking", {state: {"selectedCar": selectedCar}});
    }

    return <div>
        <h3 className="pd-v-2 pd-h-1">Booking</h3>
            <div className="myCard">
                <h3 className="pd-v-2 pd-h-1">Booking List</h3>
                <ListView listHeader={listHeader} listItems={listItems} handleClick={handleClick}></ListView>
            </div>
        </div>
}

export default BookingList;