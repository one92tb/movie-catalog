import React, { useState, useEffect } from 'react';
import validate from '../../validate/validate';
import getApiClient from '../../api/api';

const Form = () => {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const videosData = JSON.parse(localStorage.getItem('videoData'));
    if (videosData) {
      setVideosData(videosData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('videoData', JSON.stringify(videosData));
  }, [videosData]);

  const addToLocalStorage = (path) => {
    const videoData = {
      path,
      date: Date.now(),
    };

    setVideosData([...videosData, videoData]);
  };

  const getVideoId = async (validationResult) => {
    const client = getApiClient(validationResult.platform);
    const result = await client.getData(validationResult.link);
    (result === 'something goes wrong') ? setError(result) : addToLocalStorage(result);
  };

  const handleSubmit = (event) => {
    setError('');
    event.preventDefault();
    const validationResult = validate(link);
    (!validationResult.link) ? setError('something goes wrong') : getVideoId(validationResult);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="link">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>
      <input id="link" type="submit" value="Submit" />
      <span>{error}</span>
    </form>
  );
};
export default Form;
