import { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function SideBar(props) {
    var [sidebarState, setSidebarState] = useState(true);

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("logo").style.visibility = "visible";
        var menuitems = document.getElementsByClassName("sidebar-body-title");
        for (let i = 0; i < menuitems.length; i++) {
            menuitems[i].style.display = "inline";
        }
        setSidebarState(true);
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "80px";
        document.getElementById("main").style.marginLeft = "80px";
        document.getElementById("logo").style.visibility = "hidden";
        var menuitems = document.getElementsByClassName("sidebar-body-title");
        for (let i = 0; i < menuitems.length; i++) {
            menuitems[i].style.display = "none";
        }
        setSidebarState(false);
    }

    function handlerDropdown(e) {
        // console.log(e);
        // e.target.classList.toggle("active");
        // var submenusContainer = e.target.nextElementSibling;
        // console.log(submenusContainer.style);
        // if(submenusContainer.style.display == "none") {
        //     submenusContainer.style.display = "block";
        // } else {
        //     submenusContainer.style.display = "none";
        // }
    }

    return <div>
        <div id="mySidenav" className="sidenav">
            <div className="sidebar-header align-center">
                <h1 id="logo">Logo</h1>
                {sidebarState ?  <span className="closebtn" onClick={closeNav}><i className="bi bi-list"></i></span> : 
                <span className="closebtn" onClick={openNav}><i className="bi bi-list"></i></span>}
            </div>

            <div className="sidebar-body">
                <ul>
                <li><Link to="/"><i className="bi bi-house-door-fill"></i><span className="sidebar-body-title">Dashboard</span></Link></li>

                <li>
                    <Link to="/vehicles" onClick={handlerDropdown}><i className="bi bi-car-front-fill"></i><span className="sidebar-body-title">Vehicle</span></Link>
                    <ul className="submenus">
                        <li><Link to="/add-vehicle" className="submenu">Vehicle Add</Link></li>
                    </ul>
                </li>

                <li>
                    <Link to="/drivers"><i className="bi bi-person-vcard-fill"></i><span className="sidebar-body-title">Driver</span></Link>
                    <ul className="submenus">
                        <li><Link to="/add-driver" className="submenu">Driver Add</Link></li>
                    </ul>
                </li>
                <li><Link to="/customers"><i className="bi bi-person-fill-check"></i><span className="sidebar-body-title">Customer</span></Link></li>
                <li><Link to="/booking"><i className="bi bi-calendar-check-fill"></i><span className="sidebar-body-title">Booking</span></Link></li>
                <li><Link to="/payment"><i className="bi bi-cash-stack"></i><span className="sidebar-body-title">Payment List</span></Link></li>
                <li><Link to="/setting"><i className="bi bi-gear-fill"></i><span className="sidebar-body-title">Setting</span></Link></li>
                <li><Link to="/invoice"><i className="bi bi-receipt-cutoff"></i><span className="sidebar-body-title">Report</span></Link></li>
                </ul>
            </div>
        </div>
            
        <div id="main">
            {props.children}
        </div>
    </div>
}

export default SideBar