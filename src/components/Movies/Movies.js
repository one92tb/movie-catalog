import React, { useEffect, useState, useCallback } from 'react';
import getApiClient from '../../api/api';
import useLocalStorage from '../../localStorage/localStorage';

const Movies = () => {
  const [videoData, setVideoData] = useLocalStorage('videosData', []);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const ytLinks = videoData.filter((video) => video.platform === 'youtube').map((video) => video.path).join(',');
    const client = getApiClient('youtube');
    const result = await client.getAll(ytLinks);
    setData(result);
  }, [videoData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(setVideoData, data);
  return (
    <div>test</div>
  );
};

export default Movies;
