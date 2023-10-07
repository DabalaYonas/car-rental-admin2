import { useEffect, useState } from "react";
import { getPayments } from "./datas/payments";
import ListView from "./component/ListView";
import { useNavigate } from "react-router-dom";
import { getAgreements, getBooking, getBooks } from "./datas/books";
import Tabs from "./component/Tab/Tab";
import { getCustomer } from "./datas/customer";
import { getCar } from "./datas/cars";
import { getBrand, getColor, getModel } from "./datas/lookup";

function Agreements() {
    const [ALL, PENDING, PAID, NOT_PAID] = ["ALL", "PENDING", "PAID", "NOT PAID"];
    
    const navigate = useNavigate();
    const listHeader = ["ID", "Booked ID", "Customer", "Agreement Date", "Status"];
    const [listItems, setListItems] = useState([]);
    const [agreementList, setAgreementList] = useState([]);
    const [badge, setBadge] = useState();

    useEffect(() => {
        let mounted = true;
        setListItems([]);
        getAgreements().then(data => {
            if(mounted) {
                setAgreementList(data);
                data.forEach(e => {
                    getBooking(e.booking).then(response => {
                        getCustomer(response.customer).then(customer => {
                            setListItems(prev => ([...prev, [e.id, response.id , customer.first_name + " " + customer.last_name, e.date, response.status]]));
                            setBadge(4)
                        });
                    });
                });
            }
        });
        return () => mounted = false;
    }, []);

    function handleClick(id) {
        let clickedAgreement = agreementList.filter(agreement => agreement.id == id)[0];
        let infos = {};
        getBooking(clickedAgreement.booking).then(booking => {
            infos.pickupdate = booking.pick_up_date;
            infos.return_date = booking.return_date;
            infos.deposit = clickedAgreement.deposit;
            getCar(booking.booked_car).then(car => {
                infos.carName = car.name;
                infos.plate_number = car.plate_number;
                infos.model_year = car.model_year;
                infos.pricePerDay = car.price_per_day;
                getCustomer(booking.customer).then(customer => {
                    infos.fullName = customer.first_name + " " + customer.last_name;
                    getModel(car.model).then(model => {
                        infos.model = model.model; 
                        getColor(car.color).then(color => {
                            infos.color = color.color;
                            getBrand(car.brand).then(brand => {
                                infos.brand = brand.brand;
                       
                                navigate("/agreement-details", {state: {infos: infos, signatureURL: clickedAgreement.signature}});
                            });
                        });
                        
                    });
                });
            });
        });
    }

    function handleTabClick(n) {
        function filterPayment(status) {
            setListItems([]);
            return n === ALL ? 
                agreementList.forEach(e => {
                    setListItems(prev => ([...prev, [e.id, e.amount + " ETB", e.method, e.tnx_id, e.status]]));
            }) : agreementList.filter(item => item.status == status).forEach(e => {
                setListItems(prev => ([...prev, [e.id, e.amount + " ETB", e.method, e.tnx_id, e.status]]));
            });
        }

        switch (n) {
            case ALL:
                filterPayment(ALL);
                break;
                
            case PENDING:
                filterPayment(PENDING);
                break;    

            case PAID:
                filterPayment(PAID);
                break;     

            case NOT_PAID:
                filterPayment(NOT_PAID);
                break;      
        }   
    }

    return <div>
        <h2 className="pd-v-2 pd-h-1">Agreements</h2>
        <Tabs>
            <Tabs.Tab isActive={true} onClick={() => handleTabClick(ALL)}>All Agreements</Tabs.Tab>
            <Tabs.Tab onClick={() => handleTabClick(PENDING)}>Pending</Tabs.Tab>
            <Tabs.Tab onClick={() => handleTabClick(PAID)}>Paid</Tabs.Tab>
            <Tabs.Tab onClick={() => handleTabClick(NOT_PAID)}>Not Paid</Tabs.Tab>
        </Tabs>
        <div className="myCard">
            <h3 className="pd-v-2 pd-h-1">Agreements List</h3>
            <ListView listHeader={listHeader} listItems={listItems} data={agreementList} url={"agreement"} handleClick={handleClick} badge={badge} notEdit={true}></ListView>
        </div>
    </div>
}

export default Agreements;