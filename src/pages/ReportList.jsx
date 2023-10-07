import ListView from "./component/ListView";
import { useEffect, useState } from "react";
import { getPayments } from "./datas/payments";
import { getBooks } from "./datas/books";
import { getCar, getCars } from "./datas/cars";
import { getDrivers } from "./datas/drivers";
import { getCustomer } from "./datas/customer";

function ReportList() {
    const paymentHeader = ["ID", "Amount", "Method", "Transation ID", "Status"];
    const bookingHeader = ["ID", "Booked Car", "Booked Driver", "Pickup Date", "Return Date", "Status"];
    const [paymentItems, setPaymentItems] = useState([]);
    const [bookingItems, setBookingItems] = useState([]);
    const [badge1, setBadge1] = useState();
    const [badge2, setBadge2] = useState();

    useEffect(() => {
        let mounted = true;
        setPaymentItems([]);
        setBookingItems([]);
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
                            setBadge2(5);
                        });
                        
                    });
                    
                    
                });
            }
        });
        return () => mounted = false;
    }, []);

    function handleClick(id) {
    }


    return <div>
    <h2 className="pd-v-2 pd-h-1">Reports</h2>
        <div className="myCard">
            <h3 className="pd-v-2 pd-h-1">Paid Payments</h3>
            <ListView isReport={true} listHeader={paymentHeader} listItems={paymentItems} handleClick={handleClick} badge={badge1}></ListView>
        </div>
        <div className="myCard mg-t-2">
            <h3 className="pd-v-2 pd-h-1">Completed Booking</h3>
            <ListView isReport={true} listHeader={bookingHeader} listItems={bookingItems} handleClick={handleClick} badge={badge2}></ListView>
        </div>
    </div>
}

export default ReportList;