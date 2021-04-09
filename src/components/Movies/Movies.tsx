import React, { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardFooter,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faEye, faStar, faTrashAlt, faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { getApiClients } from '../../api/api';
import { VideosData } from '../../interfaces/videoData';
import { PanelData } from '../../interfaces/panelData';
import { ModalData } from '../../interfaces/modalData';
import { Data } from '../../interfaces/fetchData';
import { InputValues } from '../../interfaces/inputValues';

interface Props {
  videosData: VideosData[],
  currentPage: number,
  panelData: PanelData,
  setVideosData: (value: VideosData[]) => void,
  getModalData: (value: ModalData) => void,
}

const Movies: React.FC<Props> = (props) => {
  const {
    videosData, setVideosData, currentPage, panelData, getModalData,
  } = props;
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<InputValues>({
    display: 'vertical',
    favorite: 'all',
    order: 'newest',
  });

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
      console.log(platformData);
      const client = getApiClients[platform];
      const resData = await client.getAll(platformData);
      return resData;
    };

    const platforms = videosData
      .map((video) => video.platform).filter((platform, id, arr) => id === arr.indexOf(platform));

    const fetchApi = platforms.map((platform) => platformData(platform));

    Promise.all(fetchApi).then((data) => {
      const result: Data[] = [];
      data.forEach((table) => {
        result.push(...table);
      });
      setLoading(false);
      const sortedData = result.sort((a, b) => a.date - b.date);
      setData(sortedData);
    });
  }, [videosData]);

  useEffect(() => {
    fetchData();
  }, [videosData, fetchData]);

  const remove = (id: number) => {
    const filteredMovies = videosData.filter((video) => video.date !== id);
    setVideosData(filteredMovies);
  };

  const addFavorite = (id: number) => {
    const getFavorites = videosData.map((video) => {
      if (video.date === id) {
        return { ...video, isFavorite: !video.isFavorite };
      }
      return video;
    });
    setVideosData(getFavorites);
  };

  const displayData = () => {
    const currentData = data;
    const sorted = ((inputValues.order === 'oldest')
      ? currentData.sort((a, b) => a.date - b.date) : currentData.sort((a, b) => b.date - a.date));
    const displayData = sorted.filter((movie) => (((inputValues.favorite === 'favorite')) ? movie.isFavorite : movie));
    return displayData;
  };

  return (
    <div className="movies-container">
      {loading ? <div className="spinner-container">...LOADING</div>
        : displayData().slice(
          currentPage * 6,
          (currentPage + 1) * 6,
        ).map((data) => (
          <Card className={`data-slice ${inputValues.display === 'vertical' ? 'card-horizontal' : ''}`} key={data.date}>
            <CardHeader>
              <CardTitle tag="h4">{data.title}</CardTitle>
            </CardHeader>
            <CardBody className={`${inputValues.display === 'vertical' ? '' : 'card-body-horizontal'}`}>
              <CardImg
                top
                width="100%"
                src={data.mediumThumbnail}
                alt="thubnail"
                onClick={() => getModalData({
                  title: data.title,
                  url: data.url,
                  platform: data.platform,
                  isOpen: true,
                })}
              />
            </CardBody>
            <CardFooter className="text-muted">
              <span>
                <FontAwesomeIcon icon={faEye} />
                {` ${data.viewCounts}`}
              </span>
              {data.likeCount && (
                <span>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  {` ${data.likeCount}`}
                </span>
              )}
              <span>
                <FontAwesomeIcon icon={faClock} />
                {` ${new Date(data.date).toLocaleString().split(',')[0]}`}
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => remove(data.date)}
                />
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  className={`${data.isFavorite ? 'active-star' : ''}`}
                  onClick={() => addFavorite(data.date)}
                />
              </span>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default Movies;
