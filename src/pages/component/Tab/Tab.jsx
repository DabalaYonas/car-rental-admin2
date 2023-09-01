import React from "react";
import "./Tab.css";

let TabsContext = React.createContext();

function Tabs(props) {

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
                    <TabsContext.Provider value={[]}>
                        {props.children}
                    </TabsContext.Provider>
                    {/* <a className="tab active" onClick={updateTabs}>All Booking</a>
                    <a className="tab" onClick={updateTabs}>Pending</a>
                    <a className="tab" onClick={updateTabs}>Accepted</a>
                    <a className="tab" onClick={updateTabs}>Cancelled</a>
                    <a className="tab" onClick={updateTabs}>Completed</a> */}
                </div>
            </div>
        </div>
    </div>
}

function Tab({children, onClick, isActive}) {
    function updateTabs(e) {
        var children = e.target.parentElement.children;
        for (let i = 0; i < children.length; i++) {
            children[i].classList.remove("active");
        }
        e.target.classList.add("active");
        
    }

    return <>{isActive ? (<a className="tab active" onClick={(e) => {updateTabs(e); onClick();}}>{children}</a>) :
     ( <a className="tab" onClick={(e) => {updateTabs(e); onClick();}}>{children}</a>)}</>;
}

Tabs.Tab = Tab;

export default Tabs;