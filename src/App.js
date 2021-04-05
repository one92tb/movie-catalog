import React, { useState } from 'react';
import './App.css';
import Formular from './components/Form/Form';
import Movies from './components/Movies/Movies';
import Nav from './components/Nav/Nav';
import MyModal from './components/Modal/Modal';

const App = () => {
  const [localStorageData, setLocalStorageData] = useState([]);
  const [currentPage, setCurrentPage] = useState('');
  const [modalData, setModalData] = useState({});

  const getlocalStorageData = (data) => {
    setLocalStorageData(data);
  };

  const getCurrentPage = (index) => {
    setCurrentPage(index);
  };

  const getModalData = (data) => {
    setModalData(data);
  };

  const onClose = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  return (
    <div className="App">
      <Formular getlocalStorageData={getlocalStorageData} />
      <Movies
        localStorageData={localStorageData}
        currentPage={currentPage}
        getModalData={getModalData}
      />
      <Nav localStorageData={localStorageData} getCurrentPage={getCurrentPage} />
      <MyModal
        modalData={modalData}
        onClose={onClose}
      />
    </div>
  );
};

export default App;
