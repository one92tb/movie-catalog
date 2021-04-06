import React, { useState } from 'react';
import './App.css';
import {
  Col, Row,
} from 'reactstrap';
import Formular from './components/Form/Form';
import Movies from './components/Movies/Movies';
import Nav from './components/Nav/Nav';
import MyModal from './components/Modal/Modal';
import Panel from './components/Panel/Panel';

const App = () => {
  const [localStorageData, setLocalStorageData] = useState([]);
  const [currentPage, setCurrentPage] = useState('');
  const [modalData, setModalData] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);

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

  const getFilteredData = (data) => {
    setFilteredMovies(data);
  };

  return (
    <div className="App">
      <Formular getlocalStorageData={getlocalStorageData} filteredMovies={filteredMovies} />
      <Row>
        <Col>
          <Movies
            localStorageData={localStorageData}
            currentPage={currentPage}
            getModalData={getModalData}
            getFilteredData={getFilteredData}
          />
        </Col>
        <Panel />
      </Row>
      <Nav localStorageData={localStorageData} getCurrentPage={getCurrentPage} />
      <MyModal
        modalData={modalData}
        onClose={onClose}
      />
    </div>
  );
};

export default App;
