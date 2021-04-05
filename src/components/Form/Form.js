import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Label, Input, FormGroup,
} from 'reactstrap';
import validate from '../../validate/validate';
import getApiClient from '../../api/api';
import useLocalStorage from '../../localStorage/localStorage';

const Formular = (props) => {
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
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="link">link</Label>
        <Input
          type="text"
          value={link}
          placeholder={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {error}
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};
export default Formular;

Formular.defaultProps = {
  getlocalStorageData: () => [],
};

Formular.propTypes = {
  getlocalStorageData: PropTypes.func,
};
