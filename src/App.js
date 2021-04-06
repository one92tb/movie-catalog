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
import useLocalStorage from './localStorage/localStorage';

const App = () => {
  const [videosData, setVideosData] = useLocalStorage('videosData', []);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalData, setModalData] = useState({});
  const [panelData, setPanelData] = useState({
    display: 'vertical',
    favorite: 'all',
    order: 'newest',
  });

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
      <Formular videosData={videosData} setVideosData={setVideosData} />
      <Row>
        <Col md="10">
          <Movies
            videosData={videosData}
            setVideosData={setVideosData}
            currentPage={currentPage}
            panelData={panelData}
            getModalData={getModalData}
          />
        </Col>
        <Col md="2">
          <Panel
            getPanelData={setPanelData}
            videosData={videosData}
            setVideosData={setVideosData}
          />
        </Col>
      </Row>
      <Nav videosData={videosData} getCurrentPage={getCurrentPage} />
      <MyModal
        modalData={modalData}
        onClose={onClose}
      />
    </div>
  );
};

export default App;
