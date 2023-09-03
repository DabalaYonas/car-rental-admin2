import { useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function SideBar(props) {
    var loction = useLocation();
    var [sidebarState, setSidebarState] = useState(true);

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("logo").style.visibility = "visible";
        var menuitems = document.getElementsByClassName("sidebar-body-title");
        for (let i = 0; i < menuitems.length; i++) {
            menuitems[i].style.display = "inline";
        }
        var submenusIcons = document.getElementsByClassName("sidebar_dropdown_icon");
        for (let submenusIcon of submenusIcons) {
            submenusIcon.style.display = "inline-block";
        }

        var menuTitles = document.getElementsByClassName("menu-title");
        for (let menuTitle of menuTitles) {
            menuTitle.style.visibility = "visible";
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

        var submenusIcons = document.getElementsByClassName("sidebar_dropdown_icon");
        for (let submenusIcon of submenusIcons) {
            submenusIcon.style.display = "none";
            submenusIcon.classList.remove("rotate");
        }

        var menuTitles = document.getElementsByClassName("menu-title");
        for (let menuTitle of menuTitles) {
            menuTitle.style.visibility = "hidden";
        }

        closeAllSubmenus();
        setSidebarState(false);
    }

    function init() {
        function d(params) {
            
        }
        var submenus = document.getElementsByClassName("submenu");
        for(let submenu of submenus) {
            submenu.addEventListener("click", (e)=>{

                for(let submenu of submenus) {
                    submenu.classList.remove("submenu-active");
                    console.log(submenu);
                }
                submenu.classList.add("submenu-active");
                // console.log(e.target);
            });
        }
    }

    useEffect(()=>{
        // init();
        var links = document.getElementsByClassName("sidebar-link");
        for(let link of links) {
            if (link.pathname === loction.pathname) {
                unselectAllMenus();
                unselectAllSubemenus();
                if (link.classList.contains("menu-link")) {
                    selectMenu(link);
                } else if (link.classList.contains("submenu")) {
                    openNav();
                    selectSubmenus(link);
                }
            }
        }
    }, [loction]);

    function handlerDropdown(e) {
        // unselectAllMenus();

        var link;
        if (e.target.parentElement.classList.contains("menu")) {
            link = e.target;
        } else {
            link = e.target.parentElement;
        }

        var submenusContainer = link.parentElement.nextElementSibling;
        var toggleIcon = link.children[2];
        if(submenusContainer.style.display === "none" || submenusContainer.style.display == "") {
            submenusContainer.style.display = "block";
            toggleIcon.classList.toggle("rotate");
        } else {
            submenusContainer.style.display = "none";
            toggleIcon.classList.remove("rotate");
        }
    }

    function unselectAllMenus() {
        // Remove active class name from all link elements
        var links = document.getElementsByClassName("menu-link");
        for (let i = 0; i < links.length; i++) {
            links[i].classList.remove("active");
        }
    }

    function unselectAllSubemenus() {
        // Remove active class name from all link elements
        var submenus = document.getElementsByClassName("submenu");
        for(let submenu of submenus) {
            submenu.classList.remove("submenu-active");
        }
    }

    function selectMenu(e) {
        e.classList.toggle("active");
    }

    function selectSubmenus(e) {
        e.classList.toggle("submenu-active");
        selectMenu(e.parentElement.parentElement.previousElementSibling.children[0]);
    }

    function closeAllSubmenus() {
        var submenus = document.getElementsByClassName("submenus");
        for (let i = 0; i < submenus.length; i++) {
            submenus[i].style.display = "none";
        }
    }

    return <div>
        <div id="mySidenav" className="sidenav">
            <div className="sidebar-header align-center">
                <h1 id="logo">Admin</h1>
                {sidebarState ?  <span className="closebtn" onClick={closeNav}><i className="bi bi-list"></i></span> : 
                <span className="closebtn" onClick={openNav}><i className="bi bi-list"></i></span>}
            </div>

            <div className="sidebar-body">
                <ul>
                    <li className="menu-title">Main Menu</li>
                    <li>
                        <Link className="menu-link sidebar-link" to="/"><i className="bi bi-grid-fill"></i><span className="sidebar-body-title">Dashboard</span></Link>
                    </li>
                    <li>
                        <div className="menu" onClick={handlerDropdown}>
                            <Link className="menu-link sidebar-link" to="/vehicles">
                                <i className="bi bi-car-front-fill"></i>
                                <span className="sidebar-body-title">Vehicle</span>
                                <i className="bi bi-chevron-right sidebar_dropdown_icon"></i>
                            </Link>
                        </div>
                        <ul className="submenus">
                            <li>
                                <Link to="/vehicles" className="submenu sidebar-link">Vehicle List</Link>
                                <Link to="/add-vehicle" className="submenu sidebar-link">Vehicle Add</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="menu" onClick={handlerDropdown}>
                            <Link className="menu-link sidebar-link" to="/drivers">
                                <i className="bi bi-person-vcard-fill"></i>
                                <span className="sidebar-body-title">Driver</span>
                                <i className="bi bi-chevron-right sidebar_dropdown_icon"></i>
                            </Link>
                        </div>
                        <ul className="submenus">
                            <li><Link to="/drivers" className="submenu sidebar-link">Driver List</Link></li>
                            <li><Link to="/add-driver" className="submenu sidebar-link">Driver Add</Link></li>
                        </ul>
                    </li>
                    <li><Link className="menu-link sidebar-link" to="/customers"><i className="bi bi-person-fill-check"></i><span className="sidebar-body-title">Customer</span></Link></li>
                    <li><Link className="menu-link sidebar-link" to="/booking"><i className="bi bi-calendar-check-fill"></i><span className="sidebar-body-title">Booking</span></Link></li>
                    <li><Link className="menu-link sidebar-link" to="/payment"><i className="bi bi-cash-stack"></i><span className="sidebar-body-title">Payment List</span></Link></li>
                    <li><Link className="menu-link sidebar-link" to="/setting"><i className="bi bi-gear-fill"></i><span className="sidebar-body-title">Setting</span></Link></li>
                    <li className="menu-title">Report</li>
                    <li><Link className="menu-link sidebar-link" to="/invoice"><i className="bi bi-receipt-cutoff"></i><span className="sidebar-body-title">Report</span></Link></li>
                </ul>
            </div>
        </div>
            
        <div id="main">
            {props.children}
        </div>
    </div>
}

export default SideBar