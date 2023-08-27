import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import SideBar from './pages/component/SideBar/Sidebar';

import Dashboard from './pages/Dashboard';

import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import VehiclesList from './pages/VehiclesList';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetail from './pages/InvoiceDetail';
import DriversList from './pages/DriverList';
import AddVehicle from './pages/AddVehicle';
import EditVehicle from './pages/EditVehicle';
import AddDriver from './pages/AddDriver';
import BookingList from './pages/BookingList';
import PaymentList from './pages/Payment';


function App() {
  return (
        <BrowserRouter>
            <SideBar>
                <Routes>
                  <Route path="/" Component={Dashboard} />
                  <Route path="/vehicles" Component={VehiclesList} />
                  <Route path="/add-vehicle" Component={AddVehicle} />
                  <Route path="/edit-vehicle" Component={EditVehicle} />
                  <Route path="/drivers" Component={DriversList} />
                  <Route path="/add-driver" Component={AddDriver} />
                  <Route path="/booking" Component={BookingList} />
                  <Route path="/payment" Component={PaymentList} />
                  <Route path="/invoice" Component={InvoiceDetail} />
                </Routes>
            </SideBar>
        </BrowserRouter>
  );
}

export default App;
