import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardTitle, CardFooter, CardHeader,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import getApiClient from '../../api/api';
import useLocalStorage from '../../localStorage/localStorage';
import './style.css';

const Movies = (props) => {
  const { localStorageData, currentPage } = props;
  const [videosData, setVideosData] = useLocalStorage('videosData', []);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorageData.length > videosData.length) {
      setVideosData(localStorageData);
    }
  }, [localStorageData, setVideosData, videosData.length]);

  const fetchData = useCallback(async () => {
    setData([]);
    const platformData = async (platform) => {
      const dataFromPlatform = videosData.filter((video) => video.platform === platform);
      const url = dataFromPlatform.map((video) => video.path).join(',');
      const dates = dataFromPlatform.map((video) => video.date);

      const platformData = {
        url,
        dates,
      };

      const client = getApiClient(platform);
      const resData = await client.getAll(platformData);
      return resData;
    };

    const platforms = videosData
      .map((video) => video.platform).filter((platform, id, arr) => id === arr.indexOf(platform));
    platforms.forEach(async (platform) => {
      const result = await platformData(platform);
      setData((prevMovies) => ([...prevMovies, ...result]));
    });
  }, [videosData]);

  useEffect(() => {
    fetchData();
  }, [videosData, fetchData]);

  return (
    <div className="movies-container">
      {data.slice(
        currentPage * 6,
        (currentPage + 1) * 6,
      )
        .map((data) => (
          <Card className="data-slice" key={data.date}>
            <CardHeader>
              <CardTitle tag="h3">{data.title}</CardTitle>
            </CardHeader>
            <CardImg top width="100%" src={data.mediumThumbnail} alt="thubnail" />
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
};

Movies.propTypes = {
  currentPage: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  localStorageData: PropTypes.array,
};
