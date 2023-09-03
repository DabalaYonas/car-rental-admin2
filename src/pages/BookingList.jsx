import { useEffect, useState } from "react";
import { getBooks } from "./datas/books";
import ListView from "./component/ListView";
import { useNavigate } from "react-router-dom";
import { getCars } from "./datas/cars";
import { getDrivers } from "./datas/drivers";
import Tabs from "./component/Tab/Tab";

function BookingList() {
    const [ALL, PENDING, ACCEPTED, CANCELLED, COMPLETED] = ["ALL", "PENDING", "ACCEPTED", "CANCELLED", "COMPLETED"];

    const navigate = useNavigate();
    const listHeader = ["ID", "Booked Car", "Booked Driver", "Pickup Date", "Return Date", "Status"];
    const [listItems, setListItems] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    const [badge, setBadge] = useState();

    useEffect(() => {
        let mounted = true;
        setBookingList([]);
        setListItems([]);
        getBooks().then(data => {
            if(mounted) {
                // setBookingList(data);
                data.forEach(e => {
                    var bookedCarName = 0;
                    var driverName = e.booked_driver;
                    getCars().then(r1 => {
                        getDrivers().then(r2 => {
                            
                            bookedCarName = r1.filter(car => car.id == e.booked_car)[0].name;
                            let booking_driver = r2.filter(car => car.id == e.booked_driver)[0];
                            driverName = booking_driver.first_name + " " + booking_driver.last_name;


                            setBookingList(prev => ([...prev, {booking: e, bookedCarName, driverName}]));
                            setListItems(prev => ([...prev, [e.id, bookedCarName, driverName, e.pick_up_date, e.return_date, e.status]]));
                            setBadge(5);
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

    function handleTabClick(n) {
        function filterBooking(status) {
            setListItems([]);
            return n === ALL ? bookingList.forEach(e => {
                setListItems(prev => ([...prev, [e.booking.id, e.bookedCarName, e.driverName, e.booking.pick_up_date, e.booking.return_date, e.booking.status]]));
            }) : bookingList.filter(item => item.booking.status == status).forEach(e => {
                setListItems(prev => ([...prev, [e.booking.id, e.bookedCarName, e.driverName, e.booking.pick_up_date, e.booking.return_date, e.booking.status]]));
            });
        }

        switch (n) {
            case ALL:
                filterBooking(ALL);
                break;
                
            case PENDING:
                filterBooking(PENDING);
                break;    

            case ACCEPTED:
                filterBooking(ACCEPTED);
                break;     

            case CANCELLED:
                filterBooking(CANCELLED);
                break;      

            case COMPLETED:
                filterBooking(COMPLETED);
                break;
        }   
    }

    return <div>
        <h2 className="pd-v-2 pd-h-1">Booking</h2>
            <Tabs>
                <Tabs.Tab isActive={true} onClick={() => handleTabClick(ALL)}>All Booking</Tabs.Tab>
                <Tabs.Tab onClick={() => handleTabClick(PENDING)}>Pending</Tabs.Tab>
                <Tabs.Tab onClick={() => handleTabClick(ACCEPTED)}>Accepted</Tabs.Tab>
                <Tabs.Tab onClick={() => handleTabClick(CANCELLED)}>Cancelled</Tabs.Tab>
                <Tabs.Tab onClick={() => handleTabClick(COMPLETED)}>Completed</Tabs.Tab>
            </Tabs>
            <div className="myCard">
                <h3 className="pd-v-2 pd-h-1">Booking List</h3>
                <ListView listHeader={listHeader} listItems={listItems} handleClick={handleClick} badge={badge}></ListView>
            </div>
        </div>
}

export default BookingList;