import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import Pagination from "./Pagination/Pagination";


async function deleteItem(url, id) {
    return axios.delete("http://127.0.0.1:8000/" + url + "/api/" + id + "/");
}

async function makeAvailableCar(id, is_available, navigate) {
    let formData = new FormData();
    axios.get("http://127.0.0.1:8000/cars/api/" + id + "/").then(response => response.data).then(car => {
        // console.log(car);
        Object.entries(car).forEach(([key, value]) => {
            if (key === "is_available") {
                formData.append("is_available", is_available);
            } else {
                if (value !== null) {
                    if (key !== "images") {
                        formData.append(key, value);   
                    }
                }
            }
        });

        axios.put("http://127.0.0.1:8000/cars/api/" + id + "/", formData, {headers: {'content-type': 'multipart/form-data'}}).then(response => response.data).then(data => {
            navigate(0);
        });
    });
}


async function markPaid(id, is_paid, navigate) {
    let formData = new FormData();
    axios.get("http://127.0.0.1:8000/booking/payment/api/" + id + "/").then(response => response.data).then(payment => {
        // console.log(car);
        Object.entries(payment).forEach(([key, value]) => {
            if (key === "status") {
                formData.append("status", is_paid);
            } else {
                formData.append(key, value);
            }
        });

        axios.put("http://127.0.0.1:8000/booking/payment/api/" + id + "/", formData).then(response=>response.data).then(data => {
            navigate(0);
        });
    });
}


async function setBookingStatus(id, status, navigate) {
    let formData = new FormData();
    axios.get("http://127.0.0.1:8000/booking/api/" + id + "/").then(response => response.data).then(booking => {
        // console.log(car);
        Object.entries(booking).forEach(([key, value]) => {
            if (key === "status") {
                formData.append("status", status);
                console.log(status);
            } else {
                formData.append(key, value);
            }
        });

        axios.put("http://127.0.0.1:8000/booking/api/" + id + "/", formData).then(response=>response.data).then(data => {
            navigate(0);
        });
    });
}

const [PENDING, ACCEPTED, CANCELLED, COMPLETED, RETURNED, PAID, NOT_PAID] = ["PENDING", "ACCEPTED", "CANCELLED", "COMPLETED", "RETURNED", "PAID", "NOT PAID"];

