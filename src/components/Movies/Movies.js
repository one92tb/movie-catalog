/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardTitle,
  CardFooter,
  CardHeader,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faEye, faThumbsUp, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import getApiClient from '../../api/api';
import useLocalStorage from '../../localStorage/localStorage';
import './style.css';

const Movies = (props) => {
  const {
    localStorageData, currentPage, getModalData, getFilteredData,
  } = props;
  const [videosData, setVideosData] = useLocalStorage('videosData', []);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(false);
  const [filteredData, setFilteredData] = useState(videosData);

  useEffect(() => {
    setModalData(modalData);
  }, []);

  useEffect(() => {
    if (localStorageData.length !== videosData.length) {
      setVideosData(localStorageData);
    }
  }, [localStorageData]);

  useEffect(() => {
    getFilteredData(videosData);
  }, [videosData]);

  const fetchData = useCallback(async () => {
    setData([]);
    const platformData = async (platform) => {
      const dataFromPlatform = videosData.filter((video) => video.platform === platform);
      const url = dataFromPlatform.map((video) => video.path).join(',');
      const dates = dataFromPlatform.map((video) => video.date);

      const platformData = {
        url,
        dates,
        platform,
      };
      const client = getApiClient(platform);
      const resData = await client.getAll(platformData);
      return resData;
    };

    const platforms = videosData
      .map((video) => video.platform).filter((platform, id, arr) => id === arr.indexOf(platform));

    const fetchApi = platforms.map((platform) => platformData(platform));

    Promise.all(fetchApi).then((data) => {
      const result = [];
      data.forEach((table) => {
        result.push(...table);
      });
      setData(result);
    });
  }, [videosData]);

  useEffect(() => {
    fetchData();
  }, [videosData, fetchData]);

  const remove = (id) => {
    const filteredMovies = videosData.filter((video) => video.date !== id);
    setVideosData(filteredMovies);
    setFilteredData(filteredMovies);
    console.log(filteredData);
    getFilteredData(filteredData);
  };

  return (
    <div className="movies-container">
      {data.slice(
        currentPage * 6,
        (currentPage + 1) * 6,
      )
        .map((data) => (
          <Card className="data-slice" key={data.date}>
            <CardHeader>
              <CardTitle tag="h4">{data.title}</CardTitle>
            </CardHeader>
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
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => remove(data.date)} />
              </span>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default Movies;

Movies.defaultProps = {
  localStorageData: [],
  currentPage: 0,
  getModalData: () => ({}),
  getFilteredData: () => [],
};

Movies.propTypes = {
  currentPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  localStorageData: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      date: PropTypes.number,
      platform: PropTypes.string,
    }),
  ),
  getModalData: PropTypes.func,
  getFilteredData: PropTypes.func,
};
