import ListView from "./component/ListView";
import { useEffect, useState } from "react";
import { getPayments } from "./datas/payments";
import { getBooks } from "./datas/books";
import { getCar, getCars } from "./datas/cars";
import { getDrivers } from "./datas/drivers";
import { getCustomer } from "./datas/customer";
import { CustomSelect } from "./component/SelectWithSearch/CustomSelect";

function ReportList() {
    const paymentHeader = ["ID", "Amount", "Method", "Transation ID", "Status"];
    const bookingHeader = ["ID", "Booked Car", "Booked Customer", "Pickup Date", "Return Date", "Status"];
    const [paymentItems, setPaymentItems] = useState([]);
    const [bookingItems, setBookingItems] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [badge1, setBadge1] = useState();
    const [badge2, setBadge2] = useState();

    const [users, setUsers] = useState();
    const [date, setDates] = useState();
    const [cars, setCars] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        let mounted = true;
        setPaymentItems([]);
        setBookingItems([]);
        setBookings([]);
        getPayments().then(data => {
            if(mounted) {
                data.filter(item => item.status === "PAID").forEach(e => {
                    setPaymentItems(prev => ([...prev, [e.id, e.amount + " ETB", e.method, e.tnx_id, e.status]]));
                    setBadge1(4);
                });
            }
        });
        getBooks().then(data => {
            if(mounted) {
                data.filter(item => item.status === "RETURNED").forEach(e => {
                    getCar(e.booked_car).then(car => {
                        getCustomer(e.customer).then(customer => {
                            
                            let bookedCarName = car.name;
                            let customerName = customer.first_name + " " + customer.last_name;

                            setBookingItems(prev => ([...prev, [e.id, bookedCarName, customerName, e.pick_up_date, e.return_date, e.status]]));
                            setBookings(prev => ([...prev, [e.id, bookedCarName, customerName, e.pick_up_date, e.return_date, e.status]]));
                            setBadge2(5);
                        });
                        
                    });
                    
                    
                });
            }
        });
        return () => mounted = false;
    }, []);

    function printMe(id) {
    }

    var listName = [{id: 1, name: "Dabala Yonas"}, {id: 2, name:"Robera Yonas"}, {id: 3, name:"Darara Yonas"}, {id: 4, name:"Lemi Oljira"}];

    function generateReport(e) {
        // setBookingItems([]);
        console.log(users);
        // bookings.filter(item => item[1] === )
    }

    return <div>
    <h2 className="pd-v-2 pd-h-1">Reports</h2>
        <div>
            <div className="myCard">
                <ul className="app-listing">
                    <li>
                        <CustomSelect title={"Users"} 
                                iconClass={"bi bi-person-fill-add"} 
                                itemsList={listName}
                                withSearch={true}
                                onApply={(item) => {setUsers(item)}}></CustomSelect>
                    </li>
                    <li>
                        <CustomSelect title={"Date"} 
                                iconClass={"bi bi-calendar3"}
                                isDatePicker={true}
                                onApply={(item) => {setDates(item)}}></CustomSelect>
                    </li>
                    <li>
                        <CustomSelect title={"Cars"} 
                                iconClass={"bi bi-car-front-fill"} 
                                itemsList={listName}
                                withSearch={true}
                                onApply={(item) => {setCars(item)}}></CustomSelect>
                    </li>
                    <li>
                        <CustomSelect title={"Status"} 
                                iconClass={"bi bi-book-fill"} 
                                itemsList={listName}
                                onApply={(item) => {setStatus(item)}}></CustomSelect>
                    </li>
                    <li>
                        <div className="report-btn">
                            <button onClick={generateReport} className="btn outline-btn"><i class="bi bi-file-earmark-plus-fill"></i> Generate report</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="myCard mg-t-2">
                <h3 className="pd-v-2 pd-h-1">Completed Booking</h3>
                <ListView isReport={true} listHeader={bookingHeader} listItems={bookingItems} handleClick={() => {}} badge={badge2}></ListView>
            </div>
    
            <div className="d-print-none mt-4">
                <div className="float-end">
                    <button onClick={printMe} className="btn btn-primary me-1"><i className="bi bi-printer"></i></button>
                </div>
            </div>
        </div>
    </div>
}

export default ReportList;