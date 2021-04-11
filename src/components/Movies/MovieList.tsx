import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import './style.css';
import MovieCard from './Movie';
import Nav from '../Nav/Nav';
import { getApiClients } from '../../api/api';
import { VideosData } from '../../interfaces/videoData';
import { PanelData } from '../../interfaces/panelData';
import { ModalData } from '../../interfaces/modalData';
import { Movies } from '../../interfaces/fetchData';
import { InputValues } from '../../interfaces/inputValues';

interface Props {
  videosData: VideosData[],
  panelData: PanelData,
  movies: Movies[];
  setVideosData: (value: VideosData[]) => void,
  getModalData: (value: ModalData) => void,
  setMovies: (value: Movies[]) => void,
}

const MovieList: React.FC<Props> = (props) => {
  const {
    setVideosData, getModalData, panelData, videosData, movies, setMovies,
  } = props;

  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<InputValues>({
    display: 'vertical',
    favorite: 'all',
    order: 'newest',
  });

  useEffect(() => {
    if (videosData.length === 0) {
      setMovies([]);
    }
  }, [videosData]);

  useEffect(() => {
    setInputValues({
      display: panelData.display,
      favorite: panelData.favorite,
      order: panelData.order,
    });
  }, [panelData]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const platformData = async (platform: string) => {
      const dataFromPlatform = videosData
        .filter((video) => video.platform === platform);
      const url = dataFromPlatform.map((video) => video.path).join(',');
      const dates = dataFromPlatform.map((video) => video.date);
      const isFavorite = dataFromPlatform.map((video) => video.isFavorite);

      const platformData = {
        url,
        dates,
        platform,
        isFavorite,
      };
      const client = getApiClients[platform];
      const resData = await client.getAll(platformData);
      return resData;
    };

    const platforms = videosData
      .map((video) => video.platform).filter((platform, id, arr) => id === arr.indexOf(platform));

    const fetchApi = platforms.map((platform) => platformData(platform));

    Promise.all(fetchApi).then((data) => {
      const result = data.reduce((acc, video) => acc.concat(video), []);
      setLoading(false);
      setMovies(result);
    });
  }, [videosData]);

  useEffect(() => {
    fetchData();
  }, []);

  const displayData = ((inputValues.order === 'oldest')
    ? movies.sort((a, b) => a.date - b.date)
    : movies.sort((a, b) => b.date - a.date)
  ).filter((movie) => ((inputValues.favorite === 'favorite')
    ? movie.isFavorite
    : movie
  ));

  return (
    <div>
      <div className="movies-container">
        {(loading)
          ? <div className="spinner-container">...LOADING</div>
          : displayData.slice(
            currentPage * 6,
            (currentPage + 1) * 6,
          ).map((movie) => (
            <MovieCard
              key={movie.date}
              setVideosData={setVideosData}
              getModalData={getModalData}
              setMovies={setMovies}
              videosData={videosData}
              inputValues={inputValues}
              movies={movies}
              movie={movie}
            />
          ))}
      </div>
      <Nav
        displayData={displayData}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default MovieList;
