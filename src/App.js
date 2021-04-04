import React, { useState } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Movies from './components/Movies/Movies';

const App = () => {
  const [localStorageData, setLocalStorageData] = useState([]);

  const getlocalStorageData = (data) => {
    setLocalStorageData(data);
  };

  return (
    <div className="App">
      <Form getlocalStorageData={getlocalStorageData} />
      <Movies localStorageData={localStorageData} />
    </div>
  );
};

export default App;
