import React, { useState } from 'react';
import validate from '../../validate/validate';
import getApiClient from '../../api/api';
import useLocalStorage from '../../localStorage/localStorage';

const Form = () => {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [videosData, setVideosData] = useLocalStorage('videosData', []);

  const getVideoId = async (validationResult) => {
    const client = getApiClient(validationResult.platform);
    const result = await client.getData(validationResult.link);
    const videoData = {
      path: result,
      date: Date.now(),
      platform: validationResult.platform,
    };
    (result === 'something goes wrong') ? setError(result) : setVideosData([...videosData, videoData]);
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
