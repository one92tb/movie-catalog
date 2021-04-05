import React, { useState } from 'react';
import './App.css';
import Formular from './components/Form/Form';
import Movies from './components/Movies/Movies';
import Nav from './components/Nav/Nav';

const App = () => {
  const [localStorageData, setLocalStorageData] = useState([]);
  const [currentPage, setCurrentPage] = useState('');

  const getlocalStorageData = (data) => {
    setLocalStorageData(data);
  };

  const getCurrentPage = (index) => {
    console.log(index);
    setCurrentPage(index);
  };

  return (
    <div className="App">
      <Formular getlocalStorageData={getlocalStorageData} />
      <Movies localStorageData={localStorageData} currentPage={currentPage} />
      <Nav localStorageData={localStorageData} getCurrentPage={getCurrentPage} />
    </div>
  );
};

export default App;
