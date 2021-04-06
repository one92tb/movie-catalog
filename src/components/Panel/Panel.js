import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import './style.css';

const Panel = (props) => {
  const { getPanelData, setVideosData } = props;
  const [inputValues, setInputValues] = useState({
    display: 'vertical',
    favorite: 'all',
    order: 'newest',
  });

  useEffect(() => {
    getPanelData(inputValues);
  }, [getPanelData, inputValues]);

  const handleChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const removeAllData = () => {
    setVideosData([]);
  };

  return (
    <Form>
      <FormGroup>
        <Label for="display">Display</Label>
        <Input type="select" className="form-control" name="display" onChange={(e) => handleChange(e)} id="display">
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
      <Button color="secondary" className="panel-btn">Load demo</Button>
      <Button color="danger" onClick={removeAllData} className="panel-btn">Remove all</Button>
    </Form>
  );
};

export default Panel;

Panel.defaultProps = {
  getPanelData: () => ({}),
  setVideosData: () => [],
};

Panel.propTypes = {
  getPanelData: PropTypes.func,
  setVideosData: PropTypes.func,
};
