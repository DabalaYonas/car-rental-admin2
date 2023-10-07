import { useEffect, useState } from "react";
import { getBooks } from "./datas/books";
import ListView from "./component/ListView";
import { useNavigate } from "react-router-dom";
import { getCar, getCars } from "./datas/cars";
import Tabs from "./component/Tab/Tab";
import { getCustomer } from "./datas/customer";

function BookingList() {
    const [ALL, PENDING, ACCEPTED, CANCELLED, RETURNED] = ["ALL", "PENDING", "ACCEPTED", "CANCELLED", "RETURNED"];

    const navigate = useNavigate();
    const listHeader = ["ID", "Booked Car", "Customer", "Pickup Date", "Return Date", "Status"];
    const [listItems, setListItems] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    const [badge, setBadge] = useState();

    useEffect(() => {
        let mounted = true;
        setBookingList([]);
        setListItems([]);
        getBooks().then(data => {
            if(mounted) {
                setBookingData(data);
                data.forEach(e => {
                    var bookedCarName = 0;
                    var customerName = e.customer;
                    getCar(e.booked_car).then(car => {
                        getCustomer(e.customer).then(data => {
                            
                            bookedCarName = car.name;

                            customerName = data.first_name + " " + data.last_name;


                            setBookingList(prev => ([...prev, {booking: e, bookedCarName, customerName}]));
                            setListItems(prev => ([...prev, [e.id, bookedCarName, customerName, e.pick_up_date, e.return_date, e.status]]));
                            setBadge(5);
                        });
                        
                    });
                    
                    
                });
            }
        });
        return () => mounted = false;
    }, []);

    function handleClick(id) {
        const selectedBooking = bookingList.filter(item => item.booking.id === id);
        // console.log(selectedBooking[0].booking);
        navigate("/edit-booking", {state: {"selectedBooking": selectedBooking[0].booking}});
    }

    function handleTabClick(n) {
        function filterBooking(status) {
            setListItems([]);
            return n === ALL ? bookingList.forEach(e => {
                setListItems(prev => ([...prev, [e.booking.id, e.bookedCarName, e.customerName, e.booking.pick_up_date, e.booking.return_date, e.booking.status]]));
            }) : bookingList.filter(item => item.booking.status == status).forEach(e => {
                setListItems(prev => ([...prev, [e.booking.id, e.bookedCarName, e.customerName, e.booking.pick_up_date, e.booking.return_date, e.booking.status]]));
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

            case RETURNED:
                filterBooking(RETURNED);
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
                <Tabs.Tab onClick={() => handleTabClick(RETURNED)}>Completed</Tabs.Tab>
            </Tabs>
            <div className="myCard">
                <h3 className="pd-v-2 pd-h-1">Booking List</h3>
                <ListView listHeader={listHeader} 
                    listItems={listItems} 
                    data={bookingData} 
                    url={"booking"} 
                    handleClick={handleClick} 
                    badge={badge}
                    isAcceptedAction="true" 
                    isReturnedAction="true" 
                    isCancelled="true"></ListView>
            </div>
        </div>
}

export default BookingList;