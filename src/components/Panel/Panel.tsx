import React, { useEffect, useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import './style.css';
import { VideosData } from '../../interfaces/videoData';
import { demo } from '../../demo/demo';

interface inputValues {
  display: string,
  favorite: string,
  order: string,
}

interface Props {
  setPanelData: (value: inputValues) => void,
  setVideosData: (value: VideosData[]) => void,
}

export const Panel: React.FC<Props> = (props) => {
  const {
    setPanelData, setVideosData,
  } = props;
  const [inputValues, setInputValues] = useState({
    display: 'vertical',
    favorite: 'all',
    order: 'newest',
  });

  useEffect(() => {
    setPanelData(inputValues);
  }, [inputValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };
  const removeAllData = () => {
    setVideosData([]);
  };

  const loadDemo = () => {
    setVideosData(demo);
  };

  return (
    <Form>
      <FormGroup>
        <Label for="display">Display</Label>
        <Input
          data-testid="display-select"
          type="select"
          className="form-control"
          name="display"
          onChange={(e) => handleChange(e)}
          id="display"
        >
          <option>vertical</option>
          <option>horizontal</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="favorite">Favorite</Label>
        <Input type="select" name="favorite" id="favorite" onChange={(e) => handleChange(e)}>
          <option>all</option>
          <option>favorite</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="orderBy">Order by</Label>
        <Input type="select" name="order" id="orderBy" onChange={(e) => handleChange(e)}>
          <option>newest</option>
          <option>oldest</option>
        </Input>
      </FormGroup>
      <Button color="secondary" onClick={loadDemo} className="panel-btn">Load demo</Button>
      <Button color="danger" onClick={removeAllData} className="panel-btn">Remove all</Button>
    </Form>
  );
};
