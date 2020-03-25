import './App.css';
import './Loader.css';

import React, { useState, useEffect } from 'react';
import moment from "moment";

import { getIsraelCovid19Data, } from './getIsraelCovid19Data';
import { DailyReport } from './react-app-env';
import { CovidDailyStatus } from './CovidDailyStatus';

function App() {
  const [covidData, setCovidData] = useState([] as DailyReport[]);
  const lastUpdate = covidData[covidData.length - 1];

  useEffect(() => { getIsraelCovid19Data().then(data => setCovidData(data)) }, []);

  return <div className="covid-19-app">
    <header className="app-header">
      <h1>מפת קורונה ישראל</h1>
      {lastUpdate && <div className="last-update">נכון לתאריך {moment(lastUpdate.date).format("DD.MM.YYYY")}</div>}
    </header>
    {covidData.length === 0 ? <Loader /> : <CovidDailyStatus todayItem={covidData[covidData.length - 1]}></CovidDailyStatus>}
    <footer>
      <p>נוצר ע"י רוני קרילקאר</p>
      <div><span>האתר משתמש במידע שמונגש ע"י Rodrigo Pombo. למעבר למאגר המידע </span><a href="https://github.com/pomber/covid19">לחץ כאן</a></div>
    </footer>
  </div>;
}

function Loader() {
  return <div className="loader-wrapper"><div className="loader"></div></div>
}

export default App;
