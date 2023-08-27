import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import GridViewIcon from '@mui/icons-material/GridView';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { MenuItemStyles } from "react-pro-sidebar";

function SideBar(props) {
    const { collapseSidebar, rtl } = useProSidebar();
    const menuItemStyles = {
        root: {
            fontSize: '15px',
            fontWeight: 400,
          },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
          }),
        icon: {
            color: "#50b0f0"
        },
        button: ({ level, active, disabled }) => {
            if (level === 0) {
              return {
                color: disabled ? "#eee" : "#455A64",
                color: active ? "#50b0f0" : undefined,
                fontWeight: active ? "bold !important" : undefined,
                "&:hover": {
                   color: "#50b0f0 !important",
                   fontWeight: "bold !important"
                 },
              };
            }
          },
        subMenuContent: ({ level, active, disabled }) => {
            if (level === 0) {
              return {
                backgroundColor: "#50b0f0",
                color: "#232323 !important",
                borderRadius: "8px !important",
                fontWeight:"bold !important",

                color: disabled ? "#eee" : "#455A64",
                backgroundColor: active ? "#50b0f0" : undefined,
                color: active ?  "white !important" : undefined,
                borderRadius: active ? "8px !important" : "0px",
                fontWeight: active ? "bold !important" : "normal",

                "&:hover": {
                   backgroundColor: "#50b0f0 !important",
                   color: "white !important",
                   borderRadius: "8px !important",
                   fontWeight: "bold !important"
                 },
              };
            }
          },

        SubMenuExpandIcon: {
            color: '#b6b7b9',
            fontSize: "22px",
          },
    }

    return <div>
        <Sidebar style={{ height: "100vh", background: "#fff"}}>
            <Menu menuItemStyles={menuItemStyles}>
                <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={() => {
                    collapseSidebar();
                    }}
                    style={{ textAlign: "center" }}
                >
                    {" "}
                    <h2>Admin</h2>
                </MenuItem>
                <MenuItem active={window.location.pathname === "/"} icon={<GridViewIcon />} component={<Link to="/"></Link>}>Dashboard</MenuItem>
                <SubMenu active={window.location.pathname === "/vehicles"} icon={<DirectionsCarIcon />} component={<Link to="/vehicles"></Link>} label="Vehicle">
                    <MenuItem active={window.location.pathname === "/vehicles"} component={<Link to="/vehicles"></Link>} >Vehicle List</MenuItem>
                    <MenuItem active={window.location.pathname === "/vehicles-add"} component={<Link to="/vehicles-add"></Link>} >Vehicle Add</MenuItem>
                </SubMenu>
                <SubMenu active={window.location.pathname === "/driver-list"} icon={<AirlineSeatReclineNormalIcon />} component={<Link to="/driver-list"></Link>} label="Driver">
                    <MenuItem active={window.location.pathname === "/driver-list"} component={<Link to="/driver-list"></Link>}>Driver List</MenuItem>
                    <MenuItem active={window.location.pathname === "/driver-add"} component={<Link to="/driver-add"></Link>}>Driver Add</MenuItem>
                </SubMenu>
                <SubMenu active={window.location.pathname === "/customer-list"}  icon={<PersonPinIcon />} component={<Link to="/customer-list"></Link>} label="Customer">
                    <MenuItem active={window.location.pathname === "/customer-list"}  component={<Link to="/customer-list"></Link>}>Customer List</MenuItem>
                    <MenuItem active={window.location.pathname === "/customer-add"}  component={<Link to="/customer-add"></Link>}>Customer Add</MenuItem>
                </SubMenu>
                <SubMenu active={window.location.pathname === "/booking-list"}  icon={<ModeOfTravelIcon />} component={<Link to="/booking-lsit"></Link>} label="Booking">
                    <MenuItem active={window.location.pathname === "/booking-list"} component={<Link to="/booking-list"></Link>}>Booking List</MenuItem>
                    <MenuItem active={window.location.pathname === "/booking-add"} component={<Link to="/booking-add"></Link>}>Booking Add</MenuItem>
                </SubMenu>
                <MenuItem active={window.location.pathname === "/setting"} component={<Link to="/setting"></Link>} icon={<SettingsIcon />}> Setting </MenuItem>
                <MenuItem active={window.location.pathname === "/report"} component={<Link to="/report"></Link>} icon={<ReceiptIcon />}> Report </MenuItem>
            </Menu>
            </Sidebar>
            <main>
                {props.children}
            </main>
            </div>
}

export default SideBar;