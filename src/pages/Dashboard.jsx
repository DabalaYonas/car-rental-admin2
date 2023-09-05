import Card from "./component/Card";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { getCars } from "./datas/cars";
import { getBooks } from "./datas/books";
import { getDrivers } from "./datas/drivers";
import { getPayments } from "./datas/payments";


function Dashboard() {
    var [carSeries, setCarSeries] = useState([0, 0, 0, 0]);
    var [carOptions, setCarOptions] = useState({"series": carSeries, "labels": ['On Rented', 'Avaliable', 'Reserve', 'Accident']});

    var [bookList, setBookList] = useState([]);
    var [driverList, setDriverList] = useState([]);
    var [paymentList, setPaymentList] = useState([]);

    const [totalCar, setTotalCar] = useState(0);
    const [availableCar, setAvailableCar] = useState(0);
    const [onRentCar, setOnRentCar] = useState(0);
    const [reserveCar, setReserveCar] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [pendingPayment, setPendingPayment] = useState(0);
    const [pendingBooking, setPendingBooking] = useState(0);

    useEffect(() => {
        let mounted = true;

        getCars().then(data => {
        if(mounted) {
            setTotalCar(data.length);
            var a = data.filter(item => item.is_available == true).length;
            setAvailableCar(a);
            setReserveCar(data.length - a);
        }
        });

        getBooks().then(data => {
        if(mounted) {
            setBookList(data);
            setPendingBooking(data.filter(item => item.status == "PENDING").length);
            setOnRentCar(data.filter(item => item.status == "ACCEPTED").length);
        }
        });

        getDrivers().then(data => {
        if(mounted) {
            setDriverList(data);
        }
        });

        getPayments().then(data => {
        if(mounted) {
            setPaymentList(data);
            setPendingPayment(data.filter(item => item.status == "PENDING").length);
            var t = 0;
            data.filter(item => item.status == "PAID").forEach(element => {
                t += element.amount;
            });
            setRevenue(t);
        }
        });

        setCarSeries([onRentCar, availableCar, reserveCar, 0]);
        return () => mounted = false;
    }, [availableCar]);


    var options2 = {
        chart: {id: "basic-bar"},
        xaxis: {categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]},
        stroke: {
            curve: 'smooth',
        }
    };

    var series2 = [{
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
    },{
        name: "series-1",
        data: [30, 20, 45, 50, 79, 60, 70, 91],
    }]
    
    return <div>
        <h1 className="header-big">Dashboard</h1>
        <div className="row">
            <div className="col-3 pd-h-1 pd-v-1">
                <Card title="Total car" text={totalCar} iconClass="bi bi-car-front-fill" cardBg="1"/>
            </div>
            <div className="col-3 pd-h-1 pd-v-1">
                <Card title="Available car" text={availableCar} iconClass="bi bi-currency-exchange" cardBg="2"/>
            </div>
            <div className="col-3 pd-h-1 pd-v-1">
                <Card title="Pending Booking" text={pendingBooking} iconClass="bi bi-currency-exchange" cardBg="3"/>
            </div>
            <div className="col-3 pd-h-1 pd-v-1">
                <Card title="Pending Payment" text={pendingPayment} iconClass="bi bi-currency-exchange" cardBg="4"/>
            </div>
            <div className="col-3 pd-h-1 pd-v-1">
                <Card title="Revenue" text={revenue + " ETB"} iconClass="bi bi-currency-exchange" cardBg="5"/>
            </div>
        </div>
        <div className="row">
            <div className="col-4 pd-h-1 pd-v-1">
                <div className="myCard">
                    <div className="myCard-header">
                        <h3>Car static</h3>
                    </div>
                    <Chart options={carOptions} series={carSeries} width="400" type="donut" />
                </div>
            </div>
            <div className="col-n-w pd-h-1 pd-v-1">
                <div className="myCard">
                    <div className="myCard-header">
                        <h3>Income static</h3>
                    </div>
                    <Chart options={options2} series={series2} width="500" type="line" />
                </div>
            </div>
        </div>
    </div>
}

export default Dashboard;