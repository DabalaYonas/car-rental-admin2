import { useEffect, useState } from "react";
import { getPayments } from "./datas/payments";
import ListView from "./component/ListView";
import { useNavigate } from "react-router-dom";
import { getBooks } from "./datas/books";
import Tabs from "./component/Tab/Tab";

function PaymentList() {
    const [ALL, PENDING, PAID, NOT_PAID] = ["ALL", "PENDING", "PAID", "NOT PAID"];
    
    const navigate = useNavigate();
    const listHeader = ["ID", "Amount", "Method", "Transation ID", "Status"];
    const [listItems, setListItems] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [badge, setBadge] = useState();

    useEffect(() => {
        let mounted = true;
        setListItems([]);
        getPayments().then(data => {
            if(mounted) {
                setPaymentList(data);
                data.forEach(e => {
                    setListItems(prev => ([...prev, [e.id, e.amount + " ETB", e.method, e.tnx_id, e.status]]));
                    setBadge(4);
                });
            }
        });
        return () => mounted = false;
    }, []);

    function handleClick(id) {
        const selectedPayment = paymentList.filter(payment => payment.id === id);
        navigate("/edit-payment", {state: {"selectedPayment": selectedPayment}});
    }

    function handleTabClick(n) {
        function filterPayment(status) {
            setListItems([]);
            return n === ALL ? 
                paymentList.forEach(e => {
                    setListItems(prev => ([...prev, [e.id, e.amount + " ETB", e.method, e.tnx_id, e.status]]));
            }) : paymentList.filter(item => item.status == status).forEach(e => {
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
        <h2 className="pd-v-2 pd-h-1">Payment</h2>
        <Tabs>
            <Tabs.Tab isActive={true} onClick={() => handleTabClick(ALL)}>All Payment</Tabs.Tab>
            <Tabs.Tab onClick={() => handleTabClick(PENDING)}>Pending</Tabs.Tab>
            <Tabs.Tab onClick={() => handleTabClick(PAID)}>Paid</Tabs.Tab>
            <Tabs.Tab onClick={() => handleTabClick(NOT_PAID)}>Not Paid</Tabs.Tab>
        </Tabs>
        <div className="myCard">
            <h3 className="pd-v-2 pd-h-1">Payment List</h3>
            <ListView listHeader={listHeader} listItems={listItems} data={paymentList} url={"payment"} handleClick={handleClick} badge={badge}
            isPaidAction="ture" notAdd={true}></ListView>
        </div>
    </div>
}

export default PaymentList;