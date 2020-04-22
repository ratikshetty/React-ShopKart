import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


import Products from './components/products'
import Login from './components/login/Login'


function App() {
  return (
    <div className="App">
      
      
        
        <Products></Products>
        <Login></Login>
        
        
        
      
    </div>
  );
}

export default App;
