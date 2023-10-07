import { useEffect, useState } from "react";
import { getCustomers } from "./datas/customer";
import ListView from "./component/ListView";
import { useNavigate } from "react-router-dom";


function CustomerList() {
    const navigate = useNavigate();
    var [customerList, setCustomerList] = useState([]);
    
    const listHeader = ["ID", "Name", "Email", "Phone number", "Age"];
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        let mounted = true;
        setListItems([]);
        setCustomerList([]);
        getCustomers().then(data => {
            if(mounted) {
                setCustomerList(data);
                data.forEach(e => {
                    setListItems(prev => ([...prev, [e.id, e.first_name + " " + e.last_name, e.email, e.phone_number, e.age]]));
                });
            }
        });
        return () => mounted = false;
    }, []);


    function handleClick(id) {
        const selectedCustomer = customerList.filter(customer => customer.id == id);
        navigate("/edit-customer", {state: {"selectedCustomer": selectedCustomer}});
    }

    return <div>
        <h2 className="pd-v-2 pd-h-1">Customer</h2>
            <div className="myCard">
                <h3 className="pd-v-2 pd-h-1">Customer List</h3>
                <ListView listHeader={listHeader} listItems={listItems} handleClick={handleClick} data={customerList} url={"customer"} ></ListView>
            </div>
        </div>
}

export default CustomerList;