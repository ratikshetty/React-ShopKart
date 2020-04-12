import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import SideBar from './components/sideBar'
import Products from './components/products'

function App() {
  return (
    <div className="App">
      
       
        <SideBar></SideBar>
        <Products></Products>
        
        
      
    </div>
  );
}

export default App;
