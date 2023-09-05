import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import SideBar from './pages/component/SideBar/Sidebar';

import Dashboard from './pages/Dashboard';

import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import VehiclesList from './pages/VehiclesList';
import ReportList from './pages/ReportList';
import InvoiceDetail from './pages/InvoiceDetail';
import DriversList from './pages/DriverList';
import AddVehicle from './pages/AddVehicle';
import EditVehicle from './pages/EditVehicle';
import AddDriver from './pages/AddDriver';
import BookingList from './pages/BookingList';
import PaymentList from './pages/Payment';
import EditDriver from './pages/EditDriver';
import CustomerList from './pages/CustomerList';
import AddCustomer from './pages/AddCustomer';
import EditCustomer from './pages/EditCustomer';
import AddBooking from './pages/AddBooking';
import EditPayment from './pages/EditPayment';


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
                  <Route path="/edit-driver" Component={EditDriver} />
                  <Route path="/booking" Component={BookingList} />
                  <Route path="/add-booking" Component={AddBooking} />
                  <Route path="/customers" Component={CustomerList} />
                  <Route path="/add-customer" Component={AddCustomer} />
                  <Route path="/edit-customer" Component={EditCustomer} />
                  <Route path="/payment" Component={PaymentList} />
                  <Route path="/edit-payment" Component={EditPayment} />
                  <Route path="/reports" Component={ReportList} />
                </Routes>
            </SideBar>
        </BrowserRouter>
  );
}

export default App;
