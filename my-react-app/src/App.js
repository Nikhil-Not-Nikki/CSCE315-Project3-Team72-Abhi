import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import React, {useState, useEffect, useContext, createContext} from "react";
import {View, TextInput} from 'react-native';
import BurgerMenu from './Pages/BurgerMenu';
import Transaction from './HelperClasses/Transaction';
import RevNavbar from './HelperClasses/RevNavbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SandwichMenu from './Pages/SandwichMenu';
import SweetsMenu from './Pages/SweetsMenu';
import ExtrasMenu from './Pages/ExtrasMenu';
import BasketMenu from './Pages/BasketMenu';
import HomePage from './Pages/HomePage';
import Header from './HelperClasses/Header';
import { GoogleLogin } from '@react-oauth/google';
import CustomerBurgerMenu from './Pages/CustomerBurgerMenu';
import ManagerInventory from './Pages/manager-inventory';
import ManagerMenu from './Pages/manager-menu';
import ManagerRestockReport from './Pages/manager-restockreport';
import ManagerXZReport from './Pages/manager-xzreport';
import ManagerSalesReport from './Pages/manager-salesreport';
import EditTransaction from './Pages/EditTransaction';
import StaticMenu from './Pages/StaticMenu';
import CustomerBasketMenu from './Pages/CustomerBasketMenu';
import CustomerSandwichMenu from './Pages/CustomerSandwichMenu';
import CustomerSweetsMenu from './Pages/CustomerSweetsMenu';
import CustomerExtrasMenu from './Pages/CustomerExtrasMenu';

export const UserContext = createContext(null);

function App() {
  const [isColorblind, setColorblind] = useState(false);

  var url = "http://localhost:3001/user"
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  
  let current_transaction = new Transaction(message);

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };

  return (
    <>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      <Router>
      <UserContext.Provider value={{ isColorblind, setColorblind }}>
        <Header/>
        <Routes>
          <Route path='/'element={<HomePage/>}/>
          <Route path='/burger' element={<BurgerMenu json={message} transaction={current_transaction}/>} />
          <Route path='/customer-burger' element={<CustomerBurgerMenu json={message} transaction={current_transaction}/>} />
          <Route path='/customer-basket' element={<CustomerBasketMenu json={message} transaction={current_transaction}/>} />
          <Route path='/customer-sandwich' element={<CustomerSandwichMenu json={message} transaction={current_transaction}/>} />
          <Route path='/customer-sweets' element={<CustomerSweetsMenu json={message} transaction={current_transaction}/>} />
          <Route path='/customer-extras' element={<CustomerExtrasMenu json={message} transaction={current_transaction}/>} />
          <Route path='/sandwich' element={<SandwichMenu json={message} transaction={current_transaction}/>} />
          <Route path='/sweets' element={<SweetsMenu json={message} transaction={current_transaction}/>} />
          <Route path='/extras' element={<ExtrasMenu json={message} transaction={current_transaction}/>} />
          <Route path='/basket' element={<BasketMenu json={message} transaction={current_transaction}/>} />
          <Route path='/complete-transaction' element={<EditTransaction json={message} transaction={current_transaction}/>} />
          <Route path='/static-menu' element={<StaticMenu json={message}/>} />
          <Route path='/manager-inventory' element={<ManagerInventory/>}/>
          <Route path='/manager-menu' element={<ManagerMenu/>}/>
          <Route path='/manager-xz' element={<ManagerXZReport/>}/>
          <Route path='/manager-restock' element={<ManagerRestockReport/>}/>
          <Route path='/manager-sales' element={<ManagerSalesReport/>}/>
        </Routes>
      </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
