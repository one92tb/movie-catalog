import React, { useEffect, useState, useCallback } from 'react';
import getApiClient from '../../api/api';
import useLocalStorage from '../../localStorage/localStorage';

const Movies = () => {
  const [videoData, setVideoData] = useLocalStorage('videosData', []);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const platformData = async (platform) => {
      const dataFromPlatform = videoData.filter((video) => video.platform === platform);
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
    const youtubeResult = await platformData('youtube');
    const vimeoResult = await platformData('vimeo');
    setData([...youtubeResult, ...vimeoResult]);
  }, [videoData]);

  useEffect(() => {
    fetchData();
  }, [videoData, fetchData]);

  return (
    <div>
      {data.map((videoDetails) => <div>{videoDetails.title}</div>)}
    </div>
  );
};

export default Movies;
