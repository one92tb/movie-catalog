import React, { useState } from 'react';
import './App.css';
import { Col, Row } from 'reactstrap';
import Formular from './components/Form/Form';
import Movies from './components/Movies/Movies';
import Nav from './components/Nav/Nav';
import MyModal from './components/Modal/Modal';
import Panel from './components/Panel/Panel';
import useLocalStorage from './localStorage/localStorage';
import { VideosData } from './interfaces/videoData';
import { ModalData } from './interfaces/modalData';

const App: React.FC = () => {
  const [videosData, setVideosData] = useLocalStorage<VideosData[]>('videosData', []);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    url: '',
    platform: '',
    isOpen: false,
  });
  const [panelData, setPanelData] = useState({
    display: 'vertical',
    favorite: 'all',
    order: 'newest',
  });

  const getCurrentPage = (index: React.SetStateAction<number>) => {
    setCurrentPage(index);
  };

  const getModalData = (data: React.SetStateAction<ModalData>) => {
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
