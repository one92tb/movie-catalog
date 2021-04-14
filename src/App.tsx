import React, { useState } from 'react';
import './App.css';
import { Col, Row } from 'reactstrap';
import useLocalStorage from './localStorage/localStorage';
import { Formular } from './components/Form/Form';
import { MovieList } from './components/Movies/MovieList';
import { ModalVideo } from './components/Modal/Modal';
import { Panel } from './components/Panel/Panel';
import { VideosData } from './interfaces/videoData';
import { ModalData } from './interfaces/modalData';
import { Video } from './interfaces/video';

const App: React.FC = () => {
  const [videosData, setVideosData] = useLocalStorage<VideosData[]>('videosData', []);
  const [movies, setMovies] = useState<Video[]>([]);
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

  const getModalData = (data: React.SetStateAction<ModalData>) => {
    setModalData(data);
  };

  const onClose = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  return (
    <div className="App">
      <Formular
        videosData={videosData}
        setVideosData={setVideosData}
        setMovies={setMovies}
        movies={movies}
      />
      <Row>
        <Col md="10">
          <MovieList
            videosData={videosData}
            setVideosData={setVideosData}
            panelData={panelData}
            getModalData={getModalData}
            movies={movies}
            setMovies={setMovies}
          />
        </Col>
        <Col md="2">
          <Panel
            setPanelData={setPanelData}
            setVideosData={setVideosData}
          />
        </Col>
      </Row>
      <ModalVideo
        modalData={modalData}
        onClose={onClose}
      />
    </div>
  );
};

export default App;
