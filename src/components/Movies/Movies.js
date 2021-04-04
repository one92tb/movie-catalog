import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import getApiClient from '../../api/api';
import useLocalStorage from '../../localStorage/localStorage';

const Movies = (props) => {
  const { localStorageData } = props;
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
    <div>
      {data.map((videoDetails) => <div key={videoDetails.date}>{videoDetails.date}</div>)}
    </div>
  );
};

export default Movies;

Movies.defaultProps = {
  localStorageData: [],
};

Movies.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  localStorageData: PropTypes.array,
};
