import React, { useState, FormEventHandler } from 'react';
import {
  Button, Form, Label, Input, FormGroup,
} from 'reactstrap';
import validate from '../../validate/validate';
import { getApiClients } from '../../api/api';
import './style.css';
import type { ValidationResult } from '../../validate/validationDetails';
import { VideosData } from '../../interfaces/videoData';

interface Props {
  videosData: VideosData[];
  setVideosData: (value: VideosData[]) => void;
}

const Formular: React.FC<Props> = (props) => {
  const { videosData, setVideosData } = props;
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setError('');
    const validationResult = validate(link);
    if (validationResult) {
      if (
        !validationResult.link
        || videosData.some((video) => video.path === validationResult.link)
      ) {
        setError('your link is invalid or this video is already uploaded');
      } else {
        getVideoId(validationResult);
      }
    }
  };

  const getVideoId = async (validationResult: ValidationResult) => {
    const { platform, link } = validationResult;
    const client = getApiClients[platform];
    try {
      const result = await client.getData(link);
      const videoData = {
        path: result,
        date: Date.now(),
        platform: validationResult.platform,
        isFavorite: false,
      };
      setVideosData([...videosData, videoData]);
    } catch (err) {
      setError('your link is invalid or this video is already uploaded');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormGroup>
        <Label htmlFor="link">link</Label>
        <Input
          name="link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="put a link to the input to add a video..."
        />
        <span className="error-message">{error}</span>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default Formular;
