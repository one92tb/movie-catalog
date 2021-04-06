import React from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import './style.css';

const Panel = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <Form>
      <FormGroup>
        <Label for="display">Display</Label>
        <Input type="select" className="form-control" name="selectDisplay" onChange={(e) => handleChange(e)} id="display">
          <option className="option">Vertical</option>
          <option>Horizontal</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="favorite">Favorite</Label>
        <Input type="select" name="selectDisplay" id="favorite">
          <option>All</option>
          <option>Favorite</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="orderBy">Order by</Label>
        <Input type="select" name="selectDisplay" id="orderBy">
          <option>Newest</option>
          <option>Oldest</option>
        </Input>
      </FormGroup>
      <Button color="secondary" className="panel-btn">Load demo</Button>
      <Button color="danger" className="panel-btn">Remove all</Button>
    </Form>
  );
};

export default Panel;
