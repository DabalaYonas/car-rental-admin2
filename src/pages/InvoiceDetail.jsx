import "./InvoicesDetails.css";

function InvoiceDetail(props) {
    const invoice = {
        id: "#In1028393",
        date: "12 Oct, 2020",
        name: "Dabala Yonas",
        address: "Addis Ababa, Hayat zone 8",
        email: "robaman@gmail.com",
        phoneNumber: "091-001-2688",
        items:[
            {name:"Toyota Yaris", model:"Toyota", pricePerDay:2000, dayPeroid:5, total:10000},
        ],
        subTotal: 18300,
        tax: 1700,
        total: 20000,
    };

    return <div className="invoices">
    <div className="container invoice">
    <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div className="invoice-title">
                            <h4 className="float-end font-size-15">Invoice {invoice.id} <span className="badge bg-success font-size-12 ms-2">Paid</span></h4>
                            <div className="mb-4">
                               <h2 className="mb-1 text-muted">Car Rental</h2>
                            </div>
                            <div className="text-muted">
                                <p className="mb-1">Addis Ababa, Bole Ende Mall</p>
                                <p className="mb-1"><i className="uil uil-envelope-alt me-1"></i> dabo.yonasl@gmail.com</p>
                                <p><i className="uil uil-phone me-1"></i> 091-022-7023</p>
                            </div>
                        </div>
    
                        <hr className="my-4" />
    
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="text-muted">
                                    <h5 className="font-size-16 mb-3">Billed To:</h5>
                                    <h5 className="font-size-15 mb-2">{invoice.name}</h5>
                                    <p className="mb-1">{invoice.address}</p>
                                    <p className="mb-1">{invoice.email}</p>
                                    <p>{invoice.phoneNumber}</p>
                                </div>
                            </div>
                           
                            <div className="col-sm-6">
                                <div className="text-muted text-sm-end">
                                    <div>
                                        <h5 className="font-size-15 mb-1">Invoice No:</h5>
                                        <p>{invoice.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                                        <p>{invoice.date}</p>
                                    </div>
                                </div>
                            </div>
                      
                        </div>
                
                        
                        <div className="py-2">
                            <h5 className="font-size-15">Order Summary</h5>
    
                            <div className="table-responsive">
                                <table className="table align-middle table-nowrap table-centered mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{width: "70px"}}>No.</th>
                                            <th>Item</th>
                                            <th>Price per day</th>
                                            <th>Peroid</th>
                                            <th className="text-end" style={{width: "120px"}}>Total</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {invoice.items.map((item, id) => (
                                            <tr>
                                            <th scope="row">{id < 10 ? "0"+(id+1) : id+1}</th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14 mb-1">{item.name}</h5>
                                                    <p className="text-muted mb-0">{item.model}</p>
                                                </div>
                                            </td>
                                            <td>${item.pricePerDay}</td>
                                            <td>{item.dayPeroid > 1 ? item.dayPeroid + " days" : item.dayPeroid + " day"}</td>
                                            <td className="text-end">${item.total}</td>
                                        </tr>
                                        ))}

                                        <tr>
                                            <th scope="row" colspan="4" className="text-end">Sub Total</th>
                                            <td className="text-end">${invoice.subTotal}</td>
                                        </tr>
                                        
                                        <tr>
                                            <th scope="row" colspan="4" className="border-0 text-end">Tax</th>
                                            <td className="border-0 text-end">${invoice.tax}</td>
                                        </tr>
                                        
                                        <tr>
                                            <th scope="row" colspan="4" className="border-0 text-end">Total</th>
                                            <td className="border-0 text-end"><h4 className="m-0 fw-semibold">${invoice.total}</h4></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-print-none mt-4">
                                <div className="float-end">
                                    <a href="javascript:window.print()" className="btn btn-primary me-1"><i className="bi bi-printer"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
}

export default InvoiceDetail;