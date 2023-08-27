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
    <div class="container invoice">
    <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="invoice-title">
                            <h4 class="float-end font-size-15">Invoice {invoice.id} <span class="badge bg-success font-size-12 ms-2">Paid</span></h4>
                            <div class="mb-4">
                               <h2 class="mb-1 text-muted">Car Rental</h2>
                            </div>
                            <div class="text-muted">
                                <p class="mb-1">Addis Ababa, Bole Ende Mall</p>
                                <p class="mb-1"><i class="uil uil-envelope-alt me-1"></i> dabo.yonasl@gmail.com</p>
                                <p><i class="uil uil-phone me-1"></i> 091-022-7023</p>
                            </div>
                        </div>
    
                        <hr class="my-4" />
    
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Billed To:</h5>
                                    <h5 class="font-size-15 mb-2">{invoice.name}</h5>
                                    <p class="mb-1">{invoice.address}</p>
                                    <p class="mb-1">{invoice.email}</p>
                                    <p>{invoice.phoneNumber}</p>
                                </div>
                            </div>
                           
                            <div class="col-sm-6">
                                <div class="text-muted text-sm-end">
                                    <div>
                                        <h5 class="font-size-15 mb-1">Invoice No:</h5>
                                        <p>{invoice.id}</p>
                                    </div>
                                    <div class="mt-4">
                                        <h5 class="font-size-15 mb-1">Invoice Date:</h5>
                                        <p>{invoice.date}</p>
                                    </div>
                                </div>
                            </div>
                      
                        </div>
                
                        
                        <div class="py-2">
                            <h5 class="font-size-15">Order Summary</h5>
    
                            <div class="table-responsive">
                                <table class="table align-middle table-nowrap table-centered mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{width: "70px"}}>No.</th>
                                            <th>Item</th>
                                            <th>Price per day</th>
                                            <th>Peroid</th>
                                            <th class="text-end" style={{width: "120px"}}>Total</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {invoice.items.map((item, id) => (
                                            <tr>
                                            <th scope="row">{id < 10 ? "0"+(id+1) : id+1}</th>
                                            <td>
                                                <div>
                                                    <h5 class="text-truncate font-size-14 mb-1">{item.name}</h5>
                                                    <p class="text-muted mb-0">{item.model}</p>
                                                </div>
                                            </td>
                                            <td>${item.pricePerDay}</td>
                                            <td>{item.dayPeroid > 1 ? item.dayPeroid + " days" : item.dayPeroid + " day"}</td>
                                            <td class="text-end">${item.total}</td>
                                        </tr>
                                        ))}

                                        <tr>
                                            <th scope="row" colspan="4" class="text-end">Sub Total</th>
                                            <td class="text-end">${invoice.subTotal}</td>
                                        </tr>
                                        
                                        <tr>
                                            <th scope="row" colspan="4" class="border-0 text-end">Tax</th>
                                            <td class="border-0 text-end">${invoice.tax}</td>
                                        </tr>
                                        
                                        <tr>
                                            <th scope="row" colspan="4" class="border-0 text-end">Total</th>
                                            <td class="border-0 text-end"><h4 class="m-0 fw-semibold">${invoice.total}</h4></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-print-none mt-4">
                                <div class="float-end">
                                    <a href="javascript:window.print()" class="btn btn-primary me-1"><i class="bi bi-printer"></i></a>
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