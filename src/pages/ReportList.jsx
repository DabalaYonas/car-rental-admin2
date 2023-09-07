import ListView from "./component/ListView";
import { useEffect, useState } from "react";
import { getPayments } from "./datas/payments";
import { getBooks } from "./datas/books";
import { getCars } from "./datas/cars";
import { getDrivers } from "./datas/drivers";

function ReportList() {
    const paymentHeader = ["ID", "Amount", "Method", "Transation ID", "Status"];
    const bookingHeader = ["ID", "Booked Car", "Booked Driver", "Pickup Date", "Return Date", "Status"];
    const [paymentItems, setPaymentItems] = useState([]);
    const [bookingItems, setBookingItems] = useState([]);
    const [badge, setBadge] = useState();

    useEffect(() => {
        let mounted = true;
        setPaymentItems([]);
        setBookingItems([]);
        getPayments().then(data => {
            if(mounted) {
                data.filter(item => item.status === "PAID").forEach(e => {
                    setPaymentItems(prev => ([...prev, [e.id, e.amount + " ETB", e.method, e.tnx_id, e.status]]));
                    setBadge(4);
                });
            }
        });
        getBooks().then(data => {
            if(mounted) {
                data.filter(item => item.status === "RETURNED").forEach(e => {
                    var bookedCarName = 0;
                    var driverName = e.booked_driver;
                    getCars().then(r1 => {
                        getDrivers().then(r2 => {
                            
                            bookedCarName = r1.filter(car => car.id == e.booked_car)[0].name;
                            let booking_driver = r2.filter(car => car.id == e.booked_driver)[0];
                            driverName = booking_driver.first_name + " " + booking_driver.last_name;

                            setBookingItems(prev => ([...prev, [e.id, bookedCarName, driverName, e.pick_up_date, e.return_date, e.status]]));
                            setBadge(5);
                        });
                        
                    });
                    
                    
                });
            }
        });
        return () => mounted = false;
    }, []);

    return <div>
    <h2 className="pd-v-2 pd-h-1">Reports</h2>
        <div className="myCard">
            <h3 className="pd-v-2 pd-h-1">Paid Payments</h3>
            <ListView isReport={true} listHeader={paymentHeader} listItems={paymentItems}  badge={badge}></ListView>
        </div>
        <div className="myCard mg-t-2">
            <h3 className="pd-v-2 pd-h-1">Completed Booking</h3>
            <ListView isReport={true} listHeader={bookingHeader} listItems={bookingItems}  badge={badge}></ListView>
        </div>
    </div>
}

export default ReportList;