import "./Tab.css";

function Tab(props) {

    function updateTabs(e) {
        var children = e.target.parentElement.children;
        for (let i = 0; i < children.length; i++) {
            children[i].classList.remove("active");
        }
        e.target.classList.add("active");
    }

   
    return <div>
        <div id="responsive" className="content">
            <div className="responsive">
                <div className="tabs">
                    <a className="tab active" onClick={updateTabs}>All Booking</a>
                    <a className="tab" onClick={updateTabs}>Pending</a>
                    <a className="tab" onClick={updateTabs}>Accepted</a>
                    <a className="tab" onClick={updateTabs}>Cancelled</a>
                    <a className="tab" onClick={updateTabs}>Completed</a>
                </div>
            </div>
        </div>
    </div>
}

export default Tab;