function ListView(props) {
    const ENABLE = 0;
    const DISABLE = 1;
    const navigate = useNavigate();
    const [checks, setChecks] = useState([]);
    const [url, setUrl] = useState();
    const [showDelete, setShowDelete] = useState(false);

    const [showPaidModal, setShowPaidModal] = useState(false);
    const [showUnpaidModal, setShowUnpaidModal] = useState(false);
    const [showAvailableModal, setShowAvailableModal] = useState(false);
    const [showUnavailableModal, setShowUnavailableModal] = useState(false);
    const [showAcceptedModal, setShowAcceptedModal] = useState(false);
    const [showCancelledModal, setShowCancelledModal] = useState(false);
    const [showReturnedModal, setShowReturnedModal] = useState(false);

    const [showDeleteAll, setShowDeleteAll] = useState(false);

    const [selectedId, setSelectedId] = useState(0);
    const [selectedItemList, setSelectedItemList] = useState([]);
    const [pages, setPages] = useState([[]]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        let mounted = true;
          if(mounted) {
            let data = props.listItems;
            var j = 0;
            let itemsPageList = [];
            var a = [];
            for (let i = 0; i < data.length; i++) {
              const item = data[i];
              a[i] = item;
              if ((i+1) % 11 === 0) {
                itemsPageList[j] = a;
                j = j + 1;
                a = [];
              }
              if (i === (data.length - 1) && a.length > 0) {
                itemsPageList[j] = a;
              }
            }
            setPages(itemsPageList);
            
            setUrl(props.url);
            if (props.url === "driver" || props.url === "customer" || props.url === "payment" || props.url === "agreement") {
                setUrl("booking/" + props.url);
            }

            if (props.url === "car") {
                setUrl("cars");
            }
          }

        return () => mounted = false;
      }, [props.listItems, props.url]);
    
    function handlerSelectAll(e) {
        setSelectedItemList([]);
        var isChecked = e.target.checked;
        var checkboxs = document.getElementsByClassName("checkboxSingle");
        if (isChecked) {
            for(let checkbox of checkboxs){
                checkbox.checked = true;
            }
            toggleActionButtons(ENABLE);
            for(let item of pages[currentPage]) {
                setSelectedItemList(prev => ([...prev, item[0]]));
            }
        } else {
            for(let checkbox of checkboxs){
                checkbox.checked = false;
            }
            toggleActionButtons(DISABLE);
        }
    }

    function handleChange(e, id) {
        if (e.target.checked) {
            setSelectedItemList(prev => ([...prev, id]));
        } else {
            setSelectedItemList(selectedItemList.filter(item => item !== id));
        }
        var checkboxs = document.getElementsByClassName("checkboxSingle");
        var checkAll = document.getElementById("check_all");

        let isAllChecked = true;
        let isAllUnChecked = true;
        for (let i = 0; i < checkboxs.length; i++) {
            const checkbox = checkboxs[i]; 

            if (checkbox.checked) {
                toggleActionButtons(ENABLE);
                isAllUnChecked = false;
            }
            
            // Uncheck select-all checkbox when all of them aren't checked
            if (!checkbox.checked) {
                checkAll.checked = false;
                isAllChecked = false;
            }

            // Set checked select-all checkbox when all of them are checked
            if (i === (checkboxs.length - 1) && isAllChecked) {
                checkAll.checked = true;
            }
            if (i === (checkboxs.length - 1) && isAllUnChecked) {
                toggleActionButtons(DISABLE);
            }
        }

        
    }

    function handleShowDelete(id) {
        setShowDelete(true);
        setSelectedId(id);
    }

    function handleDelete() {
        deleteItem(url, selectedId);
        setShowDelete(false);
        // navigate(0);
    }

    function toggleActionButtons(state) {
        let btns = document.getElementsByClassName("action-disabled");

        for(let btn of btns) {
            if (state === ENABLE) {
                btn.classList.add("active");
            } else if (state === DISABLE) {
                btn.classList.remove("active");
            }
        }
    }

    function handleDeleteAll() {
         selectedItemList.forEach(id => {
            deleteItem(url, id);
         });
         setShowDeleteAll(false);
         navigate(0);
    }

    function handleAvailable(is_available) {
         selectedItemList.forEach(id => {
            makeAvailableCar(id, is_available, navigate);
         });
         setShowAvailableModal(false);
         setShowUnavailableModal(false);
    }

    function handlePaid(status) {
        selectedItemList.forEach(id => {
           markPaid(id, status, navigate);
        });
        setShowPaidModal(false);
        setShowUnpaidModal(false);
    }

    function handleBookingStatus(status) {
        selectedItemList.forEach(id => {
            setBookingStatus(id, status, navigate);
        });
        setShowAcceptedModal(false);
        setShowCancelledModal(false);
        setShowReturnedModal(false);
    }

    function handleAddNew() {
        navigate("/add-" + props.url);
    }

    return <div>
        {!props.isReport && !props.notAdd && (<div className="action-button active" style={{float: "right", clear: "both"}} onClick={handleAddNew}><i className="bi bi-plus"></i> Add new {props.url}</div>)}
        <div className="mg-b-2" style={{overflow: "hidden", overflowX: "auto"}}>
            {props.isAvailableAction && (<div className="action-disabled action-button" onClick={() => {setShowAvailableModal(true)}}><i className="bi bi-check2-circle" style={{color: "#28a745"}}></i> Set available</div>)}
            {props.isPaidAction && (<div className="action-disabled action-button" onClick={() => {setShowPaidModal(true)}}><i className="bi bi-check2-circle" style={{color: "#28a745"}}></i> Mark as paid</div>)}
            {props.isAcceptedAction && (<div className="action-disabled action-button" onClick={() => {setShowAcceptedModal(true)}}><i className="bi bi-check2-circle" style={{color: "#28a745"}}></i> Mark as accepted</div>)}
            {props.isReturnedAction && (<div className="action-disabled action-button" onClick={() => {setShowReturnedModal(true)}}><i className="bi bi-check2-circle" style={{color: "#28a745"}}></i> Mark as returned</div>)}
            {props.isAvailableAction && (<div className="action-disabled action-button" onClick={() => {setShowUnavailableModal(true)}}><i className="bi bi-x-circle" style={{color: "#dc3545"}}></i> Set unavailable</div>)}
            {props.isPaidAction && (<div className="action-disabled action-button" onClick={() => {setShowUnpaidModal(true)}}><i className="bi bi-x-circle" style={{color: "#dc3545"}}></i> Mark as unpaid</div>)}
            {props.isCancelled && (<div className="action-disabled action-button" onClick={() => {setShowCancelledModal(true)}}><i className="bi bi-x-circle" style={{color: "#dc3545"}}></i> Mark as cancelled</div>)}
            
            {!props.isReport && <div className="action-disabled action-button" onClick={() => {setShowDeleteAll(true)}}><i className="bi bi-trash"></i> Delete</div>}
        </div>
        <div className="myCard-body">
                <div style={{overflow: "auto"}}>
                    <table>
                        <thead>{props.listHeader.length > 0 &&
                            <tr className="table-header">
                                {!props.isReport && <th><div className="checkbox-table">
                                    <input type="checkbox" id="check_all" className="checkbox" onClick={handlerSelectAll}/>
                                </div></th>}
                                {props.listHeader.map((item, i) => (
                                    <th style={{textAlign: "center"}}  key={i}>{item}</th>
                                ))}
                                {!props.isReport && <th style={{textAlign: "start"}}>Actions</th>}
                            </tr>
                            }
                        </thead>  
                        
                        <tbody>
                        {pages.length > 0 && pages[currentPage].map((item, index) => (
                            <tr key={index} index={index}>
                                {!props.isReport && <td><div className="checkbox-table">
                                    <input type="checkbox" className="checkbox checkboxSingle" onChange={(e) => handleChange(e, item[0])}/>
                                </div></td>}
                                
                                {item.map((e, i) => (
                                    <td style={{textAlign: "center"}} key={i}  onClick={() => props.handleClick(item[0])}>
                                        {typeof(e) === 'boolean' ? (e ? <i className="bi bi-check-circle-fill text-success-color"></i> : <i className="bi bi-x-circle-fill text-error-color"></i>)  
                                        : (props.badge === i ? (<Badge key={i}>{e}</Badge>) : e)}
                                    </td>
                                ))}
                                {!props.isReport && <td style={{fontSize: "1.2em"}}>
                                    <i className="bi bi-trash" style={{marginRight: "20px"}} onClick={() => handleShowDelete(item[0])}></i>
                                    {!props.notEdit && <Link to={"/edit-" + props.url} state={{ selectedData: props.data.filter(data => data.id === item[0])}} ><i className="bi bi-pencil-square"></i></Link>}
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <div className="pd-v-1">
                    <Pagination total={pages.length} currentPage={currentPage} changeCurrentPage={setCurrentPage}></Pagination>
                </div>
            </div>
            {showDelete && <Modal title={"Delete "}
                            btn1="Cancel" 
                            btn2="Delete" 
                            btn1Clicked={() => {setShowDelete(false);}} 
                            btn2Clicked={handleDelete}
                            btn2ColorClass="btn-danger">Are you sure, you want to delete this item?</Modal>}
            {showDeleteAll && <Modal title={"Delete All"}
                            btn1="Cancel" 
                            btn2="Delete" 
                            btn1Clicked={() => {setShowDeleteAll(false);}} 
                            btn2Clicked={handleDeleteAll}
                            btn2ColorClass="btn-danger">Are you sure, you want to delete all item?</Modal>}
            {showAvailableModal && <Modal title={"Mark as available"}
                            btn1="Cancel" 
                            btn2="Update" 
                            btn1Clicked={() => {setShowAvailableModal(false);}} 
                            btn2Clicked={() => handleAvailable(true)}>Are you sure, you want to make available this cars?</Modal>}
            {showUnavailableModal && <Modal title={"Mark as unavailable"}
                            btn1="Cancel" 
                            btn2="Update" 
                            btn1Clicked={() => {setShowUnavailableModal(false);}} 
                            btn2Clicked={() => handleAvailable(false)}>Are you sure, you want to make unavailable this cars?</Modal>}
            {showPaidModal && <Modal title={"Mark as paid"}
                            btn1="Cancel" 
                            btn2="Update" 
                            btn1Clicked={() => {setShowPaidModal(false);}} 
                            btn2Clicked={() => handlePaid(PAID)}>Are you sure, you want to make mark as paid this payments?</Modal>}
            {showUnpaidModal && <Modal title={"Mark as unpaid"}
                            btn1="Cancel" 
                            btn2="Update" 
                            btn1Clicked={() => {setShowUnpaidModal(false);}} 
                            btn2Clicked={() => handlePaid(NOT_PAID)}>Are you sure, you want to make mark as unpaid this payments?</Modal>}
            {showAcceptedModal && <Modal title={"Mark as accepted"}
                            btn1="Cancel" 
                            btn2="Update" 
                            btn1Clicked={() => {setShowAcceptedModal(false);}} 
                            btn2Clicked={() => handleBookingStatus(ACCEPTED)}>Are you sure, you want to mark as accepte this bookings?</Modal>}
            {showReturnedModal && <Modal title={"Mark as completed"}
                            btn1="Cancel" 
                            btn2="Update" 
                            btn1Clicked={() => {setShowReturnedModal(false);}} 
                            btn2Clicked={() => handleBookingStatus(RETURNED)}>Are you sure, you want to mark as completed this bookings?</Modal>}
            {showCancelledModal && <Modal title={"Mark as cancelled"}
                            btn1="Cancel" 
                            btn2="Update" 
                            btn1Clicked={() => {setShowCancelledModal(false);}} 
                            btn2Clicked={() => handleBookingStatus(CANCELLED)}>Are you sure, you want to cancel this bookings?</Modal>}
    </div>
}

function Badge({children}) {
    var bgColor;
    switch (children) {
        case PENDING:
            bgColor = "bg-success";
            break;

        case ACCEPTED:
            bgColor = "bg-primary";
            break;

        case CANCELLED:
            bgColor = "bg-error";
            break;
            
        case COMPLETED:
            bgColor = "bg-primary";
            break;
            
        case RETURNED:
            bgColor = "bg-primary";
            break;
            
        case PAID:
            bgColor = "bg-primary";
            break;
            
        case NOT_PAID:
            bgColor = "bg-error";
            break;
    
        default:
            bgColor = "transparence";
            break;
    }

    return <span style={{textAlign: "center"}} className={"badge " + bgColor}>{children}</span>
}

export default ListView;