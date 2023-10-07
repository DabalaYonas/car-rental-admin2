import Card from "./component/Card";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { getCars } from "./datas/cars";
import { getBooks } from "./datas/books";
import { getDrivers } from "./datas/drivers";
import { getPayments } from "./datas/payments";


function Dashboard() {
    var [carSeries, setCarSeries] = useState([0, 0, 0, 0]);
    var [seriesPayment, setSeriesPayment] = useState([{data: [0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0]}]);
    var [seriesBooking, setSeriesBooking] = useState([{data: [0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0]}]);
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
    const [paidPayments, setPaidPayments] = useState([]);
    const [pendingBooking, setPendingBooking] = useState(0);

    var optionPayment = {
        chart: {id: "income-bar"},
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        }
      };

    useEffect(() => {
        let mounted = true;
        const currentDate = new Date();

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
            var newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            setBookList(data);
            setPendingBooking(data.filter(item => item.status == "PENDING").length);
            setOnRentCar(data.filter(item => item.status == "ACCEPTED").length);
            data.filter(item => item.status == "ACCEPTED").forEach(element => {
                var date = new Date(element.pick_up_date);
                if (currentDate.getFullYear() === date.getFullYear()) {
                    newData[date.getMonth()-1] = newData[date.getMonth()-1] + 1;
                }
            });
            setSeriesBooking([{data: newData}]);
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
            var newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            data.filter(item => item.status == "PAID").forEach(element => {
                t += element.amount;
                var date = new Date(element.paid_date);
                if (currentDate.getFullYear() === date.getFullYear()) {
                    newData[date.getMonth()-1] = newData[date.getMonth()-1] + element.amount;
                }
            });

            setRevenue(t);
            setSeriesPayment([{data: newData}]);
        }
        });

        setCarSeries([onRentCar, availableCar, reserveCar, 0]);
        return () => mounted = false;
    }, [availableCar]);

    
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
                <Card title="Total Revenue" text={revenue + " ETB"} iconClass="bi bi-currency-exchange" cardBg="5"/>
            </div>
        </div>

        <div className="row">
            <div className="col-n-w pd-h-1 pd-v-1">
                <div className="myCard">
                    <div className="myCard-header">
                        <h3>This Year Incomes</h3>
                    </div>
                    <Chart options={optionPayment} series={seriesPayment} width="500" type="area" />
                </div>
            </div>
            <div className="col-n-w pd-h-1 pd-v-1">
                <div className="myCard">
                    <div className="myCard-header">
                        <h3>This Year Booking</h3>
                    </div>
                    <Chart options={optionPayment} series={seriesBooking} width="500" type="area" />
                </div>
            </div>
            
            <div className="col-4 pd-h-1 pd-v-1">
                <div className="myCard">
                    <div className="myCard-header">
                        <h3>Car Statuses</h3>
                    </div>
                    <Chart options={carOptions} series={carSeries} width="400" type="donut" />
                </div>
            </div>
        </div>
    </div>
}

export default Dashboard;