import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Label, Input, FormGroup,
} from 'reactstrap';
import validate from '../../validate/validate';
import getApiClient from '../../api/api';
import './style.css';

const Formular = (props) => {
  const { videosData, setVideosData } = props;
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const getVideoId = async (validationResult) => {
    const client = getApiClient(validationResult.platform);
    const result = await client.getData(validationResult.link);
    const videoData = {
      path: result,
      date: Date.now(),
      platform: validationResult.platform,
      isFavorite: false,
    };
    (result === 'something goes wrong - check your path') ? setError(result) : setVideosData([...videosData, videoData]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    const validationResult = validate(link);
    (!validationResult.link || videosData.some((video) => video.path === validationResult.link))
      ? setError('your link is invalid or this video is already uploaded') : getVideoId(validationResult);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
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
  videosData: () => [],
  setVideosData: () => [],
};

Formular.propTypes = {
  videosData: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number,
    isFavorite: PropTypes.bool,
    path: PropTypes.numberstring,
    platform: PropTypes.string,
  })),
  setVideosData: PropTypes.func,
};
