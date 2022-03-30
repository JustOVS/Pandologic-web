import React, { useState } from 'react';
import logo from './pl-logo.png';
import './App.css';
import { useDispatch } from 'react-redux'
import { appActions } from './store'
import Chart from './Chart'
import { IRequestModel } from './types';

function App() {
  const dispatch = useDispatch();
  const [sdata, setSdata] = useState<IRequestModel>({ from: '', to: '' });

  const handleClick = () => {
    dispatch(appActions.getData(sdata))
  }

  const getChangeHandler = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSdata(prev => ({
      ...prev,
      [name]: event.target.value,
    }))
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          Input Dates to get Jobs Statistics
        </p>
        <input placeholder='From' type='date' onChange={getChangeHandler('from')}/>
        <input placeholder='To' type='date' onChange={getChangeHandler('to' )}/>
        <button onClick={handleClick}>Fetch Data</button>
        <Chart />
      </header>
    </div>
  );
}

export default App;
