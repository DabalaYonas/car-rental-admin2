import ListView from "./component/ListView";

function InvoiceList() {
    const listHeader = ["Invoice ID", "Invoice to", "Amount", "Status"];
    const listItems = [
        [],];

    return <div>
    <h3 className="pd-v-2 pd-h-1">Invoices</h3>
        <div className="myCard">
            <h3 className="pd-v-2 pd-h-1">Invoices</h3>
            <ListView listHeader={listHeader} listItems={listItems}></ListView>
        </div>
    </div>
}

export default InvoiceList;