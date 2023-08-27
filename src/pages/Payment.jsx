import { useEffect, useState } from "react";
import { getPayments } from "./datas/payments";
import ListView from "./component/ListView";
import { useNavigate } from "react-router-dom";
import { getBooks } from "./datas/books";

function PaymentList() {
    const navigate = useNavigate();
    const listHeader = ["ID", "Amount", "Method", "Transation ID", "Status"];
    const [listItems, setListItems] = useState([]);
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        let mounted = true;
        getPayments().then(data => {
            if(mounted) {
                setCarList(data);
                data.forEach(e => {
                    var bookedCarName = 0;
                    getBooks().then(r1 => {    
                        bookedCarName = r1.filter(car => car.id == e.booking)[0].name;
                        setListItems(prev => ([...prev, [e.id, e.amount + " ETB", e.method, e.tnx_id, e.status]]));
                    });
                });
            }
        });
        return () => mounted = false;
    }, []);

    function handleClick(id) {
        const selectedCar = carList.filter(car => car.id == id);
        navigate("/edit-vehicle", {state: {"selectedCar": selectedCar}});
    }

    return <div>
        <h3 className="pd-v-2 pd-h-1">Payment</h3>
            <div className="myCard">
                <h3 className="pd-v-2 pd-h-1">Payment List</h3>
                <ListView listHeader={listHeader} listItems={listItems} handleClick={handleClick}></ListView>
            </div>
        </div>
}

export default PaymentList;