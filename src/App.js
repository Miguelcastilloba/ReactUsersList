import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Preferences from './Components/Preferences';
import Header from './Components/Header';
import useLocalStorage from 'use-local-storage'
import useToken from './Components/useToken';








function App() {

  

  const { token, setToken } = useToken();

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    

  }


  const remove = () => {
    localStorage.removeItem('token');
    window.location.reload();
 };

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (

   

    <div className="wrapper" data-theme={theme}>


      <div className='TopMenu'> <button onClick={remove}>Log Out</button>   <button onClick={switchTheme} >  Cambiar al tema {theme === 'light' ? 'oscuro' : 'claro'} </button></div>



      <Header />

     
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;