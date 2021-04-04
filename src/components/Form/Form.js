import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import validate from '../../validate/validate';
import getApiClient from '../../api/api';
import useLocalStorage from '../../localStorage/localStorage';

const Form = (props) => {
  const { getlocalStorageData } = props;
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [videosData, setVideosData] = useLocalStorage('videosData', []);

  useEffect(() => {
    getlocalStorageData(videosData);
  }, [getlocalStorageData, videosData]);

  const getVideoId = async (validationResult) => {
    const client = getApiClient(validationResult.platform);
    const result = await client.getData(validationResult.link);
    const videoData = {
      path: result,
      date: Date.now(),
      platform: validationResult.platform,
    };
    (result === 'something goes wrong - check your path') ? setError(result) : setVideosData([...videosData, videoData]);
  };

  const handleSubmit = (event) => {
    setError('');
    event.preventDefault();
    const validationResult = validate(link);
    (!validationResult.link || videosData.some((video) => video.path === validationResult.link))
      ? setError('your link is invalid or this video is already uploaded') : getVideoId(validationResult);
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

Form.defaultProps = {
  getlocalStorageData: () => [],
};

Form.propTypes = {
  getlocalStorageData: PropTypes.func,
};
